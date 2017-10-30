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
                    success('This stick looks useful, maybe you can make something with it.');
                    this.helpsticks.succes = true;
                }
                if(this.stickscount === 13 && shipPlaneHandler.isPlane) playerWin('A plane saw your help and saved you!');
            }
        }
    }
}