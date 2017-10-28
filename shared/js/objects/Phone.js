class Phone{
    constructor() {
        this.phone;
        this.checkBereik = function() {
            if(player.position.x > -70 && player.position.x < 120 && player.position.z > 2060 && player.position.z < 2360){
                console.log("Bereik");
                var mobilebereikSound = new Audio('shared/sounds/Mobile Phone Message.mp3');
                mobilebereikSound.play();
            }
        };
    }
}