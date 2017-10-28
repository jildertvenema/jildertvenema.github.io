class Help{
    constructor() {
        this.helpsticks = [];
        this.stickscount = 1;
        this.addStick = function(){
            if(this.stickscount < 13){
                scene.add(this.helpsticks[this.stickscount]);
                this.stickscount++;
            }
        };
        this.checkHelpSticks = function() {
            if(this.helpsticks[0] !== undefined){
                if(player.position.distanceTo(this.helpsticks[0].position) < 100 && this.helpsticks.succes === false){
                    success('Misschien kan je wat met deze tak maken.');
                    this.helpsticks.succes = true;
                }
                if(this.stickscount === 13 && shipPlaneHandler.isPlane) playerWin('Je help werd gezien door het vliegtuig! SICK!');
            }
        }
    }
}