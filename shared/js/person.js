class person{
    constructor(playerName, playerHealth) {

        this.playerName = playerName;
        this.playerHealth = playerHealth;
        var moveForward, moveLeft, moveBackward, moveRight, sprint, peer,
            playerSpeed, down = false,
            playerUp = false;
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
                case 79: //O
                    var newBucket = Object.assign(new Bucket(bucket.clone()));
                    buckets.push(newBucket);
                    flyPlane();
                    break;
                case 66: //B
                    var newCampFire = Object.assign(new CampFire(campfire.clone()));
                    campfires.push(newCampFire);
                    break;
                case 80: //P
                    var newSpear = Object.assign(new Spear(spear.clone()));
                    spears.push(newSpear);
                    var newAxe = Object.assign(new Axe(axe.clone()));
                    axes.push(newAxe);
                    break;
                case 84: //T
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
                        // _anchorStore.placeObject = campfire; dit kan niet meer jonge
                        // _anchorStore.isBeingPlaced = true;
                    }

                    else{
                        // _anchorStore.isBeingPlaced = false;
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


        this.update = function (delta) {
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
                    if (zuurstof > 0)zuurstof -= delta * 10;
                    if (zuurstof <= 0)
                    {
                        zuurstof = 0;
                        hp -= delta * 10;
                        if (hp <= 0){
                            hp = 0;
                            playerDeath('drowning');
                        }
                        document.getElementById('hpbar').style.width = hp + '%';
                    }
                    document.getElementById('oxigenbar').style.width = zuurstof + '%';
                }
                else{
                    if (underWater) {
                        scene.fog.near = 0.1;
                        scene.fog.far = 0;
                        sunLight.object3d.intensity = 0.7;
                        underWater = false;
                    }
                    if (zuurstof < 100)zuurstof += delta * 20;
                    if (zuurstof > 100)zuurstof = 100;
                    document.getElementById('oxigenbar').style.width = zuurstof + '%';
                }

                if ((velocity.y < 0.05 && !canJump) || underWater){
                    canJump = true;
                }
            }


            if (player.position.y < -200){
                player.position.y = 200;
                playerDeath('drowned');
            }

            player.rotation.y = controls.getY();
            player.translateX(velocity.x * delta);
            player.translateZ(velocity.z * delta);
            player.translateY(velocity.y * delta);
            player.__dirtyPosition = true;
        };


        //eventlisteners

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

    }

    createPlayerObject(){

        var player;

        controls = new THREE.PointerLockControls( camera );

        var physGeom = new THREE.CylinderGeometry(10, 20, 30, 50);
        var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
        physMaterial.visible = false;

        var physObject = new Physijs.CylinderMesh(physGeom, physMaterial, 20);
        //physObject.position.set(controls.getObject().position);

        physObject.add( controls.getObject());

        controls.getObject().position.y = 10;
        physObject.position.y = 300;
        physObject.__dirtyPosition = true;
        player = physObject;
        player._type = 'player';
        savedPos.set(player.position.x, player.position.y, player.position.z);

        player.addEventListener("ready", function(){
            player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        });

        scene.add(physObject);

        return player;
    }

}


