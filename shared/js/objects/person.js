class Person{
    constructor() {
        var moveForward, moveLeft, moveBackward, moveRight, sprint,
            playerSpeed, down = false,
            playerUp = false, totalVel = 0,
            hunger = 80, warmte = 100, warmteDalend = false,
            zuurstof = 100;

        this.hp = 100;

        this.pickedUp = false;
        this.woodCut = false;
        this.pickedID = undefined;
        this.pickedType = undefined;
        this.treeID = undefined;
        this.itemDropped = false;
        this.dropType = '';
        var self = this;

        
        this.respawn = function () {
            pauseGame();
            player.mass = 20;
            player.position.set(0, 300, 0);
            camera.rotation.x = 0;
            camera.rotation.y = 0;
            camera.rotation.z = 0;
            zuurstof = 100;
            self.hp = 100;
        };

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
                case 27: //esc
                    pauseGame();
                    break;
                case 81: //Q Items droppen
                    self.itemDropped = true;
                    self.dropType = $(currentHotbarID).attr("value");
                    self.dropItem(player, self.dropType, player.position);
                    break;
                case 77: //M
                    for( let i = 0; i <= 4; i++) {
                        var phones = ['phone-noservice-5', 'phone-service-5', 'phone-noservice-10', 'phone-service-10', 'phone'];
                        if (telefoon.phoneconnected && currentHotbar === phones[i]) {
                            playerWin("You have found a mobile connection and made a emergency call before the phone was empty!");
                            telefoon.phonewin = true;
                        }
                        if (telefoon.phoneconnected === false && currentHotbar === phones[i]) {
                            warn("There is no connection nearby. Try somewhere else!");
                        }
                    }
                    break;
                case 49: //1 (hotbar)
                case 50: //2 (hotbar)
                case 51: //3 (hotbar)
                case 52: //4 (hotbar)
                case 53: //5 (hotbar)
                case 54: //6 (hotbar)
                    hotbar.toggle(event.keyCode);
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

        this.dropItem = function (player, locatie, position, other = false) {
            if (locatie === undefined || locatie === '') return;
            var spriteMap = new THREE.TextureLoader().load( "shared/images/items/" + locatie + ".png" );
            var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
            var sprote = new THREE.Sprite( spriteMaterial );

            var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
            physMaterial.visible = false;
            var physObject;

            var cube_height = 1;
            var cube_width = 1;
            var cube_depth = 1;
            var cubeGeo = new THREE.CubeGeometry(cube_width, cube_height, cube_depth);
            physObject = new Physijs.BoxMesh(cubeGeo, physMaterial, 2);
            physObject.add( sprote);

            var sprite = physObject;
            sprite.scale.set(10,10,10);
            var posi;
            if (!other) posi = player.children[0].children[0].getWorldDirection().multiplyScalar(-50);
            else posi = player.getWorldDirection().multiplyScalar(-50);
            posi.add(position);
            sprite.position.set(posi.x,player.position.y + 20,posi.z);
            sprite.__dirtyPosition = true;
            sprite._type = locatie;
            scene.add( sprite );
            itemSprites.push(sprite);
            document.getElementById('itemholder').innerHTML = '';
            _anchorStore.deAnchorObject();
            $(currentHotbarID).html('');
            $(currentHotbarID).attr("value", "");
            _anchorStore.removeWeapon();
        };
        this.update = function (delta) {

            if (THREEx.DayNight.currentPhase(sunAngle) === 'night' && !dichtBijVuur){
                warmte -= delta * 2;
                if (!warmteDalend){
                    warn("You have getting cold. Find something to heat yourself.");
                    warmteDalend = true;
                }
            }
            else{
                warmteDalend = false;
                warmte += delta * 4;
            }

            if (warmte < 80){
                if (document.getElementById('cold').style.display === 'none') document.getElementById('cold').style.display = 'block';
            }
            else if (document.getElementById('cold').style.display === 'block') document.getElementById('cold').style.display = 'none';


            if (warmte > 100) warmte = 100;
            if (warmte < 0) warmte = 0;
            if (warmte <= 0){
                self.hp -= delta * 2;
                if (self.hp < 0) playerDeath("You have died by Hypothermia.")
            }

            hunger -= delta / 10;
            if (hunger > 80){
                hunger = 80;
            }
            if (hunger <= 0){
                hunger = 0;
                self.hp -= delta;
                if (self.hp < 0) playerDeath("You have have died by starvation.")
            }
            document.getElementById('hungerbar').style.width = hunger + '%';
            document.getElementById('hpbar').style.width = self.hp + '%';

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
                    scene.fog.near = 0.1;
                    scene.fog.color = new THREE.Color( 0x000000 );
                    scene.fog.far = 700;
                    sunLight.object3d.intensity = 0.1;
                    underWater = true;
                }
                if (zuurstof > 0)zuurstof -= delta * 10;
                if (zuurstof <= 0)
                {
                    zuurstof = 0;
                    self.hp -= delta * 10;
                    if (self.hp <= 0){
                        self.hp = 0;
                        playerDeath("You have drowned.");
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
                //playerDeath("You have drowned.");
                player.__dirtyPosition = true;
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



            mouse.x = ( ( renderer.domElement.clientWidth/2) / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( (renderer.domElement.clientHeight/2)/ renderer.domElement.clientHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera );

            var intersects = raycaster.intersectObjects( scene.children);

            for (let i = 0 ; i < intersects.length; i ++){
                if (intersects[i].distance < 200){
                    //object click
                    if (intersects[i].object.type != undefined){
                        let type = intersects[i].object._type;

                        if (type === 'woodenbarrel' && currentHotbar === 'axe'){
                            for (var p =woodenbarrel.items.length-1; p >= 0; p --){
                                if (!inv.pushItem(woodenbarrel.items[p])) break;
                                woodenbarrel.items.pop();
                            }
                            if (woodenbarrel.items.length === 0){
                                woodenbarrel.floating = false;
                                scene.remove(woodenbarrel);
                            }
                        }

                        if (type === 'spear' || type === 'axe') {
                            _anchorStore.anchorObject(intersects[i].object);
                            break;
                        }
                        if (type === 'hout' || type === 'bucketring' || type === 'tape' || type === 'flaregunbarrel' || type === 'flaregungrip' || type === 'pumpkin') {
                            inv.pushItem(new Item(type));
                            scene.remove(intersects[i].object);
                            if (intersects[i].object.objID == undefined) {
                                intersects[i].object.objID = Date.now();
                            }
                            self.pickedUp = true;
                            self.pickedID = intersects[i].object.objID;
                            self.pickedType = type;
                        }
                        if(type === 'phone'){
                            telefoon.phonepicked = true;
                            if(telefoon.phonebattery === 10) inv.pushItem(new Item("phone-noservice-10"));
                            if(telefoon.phonebattery === 5) inv.pushItem(new Item("phone-noservice-5"));
                            if(telefoon.phonebattery === 0) inv.pushItem(new Item("phone-0"));
                            scene.remove(intersects[i].object);
                            if(telefoon.phonebattery != 0) success("A phone! Maybe you can use it while it's battery lasts. (Use 'm' when you hold it)");
                            else warn("A phone! Sadly you've found it to late since the battery died.");
                        }
                        if (type === 'campfire') {
                            if (currentHotbar === 'flintandsteel'){
                                for (var t = 0; t < campfires.length; t++) {
                                    if (campfires[t].object === intersects[i].object){
                                        campfires[t].fireStart();
                                    }
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
                            if (intersects[i].object.hout < 1) break;
                            if (!inv.pushItem(new Item('hout'))) break;
                            intersects[i].object.hout--;
                            if (intersects[i].object.hout < 1){
                                scene.remove(intersects[i].object);
                            }
                            self.woodCut = true;
                            self.treeID = intersects[i].object.objID;

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

        physObject.add( controls.getObject());

        controls.getObject().position.y = 10;
        physObject.position.y = 300;
        physObject.__dirtyPosition = true;
        player = physObject;
        player._type = 'player';

        player.addEventListener("ready", function(){
            player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        });

        scene.add(physObject);

        return player;
    }

}


