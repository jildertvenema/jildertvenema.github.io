var blocker = document.getElementById('clickToPlay');

var mouseDown, beurtBehouden, heeftGeschoten, powerMeter, meterUp, meterWidth, keuAnimation, fullBalls,
    halfBalls, cameraFocusObject;

var barSounds, balSound, fallSound, queSound, wallSound, scoredSound, soundDisabled, sounds, volumes;

var playerOne, scored, firstBall, playerOneHasFull;

var mouse, controls, camera, renderer, scene, camPos, raycaster;

var	keu, ballen, witteBal, line, lineGeometry;

var poolBallen, alleBallen, ballenLiggenStil, speed, clock, rotationPerFrame, rotationVector, sphere;

class PoolBal{

    constructor(baldirection, ball)
    {

        this.balDirection = baldirection;
        this.ball = ball;
        this.collision = 0;
        this.fall = 0;

    }
}

init();


function init()
{
    //player settings
    playerOne = true;
    scored = false;
    firstBall = true;
    playerOneHasFull = false;

    //general settings
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camPos = camera.position;
    camPos.set(x = 0,y = 10,z = 25);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;

    window.addEventListener( 'resize', onWindowResize, false );

    raycaster = new THREE.Raycaster();


    document.body.appendChild(renderer.domElement);
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome

    THREE.ImageUtils.crossOrigin = 'anonymous';

    //shoot settings
    mouse = new THREE.Vector2();

    mouseDown = false;

    beurtBehouden = false;
    heeftGeschoten = false;

    powerMeter = document.getElementById("powerMeter");
    meterUp = true;
    meterWidth = 0;

    keuAnimation = 0;
    fullBalls = 0;
    halfBalls = 0;

    cameraFocusObject = new THREE.Vector3(0,0,0);

    //create scene
    addBalls();
    createRoom();
    createPoolTable();
    addSound();
    addLine();

    render();
}

function addSound(){

    soundDisabled = false;
    barSounds = new Audio('sound/bar.mp3');
    barSounds.loop = true;
    barSounds.play();
    barSounds.volume = 0.1;
    balSound = new Audio('sound/bal.mp3');
    balSound.volume = 1;
    fallSound = new Audio('sound/fall.mp3');
    queSound = new Audio('sound/hit.mp3');
    wallSound = new Audio('sound/wall.mp3');
    scoredSound = new Audio('sound/claps.mp3');


    sounds = [barSounds,  balSound, fallSound, queSound, wallSound, scoredSound];
    volumes = [0.1, 1, 1 ,1, 0.5 ,1];

}

function addLine(){

    var lineMaterial, direction;

    lineMaterial = new THREE.LineDashedMaterial({ color: 0x000000 });
    lineGeometry = new THREE.Geometry();
    line = new THREE.Line(lineGeometry, lineMaterial);
    lineGeometry.vertices.push(witteBal.position);
    direction = witteBal.position.clone().sub( camera.position ).normalize();
    direction.y = 0;
    lineGeometry.vertices.push(direction.clone().multiplyScalar(10));
    scene.add(line);

}

function createRoom() {

    var floor, lightStandard, wall, betonMaterial, wallMaterial, lightAmbient1, lightAmbient2, betonTexture;


    betonTexture = THREE.ImageUtils.loadTexture('shared/img/beton.jpg');
    betonTexture.minFilter = THREE.LinearFilter;
    betonMaterial = new THREE.MeshPhongMaterial({map: betonTexture});
    wallMaterial = new THREE.MeshBasicMaterial({color: 0xf5f0ff});

    floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200, 1, 1), betonMaterial);
    floor.position.y = -15;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.castShadow = true;

    wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(370, 200, 1, 1), wallMaterial);
    wall.position.z = -200;
    scene.add(wall);

    lightStandard = new THREE.PointLight(0xffffff, 0.8, 50);
    lightStandard.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0xf0f0f0})));
    lightStandard.position.set(2, 14, 0);
    lightStandard.castShadow = true;
    lightStandard.shadow.camera.near = 0.1;
    lightStandard.shadow.camera.far = 25;
    lightStandard.shadowDarkness = 0.5;

    lightAmbient1 = new THREE.AmbientLight(0xffffff, 0.2);
    lightAmbient2 = new THREE.AmbientLight(0x111111);

    scene.add(lightAmbient2);
    scene.add(lightAmbient1);
    scene.add(floor);
    scene.add(lightStandard);

}

function createPoolTable() {

    var woodMaterial, randMaterial, tafelKleedMaterial, keuMaterial, blackMaterial,
        randGeometry_X, randGeometry_Y, tafelPootGeometry, keuGeometry, circleGeometry;

    var poolTafel, tafelKleed, rand4, rand1, rand2, rand3, circle1, circle2,
        circle3, circle4, circle5, circle6, tafelPoten, keuPositie;

    woodMaterial = THREE.ImageUtils.loadTexture('shared/img/wood.jpg');
    randMaterial = new THREE.MeshPhongMaterial({map: woodMaterial});
    tafelKleedMaterial = new THREE.MeshPhongMaterial({color: 0x228B22});
    keuMaterial = new THREE.MeshPhongMaterial({color: 0xC9A281});
    blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

    randGeometry_X = new THREE.BoxGeometry(3, 5, 40);
    randGeometry_Y = new THREE.BoxGeometry(25, 5, 1);
    tafelPootGeometry = new THREE.BoxGeometry(2, 40, 2);
    keuGeometry = new THREE.BoxGeometry(0.2, 0.2, 6);
    circleGeometry = new THREE.CircleBufferGeometry(1.5, 32);

    poolTafel = new THREE.Group();

    tafelKleed = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 40), tafelKleedMaterial);
    tafelKleed.position.y = -1;
    tafelKleed.receiveShadow = true;
    tafelKleed.castShadow = true;

    rand1 = new THREE.Mesh(randGeometry_X, randMaterial);
    rand2 = new THREE.Mesh(randGeometry_X, randMaterial);
    rand3 = new THREE.Mesh(randGeometry_Y, randMaterial);
    rand4 = new THREE.Mesh(randGeometry_Y, randMaterial);

    rand1.position.set(-11, -2, 0);
    rand2.position.set(11, -2, 0);
    rand3.position.set(0, -2, -20);
    rand4.position.set(0, -2, 20);

    tafelPoten = new THREE.Group();

    tafelPoot1 = new THREE.Mesh(tafelPootGeometry, randMaterial);
    tafelPoot2 = new THREE.Mesh(tafelPootGeometry, randMaterial);
    tafelPoot3 = new THREE.Mesh(tafelPootGeometry, randMaterial);
    tafelPoot4 = new THREE.Mesh(tafelPootGeometry, randMaterial);

    tafelPoten.add(tafelPoot1, tafelPoot2, tafelPoot3, tafelPoot4);

    tafelPoot1.position.set(-11, -20, 20);
    tafelPoot2.position.set(11, -20, 20);
    tafelPoot3.position.set(11, -20, -20);
    tafelPoot4.position.set(-11, -20, -20);

    circle1 = new THREE.Mesh(circleGeometry, blackMaterial);
    circle1.rotation.x = -Math.PI / 2;
    circle1.position.y = -0.4;

    circle1.position.z = -19;
    circle1.position.x = -9;
    poolTafel.add(circle1);

    circle2 = circle1.clone();
    circle2.position.x = 9;
    poolTafel.add(circle2);

    circle3 = circle1.clone();
    circle3.position.z = 19;
    poolTafel.add(circle3);

    circle4 = circle3.clone();
    circle4.position.x = 9;
    poolTafel.add(circle4);

    circle5 = circle3.clone();
    circle5.position.z = 0;
    circle5.position.x = -9.5;
    poolTafel.add(circle5);

    circle6 = circle5.clone();
    circle6.position.x = 9.5;
    poolTafel.add(circle6);

    keu = new THREE.Mesh(keuGeometry, keuMaterial);
    keu.rotateX(-5);
    keu.position.y = 3;

    keuPositie = new THREE.Vector3(0,0,0);
    keuPositie.addVectors(witteBal.position, camPos);

    keuPositie = keuPositie.multiplyScalar(0.5);

    keu.position.x = keuPositie.x;
    keu.position.z = keuPositie.z;

    keu.rotation.z = -camera.rotation.z;

    keu.visible = false;

    poolTafel.add(rand2);
    poolTafel.add(rand3);
    poolTafel.add(rand4);
    poolTafel.add(rand1);
    poolTafel.add(tafelKleed);
    poolTafel.add(tafelPoten);

    poolTafel.castShadow = true;
    poolTafel.receiveShadow = false;

    scene.add(keu);
    scene.add(poolTafel);
}

function addBalls() {

    sphere = new THREE.SphereGeometry(0.5, 16, 8);
    poolBallen = [];
    alleBallen = [];

    ballen = new THREE.Group();
    witteBal = new THREE.Mesh(sphere, new THREE.MeshLambertMaterial({color: 0xFFFFFF}));

    ballenLiggenStil = true;

    speed = new THREE.Vector3();

    clock = new THREE.Clock();

    rotationPerFrame = 0.05;
    rotationVector = new THREE.Vector3(rotationPerFrame, rotationPerFrame, rotationPerFrame);


    cameraFocusObject = witteBal.position;

    for (var i = 1; i < 16; i++) {
        var ballTexture = new THREE.TextureLoader().load('balls/' + i + "ball.png");
        var Poolball = new THREE.Mesh(sphere, new THREE.MeshLambertMaterial({map: ballTexture}));

        ballen.add(Poolball);
    }


    //ballen array
    for (var i = 0 ; i < ballen.children.length; i ++){

        ballen.children[i].name = "bal" + i;
        var bal = new PoolBal(new THREE.Vector3(0,0, 0), ballen.children[i]);
        bal.name = "poolbal" + i;
        poolBallen.push(bal);
        alleBallen.push(ballen.children[i]);
    }

    witteBal.name = "bal" + 15;
    alleBallen.push(witteBal);


    var wittePoolBal = new PoolBal(new THREE.Vector3(0, 0, 0), witteBal);
    wittePoolBal.name = "poolbal" + 15;
    poolBallen.push(wittePoolBal);
}

function returnBalDir(ball){

    for (var i = 0; i < poolBallen.length; i++){

        if (poolBallen[i].name == ball)
        {
            return poolBallen[i];
        }
    }
}



// ballen.position.z = 1;
//ballen.position.x = -5;
function resetBalls() {


    for (var i = 0 ; i < poolBallen.length; i ++){
        poolBallen[i].ball.visible = true;
        poolBallen[i].balDirection = new THREE.Vector3(0,0,0);
        poolBallen[i].ball.position.y = 0;
        poolBallen[i].collision = 0;
    }


    scene.add(ballen);
    scene.add(witteBal);




    witteBal.position.z = 10;
    witteBal.position.x = 0;

    for (var i = 0; i < ballen.children.length; i++) {
        ballen.children[i].position.z = -5;
        ballen.children[i].position.x = (i * 1.2) - 2;
        if (i >= 5) {
            ballen.children[i].position.x = ((i - 4.5) * 1.2) - 2;
            ballen.children[i].position.z = -4;
        }
        if (i >= 9) {
            ballen.children[i].position.x = ((i - 8) * 1.2) - 2;
            ballen.children[i].position.z = -3;
        }
        if (i >= 12) {
            ballen.children[i].position.x = ((i - 10.5) * 1.2) - 2;
            ballen.children[i].position.z = -2;
        }
        if (i >= 14) {
            ballen.children[i].position.x = ((i - 12) * 1.2) - 2;
            ballen.children[i].position.z = -1;
        }
    }


}

resetBalls();


// ************************************* MANAGE BOUNCE ***************************************

function BounceMyBalls(ball, ball2)
{



    var warmteEnergieRendement = 0.95;

    var mass = 1;

    var dx = ball.ball.position.x - ball2.ball.position.x;
    var dy = ball.ball.position.z - ball2.ball.position.z;

    var collision_angle = Math.atan2(dy, dx);
    var magnitude_1 = Math.sqrt(ball.balDirection.x * ball.balDirection.x + ball.balDirection.z * ball.balDirection.z  )
    var magnitude_2 = Math.sqrt(ball2.balDirection.x * ball2.balDirection.x + ball2.balDirection.z * ball2.balDirection.z  )

    var direction_1 = Math.atan2( ball.balDirection.z, ball.balDirection.x);
    var direction_2 = Math.atan2( ball2.balDirection.z, ball2.balDirection.x);

    var new_xspeed_1 = magnitude_1 * Math.cos(direction_1 - collision_angle);
    var new_yspeed_1 = magnitude_1 * Math.sin(direction_1 - collision_angle);
    var new_xspeed_2 = magnitude_2 * Math.cos(direction_2 - collision_angle);
    var new_yspeed_2 = magnitude_2 * Math.sin(direction_2 - collision_angle);

    var final_xspeed_1 = ((mass-mass)*new_xspeed_1+(mass+mass)*new_xspeed_2)/(mass+mass);
    var final_xspeed_2 = ((mass+mass)*new_xspeed_1+(mass-mass)*new_xspeed_2)/(mass+mass);
    var final_yspeed_1 = new_yspeed_1;
    var final_yspeed_2 = new_yspeed_2;

    ball.balDirection.x = warmteEnergieRendement * (Math.cos(collision_angle)*final_xspeed_1+Math.cos(collision_angle+Math.PI/2)*final_yspeed_1);
    ball.balDirection.z = warmteEnergieRendement  * (Math.sin(collision_angle)*final_xspeed_1+Math.sin(collision_angle+Math.PI/2)*final_yspeed_1);
    ball2.balDirection.x = warmteEnergieRendement * (Math.cos(collision_angle)*final_xspeed_2+Math.cos(collision_angle+Math.PI/2)*final_yspeed_2);
    ball2.balDirection.z = warmteEnergieRendement * ( Math.sin(collision_angle)*final_xspeed_2+Math.sin(collision_angle+Math.PI/2)*final_yspeed_2);


    balSound.play();




}

function getPointInBetweenByLen(pointA, pointB, length) {

    var dir = pointB.clone().sub(pointA).normalize().multiplyScalar(length);
    return pointA.clone().add(dir);

}

function  fallPoolball(ball) {


    var nr = poolBallen.indexOf(ball);

    fallSound.play();

    if (ball.balDirection.x > 0.5) { ball.balDirection.x = 0.5;}
    if (ball.balDirection.x < -0.5) { ball.balDirection.x = -0.5;}
    if (ball.balDirection.y > 0.5) { ball.balDirection.y = 0.5;}
    if (ball.balDirection.y < -0.5) { ball.balDirection.y = -0.5;}


    ball.ball.position.y -= 0.1;
    ball.collision = 2;
    ball.fall = 1;

    if (nr == 15){
        //witte Bal geput
        beurtBehouden = false;
        cameraFocusObject = new THREE.Vector3(0,3,8);
    }
    else if (nr == 7){
        //zwarte bal
        beurtBehouden = false;
        stopGame();
    }
    else if (firstBall){
        firstBall = false;
        if (nr <= 6){
            playerOneHasFull = playerOne;
        }
        else{
            playerOneHasFull = !playerOne;
        }
        if (playerOneHasFull){
            document.getElementById("hasFullText").innerHTML = "Player 1 has full";
        }
        else{
            document.getElementById("hasFullText").innerHTML = "Player 2 has full";
            document.getElementById("hasFullText").style.color = "red";
        }
        scored = true;

    }
    else if (playerOne && nr <= 6 && playerOneHasFull){
        fullBalls++;
        scored = true;
    }
    else if (!playerOne && nr <= 6 && !playerOneHasFull){
        fullBalls++;
        scored = true;
    }
    else if (playerOne && nr >= 8 && !playerOneHasFull){
        halfBalls++;
        scored = true;
    }
    else if (!playerOne && nr >= 6 && playerOneHasFull){
        halfBalls++;
        scored = true;
    }



}

function resetWitteBal() {
    poolBallen[15].fall = 0;
    poolBallen[15].ball.position.x = 0;
    poolBallen[15].ball.position.z = 10;
    poolBallen[15].ball.visible = true;
    poolBallen[15].balDirection = new THREE.Vector3(0,0,0);
    poolBallen[15].ball.position.y = 0;
    poolBallen[15].collision = 0;
    cameraFocusObject = witteBal.position;
}

function  stopGame() {
    if (playerOne){
        if ((playerOneHasFull && fullBalls == 7) || (!playerOneHasFull && halfBalls == 7)){
            document.getElementById("playerText").innerHTML = "Player one has won";
        }
        else
        {
            document.getElementById("playerText").innerHTML = "Player two has won";
        }
    }
    else
    {
        if ((!playerOneHasFull && fullBalls == 7) || (playerOneHasFull && halfBalls == 7)){
            document.getElementById("playerText").innerHTML = "Player two has won";
        }
        else
        {
            document.getElementById("playerText").innerHTML = "Player one has won";
        }
    }
}


// ########################################## mouse events #################################################


var soundImage = document.getElementById("soundImage");
soundImage.addEventListener('click', onSoundClick);


function onSoundClick(){
    soundDisabled = !soundDisabled;
    console.log(soundDisabled);

    if(!soundDisabled){
        soundImage.src = "shared/img/sound_on.png";
        for (var i = 0; i < sounds.length; i++){
            sounds[i].volume = volumes[i];
        }
    }
    else{
        soundImage.src = "shared/img/sound_off.png";
        for (var i = 0; i < sounds.length; i++){
            sounds[i].volume = 0;
        }
    }

}


document.addEventListener( 'click', onClick);
blocker.addEventListener('click', onBlockerClick);

function onBlockerClick(){

    blocker.style.display = 'none';

}

function onClick()
{
    console.log("clock");
    mouseDown = true;
    if (ballenLiggenStil) {
        keu.visible = true;

        var keupos = getPointInBetweenByLen(witteBal.position, camera.position, 10);

        console.log(keupos);

        keu.position.y = 3;
        keu.position.x = keupos.x;
        keu.position.z = keupos.z;

        console.log(keu.position);

        keu.lookAt(witteBal.position);


    }
}

function onMouseUp()
{
    mouseDown = false;
    if (ballenLiggenStil) {
        keuAnimation = meterWidth / 20;
        ballenLiggenStil = false;
    }

}


function rollWitteBal(){

    beurtBehouden = true;
    queSound.play();
    ballenLiggenStil = false;
    scored = false;
    var direction = camera.position.clone().sub(poolBallen[15].ball.position).normalize();
    poolBallen[15].balDirection.x = -direction.clone().multiplyScalar(meterWidth / 60).x;
    poolBallen[15].balDirection.z = -direction.clone().multiplyScalar(meterWidth / 60).z;
    keu.visible = false;
    heeftGeschoten = true;
}


function onClick(){

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

// ############################################# RENDER ###################################################
function render() {


    if (ballenLiggenStil){
        lineGeometry.vertices[0] = (witteBal.position);
        direction = witteBal.position.clone().sub(camera.position).normalize();
        direction.y = 0;
        direction.x = direction.clone().multiplyScalar(40).x;
        direction.z = direction.clone().multiplyScalar(40).z;

        var linePos = witteBal.position.clone().add(direction)

        lineGeometry.vertices[1] = (linePos);
        line.geometry.verticesNeedUpdate = true;
    }
    else{
        lineGeometry.vertices[0] = new THREE.Vector3(0,0,0);
        lineGeometry.vertices[1] = new THREE.Vector3(0,0,0);
        line.geometry.verticesNeedUpdate = true;
    }


    var clockDelta = clock.getDelta() * 20;


    if(mouseDown && ballenLiggenStil){

        if (meterWidth >= 100){meterUp = false}

        if (meterWidth <= 0){meterUp = true;}

        if (meterUp) {meterWidth+= clockDelta * 10;}
        else {meterWidth -= clockDelta * 10;}

        powerMeter.style.width = meterWidth + "px";
    }

    if (keuAnimation > 0){
        keuAnimation += clockDelta;

        var keupos = getPointInBetweenByLen(witteBal.position, keu.position, 10 - keuAnimation + 6.5);

        keu.position.y = 3;
        keu.position.x = keupos.x;
        keu.position.z = keupos.z;

        if (keuAnimation >= 10){
            keuAnimation = 0;
            rollWitteBal();
        }
    }


    var drag = 0.996;

    poolBallen[15].balDirection.y = 0;
    witteBal.position.add(speed.copy(poolBallen[15].balDirection.multiplyScalar(drag)).multiplyScalar(clockDelta));
    //poolBallen[15].ball.position.add(poolBallen[15].balDirection);

    for (var i = 0; i < ballen.children.length; i++) {
        poolBallen[i].balDirection.y = 0;

        var newDirection = speed.copy(poolBallen[i].balDirection.multiplyScalar(drag)).multiplyScalar(clockDelta);

        //poolBallen[i].ball.position.add(poolBallen[i].balDirection);
        poolBallen[i].ball.position.add(newDirection);

        poolBallen[i].ball.rotateX(newDirection.z) ;
        poolBallen[i].ball.rotateZ(-newDirection.x) ;
        //poolBallen[i].ball.rotateY(-(poolBallen[i].balDirection.y / (0.5 * Math.PI)) * clockDelta) ;
    }


    renderer.setSize(window.innerWidth, window.innerHeight);


    camera.lookAt(cameraFocusObject);

    requestAnimationFrame(render);
    raycaster.setFromCamera(mouse, camera);
    renderer.render(scene, camera);


    for (var x=0; x < poolBallen.length; x++) {
        for (var y = x + 1; y < poolBallen.length; y++) {
            if (poolBallen[i].collision == 2){continue;}

            var distance_x = Math.abs(poolBallen[x].ball.position.x - poolBallen[y].ball.position.x);
            var distance_y = Math.abs(poolBallen[x].ball.position.z - poolBallen[y].ball.position.z);
            var distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);

            if (distance <= 1 && (poolBallen[x].collision == 0 || poolBallen[y].collision == 0)) {
                poolBallen[x].collision = 1;
                poolBallen[y].collision = 1;

                if (poolBallen[x].ball.position.y < 0 || poolBallen[y].ball.position.y < 0){
                    continue;
                }

                var remainDistance = 1 - distance;
                if (remainDistance > 0)
                {
                    var direction = poolBallen[x].ball.position.clone().sub( poolBallen[y].ball.position ).normalize();
                    poolBallen[x].ball.position.add(direction.clone().multiplyScalar(remainDistance));
                }

                BounceMyBalls(poolBallen[x], poolBallen[y]);
            }
            else if (distance > 1) {
                poolBallen[x].collision = 0;
                poolBallen[y].collision = 0;
            }
        }
    }


    var stilleBallen = true;

    for (var i = 0; i < poolBallen.length; i ++) {


        var dir = poolBallen[i].balDirection;
        if (!(dir.x <= 0.01 && dir.z <= 0.01  && dir.x > -0.01  && dir.z > -0.01 ) && poolBallen[i].ball.position.y == 0){
            stilleBallen = false;
        }
        if (i == 15 && stilleBallen == true && ballenLiggenStil == false && heeftGeschoten ){
            ballenLiggenStil = true;
            heeftGeschoten = false;

            meterWidth = 0;

            blocker.style.display = "block";

            if (!beurtBehouden || !scored){
                playerOne = !playerOne;
            }
            else {
                scoredSound.play();
            }

            if (playerOne){
                document.getElementById("playerText").innerHTML  = "Player 1";
                document.getElementById("player").style.color  = "green";
            }
            else{
                document.getElementById("playerText").innerHTML  = "Player 2";
                document.getElementById("player").style.color  = "red";
            }

            if (poolBallen[15].ball.position.y < 0) {
                resetWitteBal();
            }

        }

        var pos = poolBallen[i].ball.position;

        var fallen = poolBallen[i].collision;

        //up
        if (pos.z > 19 && fallen == 0) {
            pos.z = 19;
            poolBallen[i].balDirection.z *= -1;

            wallSound.play();
        }

        //down
        if (pos.z < -19 && fallen == 0) {
            pos.z = -19;
            poolBallen[i].balDirection.z *= -1;

            wallSound.play();
        }

        if (pos.x < -9 && fallen == 0) {
            pos.x = -9;
            poolBallen[i].balDirection.x *= -1;

            wallSound.play();
        }

        if (pos.x > 9 && fallen == 0) {
            pos.x = 9;
            poolBallen[i].balDirection.x *= -1;

            wallSound.play();
        }



        if ((pos.z > 18 || pos.z < -18) && (pos.x > 8 || pos.x < -8)  && pos.y == 0){
            fallPoolball(poolBallen[i]);
        }


        //vallen van middelste gaten
        if (pos.x < -8 || pos.x > 8.25) {
            if ((pos.z < 1.5 && poolBallen[i].ball.position.z > -1.5 ) && pos.y == 0) {
                fallPoolball(poolBallen[i]);
            }
        }


        if (poolBallen[i].fall > 0) {
            pos.y -= .1;
            if (pos.y <= -1) {
                poolBallen[i].fall = 0;
                poolBallen[i].ball.visible = false;

            }
        }
    }
}
