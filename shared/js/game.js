// strict mode for no error allowance
'use strict';

// include physijs (physics engine)
Physijs.scripts.worker = 'shared/js/frameworks/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

// fire texturepath
VolumetricFire.texturePath = 'shared/models/textures/';

// webGL detector

if ( ! Detector.webgl ) {

    Detector.addGetWebGLMessage();
    document.body.innerHTML = "";

}

// scene
var camera, scene, renderer, firstRender = true, prevPos, underWater = false, mouse,
    raycaster, stats, water, clock, fireSounds, mobilebereikSound, bucket, campfire, phone, help,

	lastPlacePos = new THREE.Vector3(0,0,0), timeAirplaneSpawn = 0, terrain, savedPos, pirateShip, shark, death,win , playedTime = 0, playerVisable = false, deathOrWin = false, isBoat = false, hotbar, dorst = 100;

var _anchorStore = Object.assign(new anchorStore());
savedPos = new THREE.Vector3(0,0,0);
death = Object.assign(new deaths());
win = Object.assign(new wins());
hotbar = Object.assign(new Hotbar());

var allObjects = [];

//sky
var skydom, starField, dayDuration, sunLight, sunSphere,
    sunAngle = 0.8;

//player
var moveForward, moveLeft, moveBackward, moveRight, sprint,
    playerSpeed, canJump, godMode = false, down = false,
    playerUp = false, controls, controlsEnabled,
    player, velocity, plane, isPlane = false;

//fire
var particleSystem, options, spawnerOptions, tick = 0,
    pointLight, fire;

//menu
var menu, inv;

//pause
var paused = true, interfacePause = false;

//object loaders
var objPath, mtlPath, texturesPath;
objPath = "shared/models/obj/";
mtlPath = "shared/models/mtl/";
texturesPath = "shared/models/textures/";

//background sound

var importantSounds = new Audio('shared/sounds/sounds.mp3');
importantSounds.volume  = 0.5;
importantSounds.play();
importantSounds.loop = true;
importantSounds.volume = 0.4;

var backgroundSong = new Audio('shared/sounds/song_trap.m4a');
backgroundSong.play();
backgroundSong.loop = true;


// html elements

var blocker = document.getElementById( 'blocker' );
var start = document.getElementById( 'start' );
var header = document.getElementById( 'header' );
var loadStatusBar = document.getElementById( 'loadStatusBar' );
var crosshair = document.getElementById( 'crosshair' );
var itemPopup = document.getElementById( 'itemPopup' );


// pointer lock

var havePointerLock = 'pointerLockElement' in document
    || 'mozPointerLockElement' in document
    || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

    var element = document.body;

    var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element
            || document.mozPointerLockElement === element
            || document.webkitPointerLockElement === element ) {

            controlsEnabled = true;
            controls.enabled = true;

            player.position.set(savedPos.x, savedPos.y, savedPos.z);

            resumeGame();
        }
        else {

            if(interfacePause){
                blocker.style.display = "none";
                savedPos.set(player.position.x , player.position.y, player.position.z);
            }
            else {
                savedPos.set(player.position.x , player.position.y, player.position.z);
                blocker.style.display = "block";
                controlsEnabled = false;
            }

            controls.enabled = false;
            interfacePause = false;

        }

    };

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange );

    document.addEventListener( 'pointerlockerror', pauseGame );
    document.addEventListener( 'mozpointerlockerror', pauseGame );
    document.addEventListener( 'webkitpointerlockerror', pauseGame );

    start.addEventListener( 'click', function ( event ) {

        blocker.style.display = "none";
        start.innerHTML = "Resume";
        header.innerHTML = "Game Paused";

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock
            || element.mozRequestPointerLock
            || element.webkitRequestPointerLock;
        element.requestPointerLock();

    }, false );

} else {

    header.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

//initialize game
init();
animate();

function init() {

    //

    clock = new THREE.Clock();
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    velocity = new THREE.Vector3();


    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, -400, 0 ));
    scene.fog = new THREE.Fog(0x000000, 0.1, 0);
    renderer.setClearColor(new THREE.Color(0x000000));

    //

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );
    scene.add( new THREE.AmbientLight( 0x444444 ) );

    // box idk

    var box = new THREE.Mesh(
        new THREE.CylinderGeometry( 20, 40, 35 ),
        new THREE.MeshPhongMaterial({ color: 0x888888 })
    );

    var physicsBox = MeshToPhy(box, 100);
    physicsBox.position.y = 200;
    physicsBox._type = 'hout';
    scene.add( physicsBox );

    // stats

    stats = new Stats();
    document.body.appendChild( stats.dom );

    // objecten.exe

    new island().createIsland();

    var hout1 = new object("hout").loadObject();

    inv = Object.assign(new Inventory());


    menu = Object.assign(new Menu());
    inv.pushItem(new Item('hout'));
    inv.pushItem(new Item('hout'));
    inv.pushItem(new Item('campfire'));


    //player

    player = new person("bob", 2000).create();

    //sounds
    fireSounds = new Audio('shared/sounds/fire.mp3');
    mobilebereikSound = new Audio('shared/sounds/Mobile Phone Vibrate.mp3');

    prevPos = new THREE.Vector3();

    scene.addEventListener("update", function(){
        prevPos.copy(player.position);
    });

    //particles

    particleSystem = new THREE.GPUParticleSystem( {
        maxParticles: 250000
    } );

    scene.add(particleSystem);

    //movement

    var onKeyDown = function ( event ) {
        switch ( event.keyCode ) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;
            case 37: // left
            case 65: // a
                moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
            case 16: //lshift
                sprint = true;
                break;
            case 73: // i
                if(controlsEnabled) menu.toggleInventory();
                hotbar.toggle(0);
                break;
            case 67: // c
                if(controlsEnabled) menu.toggleCrafting();
                hotbar.toggle(0);
                break;
            case 32: // space;
                if (!godMode) {
                    if (canJump === true)
                    {
                        if (!underWater)velocity.y += 600;
                        else velocity.y += 200;
                    }
                    canJump = false;
                }
                else{
                    playerUp = true;
                }
                break;
            case 90: //z
                down = true;
                break;
            case 70: //f
                shootFlare();
                break;
            case 27: //esc
                pauseGame();
                break;
            case 66: //B
                fireStart();
                break;
            case 79: //O
                fillBucket();
                flyPlane();
                break;
            case 84: //T
                _anchorStore.placeObject = bucket;
                _anchorStore.isBeingPlaced = true;
                break;
            case 77: //M
                checkBereik();
                break;
            case 75: //K
                playerWin(' raping the shark in his arse');
                break;
            case 49: //1 (hotbar)
            case 50: //2 (hotbar)
            case 51: //3 (hotbar)
            case 52: //4 (hotbar)
            case 53: //5 (hotbar)
            case 54: //6 (hotbar)
                if(hotbar.toggle(event.keyCode) == "campfire"){
                    console.log("placing campfire");
                    //fireStop();
                    _anchorStore.placeObject = campfire;
                    _anchorStore.isBeingPlaced = true;
                }
                else{
                    _anchorStore.isBeingPlaced = false;
                }
                break;
        }
    };

    var onKeyUp = function ( event ) {
        switch( event.keyCode ) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 37: // left
            case 65: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
            case 16: //lshift
                sprint = false;
                break;
            case 90: //Z
                down = false;
                break;
            case 32: // space;
                playerUp = false;
                break;
        }
    };

    //eventlisteners

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'click', onClick, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function flyPlane(){
    if (plane == undefined) return;

    var planeSound = new Audio('shared/sounds/plane.mp3');
    planeSound.play();

    plane.position.set(80, 10000, -10000);
    isPlane = true;
    plane.visible = true;
}

function spawnBoat() {
    if (pirateShip == undefined) return;

    pirateShip.position.set(-45000, 170, -30000);
    isBoat = true;
    pirateShip.visible = true;
}

function fillBucket(){
    bucket.children[3].visible = true;
}

function emptyBucket(){
    bucket.gekooktTijd = 0;
    bucket.kokendWater = false;
    bucket.children[3].visible = false;
}


function fireStart(){
    campfire.isOnFire = true;
    fireSounds.play();
    fireSounds.loop = true;

    //fire

    var fireWidth  = 20;
    var fireHeight = 40;
    var fireDepth  = 20;
    var sliceSpacing = 0.5;


    fire = new VolumetricFire(
        fireWidth,
        fireHeight,
        fireDepth,
        sliceSpacing,
        camera
    );

    var pos = campfire.position;
    pos.y += 10;

    fire.mesh.position.set( pos.x, pos.y, pos.z );
    scene.add( fire.mesh );

    pointLight = new THREE.PointLight( 0xFFCF50, 2, 300 );
    pointLight.position.set( pos.x, pos.y, pos.z);
    scene.add( pointLight );

    fire.mesh.visible = true;

}

function fireStop() {
    if (fire)fire.mesh.visible = false;
    if (pointLight)pointLight.intensity = 0;
}

function checkBereik(){
    if(player.position.x > -70 && player.position.x < 120 && player.position.z > 2060 && player.position.z < 2360){
        console.log('m gedrukt')
        mobilebereikSound.play();
    }
}

//Item tooltip

function showToolTip(){}

//open difference menu interface

function interfaceOpen(arg){
    if(arg == Inventory){
        menu.toggleInventory();
    }
    else if(arg == Crafting){
        menu.toggleCrafting();
    }
    else{
        console.warn("invalid argument \"" + arg + "\" at interfaceOpen");
    }
}

//game states

function pauseGame(){
    document.exitPointerLock();
}

function resumeGame(){
    crosshair.style.visibility = "visible";
    blocker.style.display = "none";
}

//object click

function onClick(){

    event.preventDefault();

    if (!controls.enabled){return;}

    if (_anchorStore.isBeingPlaced){
        _anchorStore.isBeingPlaced = false;
        _anchorStore.placeObject.position.x = lastPlacePos.x;
        _anchorStore.placeObject.position.y = lastPlacePos.y + 5;
        _anchorStore.placeObject.position.z = lastPlacePos.z;
        _anchorStore.placeObject.__dirtyPosition = true;
        _anchorStore.placeObject.__dirtyRotation = true;
        return;
    }

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children);

    for (let i = 0 ; i < intersects.length; i ++){
        if (intersects[i].distance < 200){
            //object click
            if (intersects[i].object.type == 'Mesh'){
                   // intersects[i].object.children[0].material.color = new THREE.Color(0xffffff * Math.random());

                if (intersects[i].object._type === 'hout') {
                    inv.pushItem(new Item('hout'));
                    //scene.remove(intersects[i].object);
                }

                if (intersects[i].object._type === 'bucket') {
                    _anchorStore.placeObject = intersects[i].object;
                    _anchorStore.isBeingPlaced = true;
                }
                if (intersects[i].object._type === 'campfire') {
                    fireStop();
                    _anchorStore.placeObject = intersects[i].object;
                    _anchorStore.isBeingPlaced = true;
                }
                if (intersects[i].object._type === 'phone') {
                    _anchorStore.placeObject = intersects[i].object;
                    _anchorStore.isBeingPlaced = true;
                }
                console.log(intersects[i].object._type );
                if (intersects[i].object._type === 'spear') {
                    _anchorStore.placeObject = intersects[i].object;
                    _anchorStore.isBeingPlaced = true;
                }
            }
        }
        break;
    }

}

//warn player

function popUpItem(image){
    itemPopup.innerHTML = '';

    var img = document.createElement('img');
    img.src = image;

    itemPopup.appendChild(img);
    $('#itemPopup')
        .stop( true ,true )
        .fadeIn()
        .animate({top: '-=45%'}, 1000, "linear")
        .fadeOut()
        .css( "top" , "50%" );

}

function warn (text){
    var warning = $('#warning');

    warning.text(text);
    warning.stop(true, true).fadeIn();
    warning.delay(4000).fadeOut();
}

function success (text){
    var success = $('#success');

    success.text(text);
    success.fadeIn();
    success.delay(4000).fadeOut();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
};

function animate() {

    requestAnimationFrame( animate );
    render();
    stats.update();

}

function render() {

    if (!controls.enabled && !firstRender){

        if (clock.running && !deathOrWin) {
            playedTime += clock.getElapsedTime();
            clock.stop();
        }

        return;
    }
    else{
        if (!clock.running) clock.start();
    }

    firstRender = false;

    if (!controls) return;



    var delta = clock.getDelta();

    var elapsed = clock.getElapsedTime();

    if (deathOrWin) document.getElementById('credits').style.top = (100-elapsed * 3) + '%';

    timeAirplaneSpawn += delta;

    //fire
    if (fire != undefined )
    {
        fire.update( elapsed);
        if (fire.mesh.position.distanceTo(bucket.position) < 10 && bucket.children[3].visible && !bucket.kokendWater){
            success('Succesvol water gekookt');
            bucket.kokendWater = true;
        }
    }

    //pirate ship
    if (isBoat){
        pirateShip.position.z += delta * 200;
        if ( pirateShip.position.z > 30000){
            isBoat = false;
            pirateShip.visible = false;
        }
    }

    //bucket
    if (bucket != undefined && bucket.position.y < -6.4){
        fillBucket();
    }
    if (bucket != undefined){
        checkBucket();
        if (bucket.kokendWater) bucket.gekooktTijd += delta;
    }


    //shark
    if (shark != undefined){

        if (player.position.distanceTo(shark.position) < 200 && !deathOrWin){
            playerDeath('shark');
        }

        if (!playerVisable){
            shark.position.x = Math.sin(sunAngle) * 3000;
            shark.position.y = -20;
            shark.position.z = Math.cos(sunAngle) * 3000;
            shark.rotation.y = (sunAngle + 0.5 * Math.PI);
        }
        else{
            //shark to player
            var dir = player.position.clone().sub(shark.position).normalize();
            shark.lookAt(player.position);
            shark.position.add(dir.multiplyScalar(2));
        }

        if (underWater && player.position.distanceTo(shark.position) < 3000) {
            playerVisable = true;
        }
        else{
            playerVisable = false;
        }

    }

    //plane
    if (isPlane)
    {
        plane.position.z += delta * 500.0;
        if ( plane.position.z > 10000){
            isPlane = false;
            plane.visible = false;
        }
    }
    if (timeAirplaneSpawn > 10){
        timeAirplaneSpawn =0;
        var randomNum = Math.floor(Math.random() * 100) + 1;
        if ( randomNum < 14){
            console.log("airplane spawned");
            if (!isPlane)flyPlane();
        }
        if (randomNum > 95){
            console.log("boat spawned");
            if (!isBoat)spawnBoat();
        }
    }


    //player controls
    if ( controls.enabled ) {

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;


        if (velocity.y > 300){
            velocity.y = 300;
        }

        if (player.position.y > 20) velocity.y -= velocity.y * 10.0 * delta;
        else
        {
            velocity.y -= velocity.y * 1.5 * delta;
        }

        if (sprint) {
            if (!godMode)playerSpeed = 1500;
            else playerSpeed = 3000;
        }
        else playerSpeed = 1000;

        if (godMode && player.mass > 0){
            player.mass = 0;
            player.needsUpdate = true;
        }

        if (down && godMode){ velocity.y -= playerSpeed * delta;}
        if (playerUp) velocity.y += playerSpeed * delta;

        if (moveForward) velocity.z -= playerSpeed * delta;
        if (moveBackward) velocity.z += playerSpeed * delta;
        if (moveLeft) velocity.x -= playerSpeed * delta;
        if (moveRight) velocity.x += playerSpeed  * delta;

        if (player.position.y < -10){
            if (!underWater) {
                scene.fog.near = 0.003;
                scene.fog.far = 1000;
                sunLight.object3d.intensity = 0.1;
                underWater = true;
            }
        }
        else{
            if (underWater) {
                scene.fog.near = 0.1;
                scene.fog.far = 0;
                sunLight.object3d.intensity = 0.7;
                underWater = false;
            }
        }

        if ((velocity.y < 0.05 && !canJump) || underWater){
            canJump = true;
        }
    }


    if (player.position.y < -200){
        player.position.y = 200;
        playerDeath('drowned');
    }



    //place anchor object
    if (_anchorStore.isBeingPlaced){
        mouse.x = 0.017;
        mouse.y = 0.017;

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( scene.children);

        for (var i = 0 ; i < intersects.length;  i++){
            var intercectigns = ['terrain', 'campfire', 'hout', 'steen'];
            if (intercectigns.indexOf(intersects[i].object._type) == -1 || intersects[i].object == _anchorStore.placeObject ) continue;

            var dis = player.position.distanceTo(intersects[i].point);
            if (dis > 150) {
                _anchorStore.placeObject.position.set(lastPlacePos.x, lastPlacePos.y, lastPlacePos.z);
                continue;
            }

            _anchorStore.placeObject.position.x = (intersects[i].point.x);
            _anchorStore.placeObject.position.y = (intersects[i].point.y + 5);
            _anchorStore.placeObject.position.z = (intersects[i].point.z);
            lastPlacePos.x = intersects[i].point.x;
            lastPlacePos.y = intersects[i].point.y;
            lastPlacePos.z = intersects[i].point.z;
            break;
        }
    }

    player.rotation.y = controls.getY();
    player.translateX(velocity.x * delta);
    player.translateZ(velocity.z * delta);
    player.translateY(velocity.y * delta);
    player.__dirtyPosition = true;
    water.material.uniforms.time.value += 1.0 / 60.0;

    water.render();
    scene.simulate(); // run physics
    renderer.render( scene, camera );
    sunAngle	+= delta/dayDuration * Math.PI*2;
    sunSphere.update(sunAngle);
    sunLight.update(sunAngle);
    skydom.update(sunAngle);
    starField.update(sunAngle);

    if (options != undefined) updateParticles();

    if (fireSounds.play && fire != undefined) {
        var dis = pointLight.position.distanceTo(player.position);
        dis *= 0.003;
        if (dis > 1) dis = 1;
        fireSounds.volume = 1 - dis;
    }

    document.getElementById("position").innerText = "x: " + Math.floor(player.position.x) + " y: " + Math.floor(player.position.y) + " z: " + Math.floor(player.position.z);

    //requestAnimationFrame( render );
}



function playerDeath(reason) {
    if (deathOrWin) return;
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('hotbar').style.display = 'none';
    deathOrWin = true;
    for( var i = scene.children.length - 1; i >= 0; i--) { scene.remove(scene.children[i]);}
    scene = death.sharkDeath(reason);
}

function playerWin(reason) {
    if (deathOrWin) return;
    document.getElementById('crosshair').style.display = 'none';
    document.getElementById('hotbar').style.display = 'none';
    deathOrWin = true;
    for( var i = scene.children.length - 1; i >= 0; i--) { scene.remove(scene.children[i]);}
    scene = win.winned(reason);
}


function  MeshToPhy(object, mass, w = 0, h = 0 , d = 0, xo=0, yo=0, zo=0) {

    //physics
    var physGeom = object.geometry;
    var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
    physMaterial.visible = false;
    var physObject;
    var wiregeo;

    try {
        physObject = new Physijs.ConvexMesh(physGeom, physMaterial, mass);
        wiregeo = new THREE.EdgesGeometry( physObject.geometry ); // or WireframeGeometry( geometry )
    }
    catch(e) {
        var cube_bbox = new THREE.Box3();
        cube_bbox.setFromObject( object );
        var cube_height = cube_bbox.max.y - cube_bbox.min.y + h;
        var cube_width = cube_bbox.max.x - cube_bbox.min.x + w;
        var cube_depth = cube_bbox.max.z - cube_bbox.min.z + d;

        var cubeGeo = new THREE.CubeGeometry(cube_width, cube_height, cube_depth);

        wiregeo = new THREE.EdgesGeometry(  cubeGeo); // or WireframeGeometry( geometry )
        physObject = new Physijs.BoxMesh(cubeGeo, physMaterial, mass);
    }

    object.position.x += xo;
    object.position.y += yo;
    object.position.z += zo;

    physObject.add( object);

    //wireframe

    var wiremat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 5 } );
    var wireframe = new THREE.LineSegments( wiregeo, wiremat );
    physObject.add( wireframe);

    return physObject;
}


function shootFlare(){

    var flareSound = new Audio('shared/sounds/FlareGun.mp3');
    flareSound.play();

    tick = 0;
    options = {
        position: player.position.clone(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0xFF0000,
        colorRandomness: .2,
        turbulence: .5,
        lifetime: 2,
        size: 20,
        sizeRandomness: 1
    };
    options.position.y += 10;

    spawnerOptions = {
        spawnRate: 15000,
        speed: player.children[0].children[0].getWorldDirection().multiplyScalar(3),
        timeScale: 1
    };
}

function updateParticles() {
    var delta = clock.getDelta();
    tick += delta;

    if ( tick < 0 ) tick = 0;

    if ( delta > 0 ) {

        options.position.y += Math.sin( tick * -spawnerOptions.speed.y ) * 10;
        options.position.x += Math.sin( tick * -spawnerOptions.speed.x ) * 10;
        options.position.z += Math.sin( tick * -spawnerOptions.speed.z ) * 10;

        if (options.position.y > 300 ){
            if (isBoat)playerDeath('being raped by pirates');
            else if (isPlane)playerWin('being saved by a plane');
        }


        if (tick < 1.4) {
            for (let x = 0; x < spawnerOptions.spawnRate * delta; x++) {

                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                //oke cool
                particleSystem.spawnParticle(options);

            }
        }

    }

    particleSystem.update( tick );
}


function checkBucket(){

    var rot =  bucket.rotation;
    var o = 0.5;
    if (rot.z < Math.PI + o && rot.z > Math.PI - o)emptyBucket();
    if (rot.x < Math.PI + o && rot.x > Math.PI - o)emptyBucket();
}
