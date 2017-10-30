var blocker = document.getElementById( 'blocker' ),
    start = document.getElementById( 'start' ),
    header = document.getElementById( 'header' ),
    tutorialButton = document.getElementById( 'tutorial' ),
    musichandler = false;

var paused = true,
    interfacePause = false;

var havePointerLock = 'pointerLockElement' in document;

if ( havePointerLock ) {

    var element = document.body;

    var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element ) {

            resumeGame();

        }
        else {

            pauseGame();

        }

    };

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange );

    start.addEventListener( 'click', function ( event ) {

        //turn on music
        if (!musichandler){
            musichandler = Object.assign(new MusicHandler()).start();
            musichandler = true;
        }

        if (!playedClock.running) playedClock.start();

        //disable tutorial button
        tutorialButton.style.display = "none";

        //change button values
        start.innerHTML = "Resume";
        header.innerHTML = "Game Paused";

        resumeGame();

    }, false );

} else {

    header.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

//game states

function pauseGame(){

    console.log("pausing game");
    console.log(interfacePause);

    //if inventory pauses game, dont show blocker
    if(interfacePause){
        blocker.style.display = "none";
    }
    else {
        blocker.style.display = "block";
        controlsEnabled = false;
        hotbar.hide();
    }

    //hide crosshair
    crosshair.style.visibility = "hidden";

    //disable controls
    controls.enabled = false;

    //move credits left
    document.getElementById('credits').style.left = '25%';
}

function resumeGame(){

    //enable controls
    if (deathOrWin || tutorialIsPlaying) {
        hotbar.hide();
    }
    else {
        controlsEnabled = true;
        controls.enabled = true;
        crosshair.style.visibility = "visible";
        hotbar.show();
    }

    //move credits to the center again
    document.getElementById('credits').style.left = '50%';

    //hide blocker
    blocker.style.display = "none";

    //if the tutorial is not playing, lock the pointer again
    if(!tutorialIsPlaying) {
        element.requestPointerLock = element.requestPointerLock
            || element.mozRequestPointerLock
            || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }
}