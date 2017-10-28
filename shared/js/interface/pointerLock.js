var blocker = document.getElementById( 'blocker' ),
    start = document.getElementById( 'start' ),
    header = document.getElementById( 'header' ),
    tutorialButton = document.getElementById( 'tutorial' );

var paused = true,
    interfacePause = false;

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

        tutorialButton.style.display = "none";
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

//game states

function pauseGame(){
    document.exitPointerLock();
    if(!interfacePause) blocker.style.display = "block";
}

function resumeGame(){
    crosshair.style.visibility = "visible";
    blocker.style.display = "none";
}