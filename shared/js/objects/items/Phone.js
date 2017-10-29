class Phone{
    constructor() {
        this.mobileNotification = new Audio('shared/sounds/Mobile Phone Notification.mp3');
        this.mobilebereikSound = new Audio('shared/sounds/Mobile Phone Message.mp3');
        this.phone;
        this.timetolook = 10; //seconds
        this.phonebattery = 10;
        this.phoneininv = false;
        this.checkBereik = function() {
            if(player.position.x > -70 && player.position.x < 120 && player.position.z > 2060 && player.position.z < 2360){
                console.log("Bereik");
                this.mobilebereikSound.play();
            }
        };
        this.batterypercentage = function(elapsed) {
            if(elapsed == this.timetolook){
                this.whichphone(elapsed);
                this.phonebattery = 5;
                this.mobileNotification.play();
            }
            if(elapsed == (2 * this.timetolook)){
                this.whichphone(elapsed);
                this.phonebattery = 0;
                this.mobileNotification.play();
            }
            if(elapsed == (this.timetolook + 1) || elapsed == ( 2 * this.timetolook + 1) ){
                this.phoneininv = false;
            }
        };

        this.whichphone = function(){
            for (var i = 0; i < 16; i++) {
                if(inv.getItemInSlot(i) == undefined) continue;
                if(inv.getItemInSlot(i).name === 'phone-noservice-10' && this.phoneininv == false){
                    console.log("phone-noservice-5, battery 5%");
                    this.changephone(i.toString(), 'phone-noservice-5');
                    this.phoneininv = true;
                    return;
                }
                if(inv.getItemInSlot(i).name === 'phone-service-10' && this.phoneininv == false){
                    console.log("phone-service-5, battery 5%");
                    this.changephone(i.toString(), 'phone-service-5');
                    this.phoneininv = true;
                    return;
                }
                if(inv.getItemInSlot(i).name === 'phone-noservice-5' && this.phoneininv == false){
                    console.log("phone-0, battery empty");
                    this.changephone(i.toString(), 'phone-0');
                    this.phoneininv = true;
                    return;
                }
                if(inv.getItemInSlot(i).name === 'phone-service-5' && this.phoneininv == false){
                    console.log("phone-0, battery empty");
                    this.changephone(i.toString(), 'phone-0');
                    this.phoneininv = true;
                    return;
                }
            }
            if (!this.phoneininv){
                console.log("test");
            }
        };
        this.changephone = function(itemId, newphone){
            let current = document.getElementById(itemId);
            items[itemId] = null;
            current.innerHTML = '';
            inv.pushItem(new Item(newphone));
        }
    }
}