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


//objecten
var allObjects = [];
var bucket, campfire, axe;
var buckets = [], campfires = [], spears = [], axes = [];

// scene
var camera, scene, renderer, firstRender = true, prevPos, underWater = false, mouse,
    raycaster, stats, water, clock, mobilebereikSound, phone,
	lastPlacePos = new THREE.Vector3(0,0,0), terrain, savedPos, pirateShip,
    shark, sharkClass, death,win , playedTime = 0, playerVisable = false, deathOrWin = false, isBoat = false,
    spear, fish, fishes = [], hotbar, dorst = 100, zuurstof = 100, hp = 100, options, timeRandomSpawn = 0, conn;

var _anchorStore = Object.assign(new anchorStore());
savedPos = new THREE.Vector3(0,0,0);
death = Object.assign(new deaths());
win = Object.assign(new wins());
hotbar = Object.assign(new Hotbar());
options = Object.assign(new Options());

//co-op

var geometry = new THREE.BoxGeometry( 20, 35, 20 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var otherPlayer = new THREE.Mesh( geometry, material );


//HELP
var helpsticks = [],
    stickscount = 1;

//sky
var skydom, starField, dayDuration, sunLight, sunSphere,
    sunAngle = 0.8;

//player
var canJump, godMode = false, controls, controlsEnabled,
    player, velocity, plane, isPlane = false, playerClass;

//fire
var particleSystem, fireOptions, spawnerOptions, tick = 0;

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
    scene.add( otherPlayer );
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

    playerClass = Object.assign(new person("bob", 2000));

    player = playerClass.createPlayerObject();

    //sounds
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

function checkBereik(){
    if(player.position.x > -70 && player.position.x < 120 && player.position.z > 2060 && player.position.z < 2360){
        console.log('m gedrukt');
        mobilebereikSound.play();
    }
}

function addStick(){
    if(stickscount < 13){
        scene.add(helpsticks[stickscount]);
        stickscount++;
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
        if (_anchorStore.placeObject._type == 'spear') {
            lastPlacePos = player.position.clone();
            lastPlacePos.add(player.getWorldDirection().multiplyScalar(10));
        }

        if (_anchorStore.placeObject._type === 'campfire')lastPlacePos.y -= 5;

        _anchorStore.placeObject.position.set(lastPlacePos.x, lastPlacePos.y +5 , lastPlacePos.z);
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
            if (intersects[i].object.type === 'Mesh'){
                let type = intersects[i].object._type;
                if (type === 'campfire' || type === 'bucket' || type === 'phone' || type === 'spear' || type === 'axe') {
                    _anchorStore.placeObject = intersects[i].object;
                    _anchorStore.isBeingPlaced = true;
                    break;
                }
                if (intersects[i].object._type === 'hout') {
                    inv.pushItem(new Item('hout'));
                    //scene.remove(intersects[i].object);
                }
                if (type === 'campfire') {
                    for (var t =0 ; t < campfires.length; t ++) {
                        if (campfires[t].object === intersects[i].object)campfires[t].fireStop();
                    }
                }
                if (intersects[i].object._type === 'stick') {
                    if(hotbar.hectobarSticks()){
                        addStick();
                    }
                }
                console.log(intersects[i].object._type );
            }
        }
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
    if (checkControls()) return;

    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();
    timeRandomSpawn += delta;

    if (deathOrWin) document.getElementById('credits').style.top = (100-elapsed * 3) + '%';
    checkHelpSticks();
    updateBoat(delta);
    updatePlane(delta);
    checkRandomSpawner();
    if (sharkClass)sharkClass.update(delta);
    for (let i = 0; i < buckets.length; i ++) buckets[i].update(delta);
    for (let i = 0; i < fishes.length; i ++) updateFish(fishes[i]);
    for (let i = 0; i < campfires.length; i ++) campfires[i].update(elapsed, delta);
    playerClass.update(delta);
    _anchorStore.update(delta);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
    scene.simulate(); // run physics
    renderer.render( scene, camera );
    sunAngle	+= delta/dayDuration * Math.PI*2;
    sunSphere.update(sunAngle);
    sunLight.update(sunAngle);
    skydom.update(sunAngle);
    starField.update(sunAngle);
    if (fireOptions != undefined) updateParticles();
    document.getElementById("position").innerText = "x: " + Math.floor(player.position.x) + " y: " + Math.floor(player.position.y) + " z: " + Math.floor(player.position.z);
}


function checkHelpSticks() {
    if(helpsticks[0] != undefined){
        if(player.position.distanceTo(helpsticks[0].position) < 100 && helpsticks.succes == false){
            success('Misschien kan je wat met deze tak maken.');
            helpsticks.succes = true;
        }
        if(stickscount === 13 && isPlane) playerWin('Je help werd gezien door het vliegtuig! SICK!');
    }
}


function updateBoat(delta) {
    if (isBoat){
        pirateShip.position.z += delta * 200;
        if ( pirateShip.position.z > 30000){
            isBoat = false;
            pirateShip.visible = false;
        }
    }
}
function updatePlane(delta) {
    if (isPlane) {
        plane.position.z += delta * 500.0;
        if ( plane.position.z > 10000){
            isPlane = false;
            plane.visible = false;
        }
    }
}
function checkRandomSpawner() {
    if (timeRandomSpawn > 10){
        timeRandomSpawn =0;
        var randomNum = Math.floor(Math.random() * 10) + 1;

        switch (randomNum) {
            case 1:
                if (!isPlane)flyPlane();
                break;
            case 2:
                if (!isBoat)spawnBoat();
                break;
            case 3:
                spawnFish();
                break;
        }
    }
}

function checkControls(){
    if (!controls.enabled && !firstRender){

        if (clock.running && !deathOrWin) {
            playedTime += clock.getElapsedTime();
            clock.stop();
        }
        return true;
    }
    else{
        if (!clock.running) clock.start();
    }
    firstRender = false;
    return (!controls);
}


function spawnFish() {
    if (fishes.length >= 5) return;
    var newFish = fish.clone();
    setRandomFishPosition(newFish);
    fishes.push(newFish);
    scene.add(newFish);
    newFish.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
       if(other_object._type === 'spear'){
           scene.remove(newFish);
           fishes.splice(fishes.indexOf(newFish));
       }
    });
}

function updateFish(fish) {
    var newpos = new THREE.Vector3(0,0,0);
    newpos.x = Math.sin(sunAngle * 100) * 100;
    newpos.y = 0;
    newpos.z = Math.cos(sunAngle * 100) * 100;
    newpos = newpos.add(fish.pivot.clone());
    fish.position.set(newpos.x, -50, newpos.z );
    fish.rotation.y = (sunAngle * 100 + 0.5 * Math.PI);
    fish.rotation.x = 0;
    fish.rotation.z = 0;
    fish.__dirtyRotation = true;
    fish.__dirtyPosition = true;
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

function  setRandomFishPosition(fish) {
    var randomNum = Math.floor(Math.random() * 4) + 1;
    switch (randomNum){
        case 1:
            fish.position.set(2524, -50, -707);
            break;
        case 2:
            fish.position.set(1195, -50, -1911);
            break;
        case 3:
            fish.position.set(-1026, -50, -2031);
            break;
        default:
            fish.position.set(-3242, -50, 1039);
            break;
    }
    console.log(fish);
    fish.pivot = fish.position.clone();
}


function  MeshToPhy(object, mass, w = 0, h = 0 , d = 0, xo=0, yo=0, zo=0, box = true) {

    //physics
    var physGeom = object.geometry;
    var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
    physMaterial.visible = false;
    var physObject;
    var wiregeo;

    if (!box) {
        physObject = new Physijs.ConvexMesh(physGeom, physMaterial, mass);
        wiregeo = new THREE.EdgesGeometry( physObject.geometry ); // or WireframeGeometry( geometry )
    }
    else {
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
    fireOptions = {
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
    fireOptions.position.y += 10;

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

        fireOptions.position.y += Math.sin( tick * -spawnerOptions.speed.y ) * 10;
        fireOptions.position.x += Math.sin( tick * -spawnerOptions.speed.x ) * 10;
        fireOptions.position.z += Math.sin( tick * -spawnerOptions.speed.z ) * 10;

        if (fireOptions.position.y > 300 ){
            if (isBoat)playerDeath('being raped by pirates');
            else if (isPlane)playerWin('being saved by a plane');
        }


        if (tick < 1.4) {
            for (let x = 0; x < spawnerOptions.spawnRate * delta; x++) {

                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                //oke cool
                particleSystem.spawnParticle(fireOptions);

            }
        }

    }

    particleSystem.update( tick );
}

function openHostPeer(){
    var id = Math.round((Math.random() * 9999) + 1);
    var peer = new Peer(id.toString(), {key: 'p2zyxcxaixiozuxr'});
    console.log('peer host: ' + id);
    peer.on('connection', function(conn) {
        console.log('connected slave');

        conn.on('data', function(data){
            switch (data[0]){
                case 'a':
                    var pos = StringToVector(data);
                    otherPlayer.position.set(pos.x, pos.y, pos.z);
                    conn.send('a' + vectorToString(player.position));
                break;
                case 'b':
                    otherPlayer.rotation.y = data.substring(1);
                    conn.send('b' + controls.getY());
            }
        });
    });
}
function connectToPeer(hostID){
    var id = 'slave' +  Math.round((Math.random() * 9999) + 1);
    var peer = new Peer(id, {key: 'p2zyxcxaixiozuxr'});
    conn = peer.connect(hostID.toString());
    console.log('peer slave: ' + id);

    conn.on('open', function(){
        conn.send('a' + vectorToString(player.position));
        conn.send('b' + controls.getY());
    });
    conn.on('data', function(data){
        switch (data[0]){
            case 'a':
                var pos = StringToVector(data);
                otherPlayer.position.set(pos.x, pos.y, pos.z);
                conn.send('a' + vectorToString(player.position));
            break;
            case 'b':
                otherPlayer.rotation.y = data.substring(1);
                conn.send('b' + controls.getY());
            break;
        }
    });
}


function vectorToString(v){
    return 'x'  + v.x + 'y'  + v.y + 'z'  + v.z;
}
function StringToVector(s){
    return new THREE.Vector3(s.substring(s.indexOf('x') +1, s.indexOf('y')),s.substring(s.indexOf('y') +1, s.indexOf('z')), s.substring(s.indexOf('z') +1)  );
}

