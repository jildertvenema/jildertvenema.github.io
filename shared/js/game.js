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
var bucket, campfire, axe, bucketRing, flaregun;
var buckets = [], campfires = [], spears = [], axes = [], trees = [];
var help = new Help();
var telefoon = new Phone();

// scene
var camera, scene, renderer, firstRender = true,  mouse, raycaster, stats, water, clock, shipPlaneHandler;

// player
var prevPos, underWater = false, canJump, controls, controlsEnabled,
    player, velocity, playerClass, savedPos = new THREE.Vector3(0,0,0);

//options
var gameOptions, godMode = false, currentHotbar = '', currentHotbarID = '';

//object handlers
var _anchorStore;

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ sorteer deze gekke shit hier weg @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// als het goed is kan je het verwerken in de klasse, this.var = public als je klasse.var aanroept
// var normaal is private.. vaak hoef je de variabele ook alleen maar in de klasse te gebruiken
var shark, sharkClass, death,win , playedTime = 0, playerVisable = false, deathOrWin = false,
    spear, fish, fishes = [], hotbar, zuurstof = 100, hp = 100, timeRandomSpawn = 0;
// @@@@@@@@@@@@@@@@@@@                                                       @@@@@@@@@@@@@@@@@@@@@@@@@

//sky
var skydom, starField, dayDuration, sunLight, sunSphere,
    sunAngle = 0.8;

//fire
var particleSystem, fireOptions, spawnerOptions, tick = 0;

//co-op

var geometry = new THREE.BoxGeometry( 20, 35, 20 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var otherModel, mixer, conn, otherVelocity = 0, objectID = '', otherLastPos = new THREE.Vector3(0,0,0), otherObj = undefined;

//menu
var menu, inv, tutorial, tutorialIsPlaying = false;

//object loaders

var objPath, mtlPath, texturesPath;
objPath = "shared/models/obj/";
mtlPath = "shared/models/mtl/";
texturesPath = "shared/models/textures/";

//background sound

var importantSounds = new Audio('shared/sounds/sounds.mp3');
//importantSounds.play();
importantSounds.loop = true;
importantSounds.volume = 0.4;

var backgroundSong = new Audio('shared/sounds/mistybog.mp3');
backgroundSong.play();
backgroundSong.loop = true;


// html elements

var loadStatusBar = document.getElementById( 'loadStatusBar' );
var crosshair = document.getElementById( 'crosshair' );
var itemPopup = document.getElementById( 'itemPopup' );


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
    scene.fog = new THREE.Fog(0xffffff, 2000, 15500);
    renderer.setClearColor(new THREE.Color(0x000000));

    //

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 15500 );
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

    new Island().createIsland();
    var hout1 = new object("hout").loadObject();
    inv = Object.assign(new Inventory());
    _anchorStore = Object.assign(new AnchorStore());
    death = Object.assign(new Deaths());
    win = Object.assign(new Wins());
    hotbar = Object.assign(new Hotbar());
    gameOptions = Object.assign(new Options());
    tutorial = Object.assign(new Tutorial());
    shipPlaneHandler = Object.assign(new ShipPlaneHandler());
    new loadOtherPlayer().loadJsonModel();


    menu = Object.assign(new Menu());
    inv.pushItem(new Item('hout'));
    inv.pushItem(new Item('hout'));
    inv.pushItem(new Item('steen'));
    inv.pushItem(new Item('steen'));
    inv.pushItem(new Item('campfire'));
    inv.pushItem(new Item('flintandsteel'));
    inv.pushItem(new Item('fish'));
    inv.pushItem(new Item('flaregun'));
    inv.pushItem(new Item('axe'));

    //player

    playerClass = Object.assign(new Person("bob", 2000));

    player = playerClass.createPlayerObject();

    //sounds

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
    window.addEventListener( 'resize', onWindowResize, false );

}

//item popup

function warn (text){
    let warning = $('#warning');

    warning.text(text);
    warning.stop(true, true).fadeIn();
    warning.delay(4000).fadeOut();
}

function success (text){
    let success = $('#success');

    success.text(text);
    success.stop(true, true).fadeIn();
    success.delay(4000).fadeOut();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );
    render();
    stats.update();

}

function render() {

    //if (checkControls()) return;
    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();
    timeRandomSpawn += delta;

    if (deathOrWin) document.getElementById('credits').style.top = (100-elapsed * 3) + '%';
    help.checkHelpSticks();
    telefoon.batterypercentage(Math.round(elapsed));
    shipPlaneHandler.update(delta);
    checkRandomSpawner();
    if (sharkClass)sharkClass.update(delta);
    for (let i = 0; i < buckets.length; i ++) buckets[i].update(delta);
    for (let i = 0; i < fishes.length; i ++) updateFish(fishes[i]);
    for (let i = 0; i < campfires.length; i ++) campfires[i].update(elapsed, delta);
    for (let i = 0; i < axes.length; i ++) axes[i].update(delta);
    if (mixer != undefined)mixer.update( otherVelocity * delta);
    checkTrees();
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


function deleteSelectedItem() {
    $(currentHotbarID).html('');
    $(currentHotbarID).attr("value", "");
    document.getElementById('itemholder').innerHTML = '';
    currentHotbar = '';
}
function checkRandomSpawner() {
    if (timeRandomSpawn > 10){
        timeRandomSpawn =0;
        var randomNum = Math.floor(Math.random() * 10) + 1;

        switch (randomNum) {
            case 1:
                if (!shipPlaneHandler.isPlane)shipPlaneHandler.flyPlane();
                break;
            case 2:
                if (!shipPlaneHandler.isBoat)shipPlaneHandler.spawnBoat();
                break;
            case 3:
                spawnFish();
                break;
            case 4:
                spawnBucketRing();
                break;
        }
    }
}

function checkTrees(delta) {
    for (var i = 0 ; i < trees.length; i++) {
        if (trees[i].fall > 2) {
            trees[i].fall -= delta / 5;
            trees[i].rotation.x = (1 - trees[i].fall) + -Math.PI / 2;
            trees[i].__dirtyRotation = true;
        }
        else if (trees[i].fall > 1) {
            trees[i].materials[0].opacity = 1 - trees[i].fall;
            trees[i].fall -= delta / 5;
        }
        else if (trees[i].fall <= 1 && trees[i].fall > 0) {
            trees[i].fall = -1;
            trees[i].rotation.x = -Math.PI / 2;
            trees[i].__dirtyRotation = true;
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


function spawnBucketRing() {
    var ring = bucketRing.clone();
    ring.mass = 2;
    ring.position.x = Math.floor(Math.random() * 10) + -1600;
    ring.position.z = Math.floor(Math.random() * 10) + -1000;
    ring._type = 'bucketring';
    scene.add(ring);
}

function spawnFish() {
    if (fishes.length >= 5) return;
    var newFish = fish.clone();
    newFish.mass = 2;
    setRandomFishPosition(newFish);
    fishes.push(newFish);
    scene.add(newFish);
    newFish.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
       if(other_object._type === 'spear'){
           scene.remove(newFish);
           fishes.splice(fishes.indexOf(newFish));
           inv.pushItem(new Item('fish'));
           success('Je hebt een vis gevangen');
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
            if (shipPlaneHandler.isBoat)playerDeath('being raped by pirates');
            else if (shipPlaneHandler.isPlane)playerWin('being saved by a plane');
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
    var peer = new Peer(id.toString(), {key: 'p2zyxcxaixiozuxr'}, {secure: true} );
    console.log('peer host: ' + id);
    success('Peer-id = ' + id);
    document.getElementById('peer_number').innerHTML = 'Peer-id = ' + id;
    peer.on('connection', function(conn) {
        console.log('connected slave');
        otherModel.visible = true;

        conn.on('data', function(data){
            switch (data[0]){
                case 'a':
                    var pos = StringToVector(data);
                    otherModel.position.set(pos.x, pos.y, pos.z);
                    otherModel.__dirtyPosition = true;
                    conn.send('a' + vectorToString(player.position));
                    break;
                case 'b':
                    otherModel.children[0].rotation.y = parseInt(data.substring(1));
                    otherModel.__dirtyRotation = true;
                    conn.send('b' + ( controls.getY() + Math.PI / 2 ) );
                    break;
                case 'c':
                    otherVelocity = parseInt(data.substring(1) / 50);
                    conn.send('c' + (Math.abs(velocity.x) + Math.abs(velocity.z)) );
                    break;
                case 'd':
                    console.log(data);
                    sunAngle = parseInt(data.substring(1));
                    break;
                case 'e':
                    var type = data.substring(1, data.indexOf('uuid'));
                    var _uuid = data.substring(data.indexOf('uuid') + 4, data.indexOf('positie'));
                    var posObj = StringToVector(data.substring(data.indexOf('positie') + 7));
                    var objectToPlace = undefined;
                    var objectToPlaceClass = undefined;
                    for (var i = 0 ; i < scene.children.length; i ++) {
                        if (scene.children[i].objID === _uuid) {
                            objectToPlace = scene.children[i];
                            break;
                        }
                    }
                    if (objectToPlace === undefined){
                        objectToPlaceClass = returnObjectWithType(type);
                        objectToPlaceClass.object.objID = _uuid;
                        objectToPlace = objectToPlaceClass.object;
                    }
                    if (objectToPlace != undefined) {
                        otherObj = objectToPlace;
                        objectToPlace.objID = _uuid;
                        _anchorStore.anchorOtherObject(objectToPlace);
                        objectToPlace.position.set(posObj.x,posObj.y + 5,posObj.z);
                        if (objectToPlace._type === 'campfire')otherLastPos.set(posObj.x,posObj.y -5 ,posObj.z);
                        else otherLastPos.set(posObj.x,posObj.y ,posObj.z);
                        objectToPlace.__dirtyPosition = true;
                    }
                    break;
                case 'f':
                    console.log(otherObj + ' deanchor');
                    if (otherObj != undefined) {
                        otherObj.position.set(otherLastPos.x, otherLastPos.y + 5, otherLastPos.z);
                        otherObj.__dirtyPosition = true;
                        otherObj.__dirtyRotation = true;
                        _anchorStore.deAnchorOtherObject();
                    }
                    break;
            }
            if (_anchorStore.isBeingPlaced){
                if (_anchorStore.placeObject.objID == undefined)_anchorStore.placeObject.objID = Date.now();
                conn.send('e' + _anchorStore.placeObject._type +'uuid' + _anchorStore.placeObject.objID + 'positie' + vectorToString(_anchorStore.placeObject.position));
            }
            else if (_anchorStore.objectGone){
                _anchorStore.objectGone = false;
                conn.send('f');
            }
        });
    });
}

function connectToPeer(){
    var hostID = document.getElementById("joinform").elements[0].value;
    var id = 'slave' +  Math.round((Math.random() * 9999) + 1);
    var peer = new Peer(id, {key: 'p2zyxcxaixiozuxr'}, {secure: true} );
    conn = peer.connect(hostID.toString());
    console.log('peer slave: ' + id);
    console.log(peer);

    conn.on('open', function(){
        document.getElementById('joinform').style.display = 'none';
        success('Connected to ' + hostID);
        conn.send('a' + vectorToString(player.position));
        conn.send('b' + controls.getY());
        conn.send('c' + Math.abs(velocity.x) + Math.abs(velocity.z));
        //conn.send('d');
        otherModel.visible = true;
    });
    conn.on('data', function(data){
        switch (data[0]){
            case 'a':
                var pos = StringToVector(data);
                otherModel.position.set(pos.x, pos.y, pos.z);
                otherModel.__dirtyPosition = true;
                conn.send('a' + vectorToString(player.position));
                break;
            case 'b':
                otherModel.children[0].rotation.y = parseInt(data.substring(1));
                otherModel.__dirtyRotation = true;
                conn.send('b' + ( controls.getY() + Math.PI / 2 ) );
                break;
            case 'c':
                otherVelocity = parseInt(data.substring(1) / 50);
                conn.send('c' + (Math.abs(velocity.x) + Math.abs(velocity.z)) );
                break;
            case 'd':
                console.log(data);
                sunAngle = parseInt(data.substring(1));
                break;
            case 'e':
                var type = data.substring(1, data.indexOf('uuid'));
                var _uuid = data.substring(data.indexOf('uuid') + 4, data.indexOf('positie'));
                var posObj = StringToVector(data.substring(data.indexOf('positie') + 7));
                var objectToPlace = undefined;
                var objectToPlaceClass = undefined;
                for (var i = 0 ; i < scene.children.length; i ++) {
                    if (scene.children[i].objID === _uuid) {
                        objectToPlace = scene.children[i];
                        break;
                    }
                }
                if (objectToPlace === undefined){
                    objectToPlaceClass = returnObjectWithType(type);
                    objectToPlaceClass.object.objID = _uuid;
                    objectToPlace = objectToPlaceClass.object;
                }
                if (objectToPlace != undefined) {
                    otherObj = objectToPlace;
                    objectToPlace.objID = _uuid;
                    _anchorStore.anchorOtherObject(objectToPlace);
                    objectToPlace.position.set(posObj.x,posObj.y + 5,posObj.z);
                    if (objectToPlace._type === 'campfire')otherLastPos.set(posObj.x,posObj.y -5 ,posObj.z);
                        else otherLastPos.set(posObj.x,posObj.y ,posObj.z);
                    objectToPlace.__dirtyPosition = true;
                }
                break;
            case 'f':
                console.log(otherObj + ' deanchor');
                if (otherObj != undefined) {
                    otherObj.position.set(otherLastPos.x, otherLastPos.y + 5, otherLastPos.z);
                    otherObj.__dirtyPosition = true;
                    otherObj.__dirtyRotation = true;
                    _anchorStore.deAnchorOtherObject();
                }
                break;
        }
        if (_anchorStore.isBeingPlaced){
            if (_anchorStore.placeObject.objID == undefined)_anchorStore.placeObject.objID = Date.now();
            conn.send('e' + _anchorStore.placeObject._type +'uuid' + _anchorStore.placeObject.objID + 'positie' + vectorToString(_anchorStore.placeObject.position));
        }
        else if (_anchorStore.objectGone){
            _anchorStore.objectGone = false;
            conn.send('f');
        }
    });
}

function vectorToString(v){
    return 'x'  + v.x + 'y'  + v.y + 'z'  + v.z;
}
function StringToVector(s){
    return new THREE.Vector3(
        s.substring(s.indexOf('x') + 1,
        s.indexOf('y')), s.substring(s.indexOf('y') + 1,
        s.indexOf('z')), s.substring(s.indexOf('z') + 1)
    );
}

function openInputForm() {
    document.getElementById('joinform').style.display = 'block';
}
function closeInputForm() {
    document.getElementById('joinform').style.display = 'none';
}

function returnObjectWithType(type) {
    var newObject;
    switch (type){
        case 'bucket':
            newObject = Object.assign(new Bucket(bucket.clone()));
            break;
        case 'campfire':
            newObject = Object.assign(new CampFire(campfire.clone()));
            break;
    }
    return newObject;
}
