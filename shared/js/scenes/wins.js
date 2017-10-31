class Wins{
    winned(reason) {
        document.getElementById('itemholder').innerHTML = '';
        _anchorStore.deAnchorObject();
        $(currentHotbarID).html('');
        $(currentHotbarID).attr("value", "");
        _anchorStore.removeWeapon();
        var playedTime = playedClock.getElapsedTime();
        clock.stop();

        controls.enabled = false;
        creditsClock.start();

        player.position.set(0, 300, 0);
        player.rotation.y = 0;
        player.mass = 0;
        player.__dirtyPosition = true;
        player.__dirtyRotation = true;

        var seconds = Math.floor(playedTime);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);

        seconds -= minutes * 60;
        minutes -= hours * 60;

        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }

        success("You have won! " + reason + ' Time before saved: ' + hours + ':'+ minutes + ':' + seconds, true);
    }
}