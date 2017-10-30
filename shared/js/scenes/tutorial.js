class Tutorial {
    constructor() {

        var self = this;


        var nextButton = document.getElementById("tutorialNext"),
            tutorial = document.getElementById( 'tutorial' ),
            blocker = document.getElementById( 'blocker' ),
            campfire = document.getElementById( 'craftedItem' ),
            inventory = document.getElementById( 'inventoryTab' ),
            blackout = $('#blackOut');

        var sceneCount = 0,
            isTyping = false;

        var crash = new Audio('shared/sounds/tutorial/boat_crash.mp3');


        this.start = function () {

            tutorialIsPlaying = true;

            //change button values
            start.innerHTML = "Resume";
            header.innerHTML = "Game Paused";

            //remove tutorial button
            tutorial.style.display = "none";
            nextButton.style.display = "block";
            resumeGame();

            self.next();

        };

        this.next = function(){

            switch(sceneCount){
                case 0: //
                    moveTo(
                        new THREE.Vector3(3660, 1560, -8685),
                        new THREE.Vector3(.7, -2.3, .6)
                    );

                    scene.add(boat);
                    boat.rotateY(-Math.PI /2);
                    boat.position.set(10000, 10, -8000);
                    popup("You were peacefully sailing over the ocean.");
                    break;
                case 1: //
                    //actually you fade out hue
                    blackout.fadeIn(2000);
                    scene.remove(boat);
                    popup("But then you fell asleep..");
                    break;
                case 2: //
                    crash.play();
                    moveTo(
                        new THREE.Vector3(2225, 990, -2525),
                        new THREE.Vector3(.4, 2.5, -.25)
                    );
                    blackout.fadeOut();
                    popup("Shoot! You have been stranded on a deserted island!");
                    break;
                case 3: //
                    moveTo(
                        new THREE.Vector3(0, 5500, 0),
                        new THREE.Vector3(-1.57, 0, 2.5)
                    );
                    popup("This is Abgewaschen..");
                    break;
                case 4: // woodcutting
                    moveTo(
                        new THREE.Vector3(-131, 104, -208),
                        new THREE.Vector3(0, -0.5272664625997164, 0)
                    );
                    popup("You should try to survive. Here take some wood!");
                    setTimeout(function(){
                        inv.pushItem(new Item("hout"));
                    }, 3000);
                    break;
                case 5: // inventory
                    popup("Here is your inventory. You can press I to access it later.");
                    menu.toggleInventory();
                    $('#menu').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);


                    break;
                case 6: // crafting
                    popup("You can craft aswell! Try making a campfire.");
                    nextButton.style.display = "none";

                    $('#craftingTab').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
                    campfire.addEventListener( 'click', self.next );
                    break;
                case 7:
                    popup("Well done! You've crafted your first item.");
                    campfire.removeEventListener(('click'), self.next);
                    setTimeout(function(){
                        popup("Now go back to your inventory and move it to your hotbar by clicking on it.");
                        self.next();
                    }, 6000);
                    break;
                case 8:
                    inventory.addEventListener( 'click', flashHotbar );
                    break;
                case 9:
                    popup("You can place it on the ground to create a fire.");
                    nextButton.style.display = "block";
                    inventory.removeEventListener( 'click', flashHotbar );

                    controlsEnabled = true;
                    nextButton.style.display = "none";
                    playerClass.respawn();


                    tutorialIsPlaying = false;

                    setTimeout(function(){
                        popup("You are on your own now, goodluck with Abgewaschen");
                    }, 6000);
                    break;
                default: // end


                    break;

            }

            sceneCount++;
        };

        function flashHotbar(){
            $('#hotbar').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);
            self.next();
        }

        function popup(input){

            nextButton.disabled = true;

            let popup = $('#infoPopup');
            popup.fadeIn();

            typeMe(input);

            popup.delay(4000).slideUp();

        }

        function typeMe(input){

            let text = document.getElementById("infoText");
            text.innerHTML = "";

            let chars = input.split('');

            for ( let i = 0; i < chars.length; i ++ ) {
                (function(ind) {
                    setTimeout(function(){
                        text.innerHTML += chars[i];

                        if(ind === chars.length -1 ){
                            setTimeout(function(){
                                nextButton.disabled = false
                            }, 4000);
                        }

                    }, 50 * ind);
                })(i);
            }
        }

        function moveTo(target, focus) {

            player.needsUpdate = true;
            player.position.set( target.x, target.y, target.z );
            player.__dirtyPosition = true;
            player.__dirtyRotation = true;
            camera.rotation.x = (focus.x);
            camera.rotation.y = (focus.y);
            camera.rotation.z = (focus.z);

        }
    }
}