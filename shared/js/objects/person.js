class Person{
    constructor(playerName, playerHealth) {

        this.playerName = playerName;
        this.playerHealth = playerHealth;
        var moveForward, moveLeft, moveBackward, moveRight, sprint,
            playerSpeed, down = false,
            playerUp = false, totalVel = 0, timeElap = 0, hunger = 80, warmte = 100, warmteDalend = false;
        this.getWarmte = function() {return warmte};
        this.dichtbijVuur = false;
        var self = this;
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
                    if(controlsEnabled)shootFlare();
                    break;
                case 27: //esc
                    pauseGame();
                    break;
                case 79: //O
                    var newBucket = Object.assign(new Bucket(bucket.clone()));
                    break;
                case 66: //B
                    var newCampFire = Object.assign(new CampFire(campfire.clone()));
                    break;
                case 80: //P
                    var newSpear = Object.assign(new Spear(spear.clone()));
                    var newAxe = Object.assign(new Axe(axe.clone()));
                    break;
                case 84: //T
                    break;
                case 77: //M
                    if(currentHotbar === "phone"){
                        telefoon.checkBereik();
                    }
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
                        //wil je dit niet weer doen?

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

            if (THREEx.DayNight.currentPhase(sunAngle) == 'night' && !self.dichtbijVuur){
                warmte -= delta ;
                if (!warmteDalend){
                    warn('Je krijgt het koud, zoek snel warmte');
                    warmteDalend = true;
                }
            }
            else{
                warmteDalend = false;
                warmte += delta;
            }

            if (warmte < 80){
                if (document.getElementById('cold').style.display === 'none') document.getElementById('cold').style.display = 'block';
            }
            else if (document.getElementById('cold').style.display === 'block') document.getElementById('cold').style.display = 'none';


            if (warmte > 100) warmte = 100;
            if (warmte < 0) warmte = 0;
            if (warmte <= 0){
                hp -= delta / 5;
                if (hp < 0) playerDeath('onderkoeling')
            }

            hunger -= delta / 10;
            if (hunger > 80){
                hunger = 80;
            }
            if (hunger <= 0){
                hunger = 0;
                hp -= delta / 10;
                if (hp < 0) playerDeath('verhongering')
            }
            document.getElementById('hungerbar').style.width = hunger + '%';
            document.getElementById('hpbar').style.width = hp + '%';

            if ( !controls.enabled) {
                down = false; playerUp = false; sprint = false; moveRight = false; moveLeft = false; moveForward = false; moveBackward = false;
            }

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

            if (godMode || tutorialIsPlaying){
                player.mass = 0;
                player.needsUpdate = true;
            }
            else{
                player.mass = 20;
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


            totalVel += ( Math.abs(velocity.x) + Math.abs(velocity.z) ) / 500 ;

            document.getElementById('itemholder').style.bottom = (-12 + Math.sin(totalVel)).toString() + '%';


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


        function onClick(){

            event.preventDefault();

            if (!controls.enabled){return;}


            if (currentHotbar === 'flaregun'){
                deleteSelectedItem();
                shootFlare();
                _anchorStore.removeWeapon();
            }
            if (currentHotbar === 'cookedFish'){
                deleteSelectedItem();
                hunger += 30;
                return;
            }
            if (currentHotbar === 'axe' &&  _anchorStore.weapon.object._type === 'axe'){
                _anchorStore.weapon.cutAnimation();
            }

            if (_anchorStore.isBeingPlaced){
                _anchorStore.deAnchorObject();
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
                        if (type === 'spear' || type === 'axe') {
                            _anchorStore.anchorObject(intersects[i].object);
                            break;
                        }
                        if (type === 'hout' || type === 'bucketring' || type === 'tape' || type === 'flaregunbarrel' || type === 'flaregungrip') {
                            inv.pushItem(new Item(type));
                            scene.remove(intersects[i].object);
                        }
                        if(type === 'phone'){
                            if(telefoon.phonebattery === 10) inv.pushItem(new Item("phone-noservice-10"));
                            if(telefoon.phonebattery === 5) inv.pushItem(new Item("phone-noservice-5"));
                            if(telefoon.phonebattery === 0) inv.pushItem(new Item("phone-0"));
                            scene.remove(intersects[i].object);
                        }
                        if (type === 'campfire') {
                            if (currentHotbar === 'flintandsteel'){
                                for (var t = 0; t < campfires.length; t++) {
                                    if (campfires[t].object === intersects[i].object)campfires[t].fireStart();
                                }
                            }
                            else {
                                for (var t = 0; t < campfires.length; t++) {
                                    if (campfires[t].object === intersects[i].object)campfires[t].fireStop();
                                }
                                _anchorStore.anchorObject(intersects[i].object);
                                break;
                            }
                        }
                        if (type === 'tree1' && currentHotbar === 'axe'){
                            console.log(intersects[i].object);
                            if (intersects[i].object.hout < 1) break;
                            if (!inv.pushItem(new Item('hout'))) break;
                            intersects[i].object.hout--;
                            if (intersects[i].object.hout < 1){
                                intersects[i].object.fall = 3;
                            }
                            break;
                        }

                        if (type === 'bucket'){

                            for (var t = 0; t < buckets.length; t++) {
                                if (buckets[t].object === intersects[i].object){
                                    if (buckets[t].kokendWater && buckets[t].object.children[4].visible){
                                        if (inv.pushItem(new Item('cookedFish'))){
                                            buckets[t].removeFish();
                                            break;
                                        }
                                    }
                                }
                            }

                            if (currentHotbar === 'fish') {
                                for (var t = 0; t < buckets.length; t++) {
                                    if (buckets[t].object === intersects[i].object && buckets[t].object.children[3].visible) {
                                        buckets[t].addFish();
                                        deleteSelectedItem();
                                        break;
                                    }
                                }
                            }
                            else{
                                _anchorStore.anchorObject(intersects[i].object);
                                break;
                            }
                        }
                        if (type === 'stick') {
                            if(hotbar.hectobarSticks()){
                                help.addStick();
                            }
                        }
                        console.log(intersects[i].object._type );
                    }
                }
            }
        }

        //eventlisteners

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );
        window.addEventListener( 'click', onClick, false );

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


