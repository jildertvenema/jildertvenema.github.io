class Tutorial {
    constructor() {

        var self = this,
            nextButton = document.getElementById("tutorialNext"),
            tutorialButton = document.getElementById( 'tutorial' ),
            sceneCount = 0;

        this.start = function () {

            tutorialIsPlaying = true;

            blocker.style.display = "none";
            nextButton.style.display = "block";

            player.position.set(0, 5500, 0);
            player.__dirtyPosition = true;
            player.__dirtyRotation = true;
            camera.rotation.x = -90 * Math.PI / 180;
            popup("this is Abgewaschen..");

        };

        function popup(input){
            console.log("eyeowowo");
            let popup = $('#infoPopup');
            let text = document.getElementById("infoText");

            text.innerHTML = input;
            text.style.animation = "type";
            popup.stop(true, true).fadeIn();
            popup.delay(4000).fadeOut();

        }

        this.next = function(){

            switch(sceneCount){
                case 0: // woodcutting
                    moveTo(
                        new THREE.Vector3(-131, 104, -208),
                        new THREE.Vector3(0, -0.5272664625997164, 0)
                    );
                    popup("Maybe you could use some wood..");
                    break;
                case 1: //

                    break;
                case 2: //

                    break;
                case 3: //

                    break;
                case 4: //

                    break;
                default: // end
                    tutorialIsPlaying = false;
                    moveTo(
                        new THREE.Vector3(0, 300, 0),
                        new THREE.Vector3(0, 0, 0)
                    );
                    pauseGame();
                    tutorialButton.style.display = "none";
                    break;

            }

            sceneCount++;

        };

        var moveTo = function (target, focus) {

            player.needsUpdate = true;
            player.position.set( target.x, target.y, target.z );
            player.__dirtyPosition = true;
            player.__dirtyRotation = true;
            camera.rotation.x = (focus.x);
            camera.rotation.y = (focus.y);
            camera.rotation.z = (focus.z);

        };

        var toRadial = function(degrees){

            return degrees * Math.PI / 180;

        };

    }
}