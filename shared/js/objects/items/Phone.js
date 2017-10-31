class Phone{
    constructor() {
        this.mobileNotification = new Audio('shared/sounds/Mobile Phone Notification.mp3');
        this.mobilebereikSound = new Audio('shared/sounds/Mobile Phone Message.mp3');
        this.phonepicked = false;
        this.phonewin = false;
        this.timetolook = 180; //seconds
        this.phonebattery = 10;
        this.phoneininv = false;
        this.phoneconnected = false;
        var self = this;

        this.checkBereik = function() {
            if(player.position.x > -70 && player.position.x < 120 && player.position.z > 2060 && player.position.z < 2360){
                return true;
            }
            if(this.phonewin){
                document.getElementById('itemholder').innerHTML = '';
                _anchorStore.deAnchorObject();
            }
            else return false;
        };

        this.batterypercentage = function(elapsed) {
            if(elapsed == this.timetolook){
                this.lowerbattery(elapsed);
                this.phonebattery = 5;
                if(this.phonepicked == true) this.mobileNotification.play();
            }
            if(elapsed == (2 * this.timetolook)){
                this.lowerbattery(elapsed);
                this.phonebattery = 0;
                if(this.phonepicked == true) this.mobileNotification.play();
            }
            if(elapsed == (this.timetolook + 1) || elapsed == ( 2 * this.timetolook + 1) ){
                this.phoneininv = false;
            }
        };

        this.checkConnection = function(){
            if ( self.phone != undefined && self.phone.position.y < -70) {
                self.phone.position.y = 140;
                self.phone.__dirtyPosition = true;
            }
            if(this.checkBereik() && this.phoneconnected == false){
                if(this.phonepicked === true) this.mobilebereikSound.play();
                for (var i = 0; i < 16; i++) {
                    if(inv.getItemInSlot(i) == undefined) continue;
                    if(inv.getItemInSlot(i).name === 'phone-noservice-10' && this.phoneconnected == false){
                        this.changephoneinv(i.toString(), 'phone-service-10');
                        this.phoneconnected = true;
                        console.log("Bereik gevonden!");
                    }
                    if(inv.getItemInSlot(i).name === 'phone-noservice-5' && this.phoneconnected == false){
                        this.changephoneinv(i.toString(), 'phone-service-5');
                        this.phoneconnected = true;
                        console.log("Bereik gevonden!");
                    }
                }
                for(let i = 1; i <= 6; i++) {
                    let id = "slot" + i.toString();
                    let current = document.getElementById(id);
                    if (current.getAttribute("value") === 'phone-noservice-10' && this.phoneconnected == false) {
                        console.log("Bereik gevonden!");
                        this.phoneconnected = true;
                        this.changephonebar(new Item('phone-service-10'), 'phone-noservice-10');
                    }
                    if (current.getAttribute("value") === 'phone-noservice-5' && this.phoneconnected == false) {
                        console.log("Bereik gevonden!");
                        this.phoneconnected = true;
                        this.changephonebar(new Item('phone-service-5'), 'phone-noservice-5');
                    }
                }
            }
            if(!this.checkBereik() && this.phoneconnected == true){
                if(this.phonepicked === true) this.mobilebereikSound.play();
                for (var i = 0; i < 16; i++) {
                    if (inv.getItemInSlot(i) == undefined) continue;
                    if (inv.getItemInSlot(i).name === 'phone-service-10' && this.phoneconnected == true) {
                        this.changephoneinv(i.toString(), 'phone-noservice-10');
                        this.phoneconnected = false;
                        console.log("Bereik weg!");
                    }
                    if (inv.getItemInSlot(i).name === 'phone-service-5' && this.phoneconnected == true) {
                        this.changephoneinv(i.toString(), 'phone-noservice-5');
                        this.phoneconnected = false;
                        console.log("Bereik weg!");
                    }
                }
                for( let i = 1; i <= 6; i++) {
                    let id = "slot" + i.toString();
                    let current = document.getElementById(id);
                    if (current.getAttribute("value") === 'phone-service-10' && this.phoneconnected == true) {
                        console.log("Bereik weg!");
                        this.phoneconnected = false;
                        this.changephonebar(new Item('phone-noservice-10'), 'phone-service-10');
                    }
                    if (current.getAttribute("value") === 'phone-service-5' && this.phoneconnected == true) {
                        console.log("Bereik weg!");
                        this.phoneconnected = false;
                        this.changephonebar(new Item('phone-noservice-5'), 'phone-service-5');
                    }
                }
            }
        };

        this.lowerbattery = function(){
            for (var i = 0; i < 16; i++) {
                if(inv.getItemInSlot(i) == undefined) continue;
                if(inv.getItemInSlot(i).name === 'phone-noservice-10' && this.phoneininv == false){
                    console.log("phone-noservice-5 in inv, battery 5%");
                    this.changephoneinv(i.toString(), 'phone-noservice-5');
                    this.phoneininv = true;
                }
                if(inv.getItemInSlot(i).name === 'phone-service-10' && this.phoneininv == false){
                    console.log("phone-service-5 in inv, battery 5%");
                    this.changephoneinv(i.toString(), 'phone-service-5');
                    this.phoneininv = true;
                }
                if(inv.getItemInSlot(i).name === ('phone-noservice-5') && this.phoneininv == false){
                    console.log("phone-0 in inv, battery empty");
                    this.changephoneinv(i.toString(), 'phone-0');
                    this.phoneininv = true;
                }
                if(inv.getItemInSlot(i).name === ('phone-service-5') && this.phoneininv == false){
                    console.log("phone-0 in inv, battery empty, connection gone");
                    this.phoneconnected = false;
                    this.changephoneinv(i.toString(), 'phone-0');
                    this.phoneininv = true;
                }
            }
            if (!this.phoneininv){
                for( let i = 1; i <= 6; i++) {
                    let id = "slot" + i.toString();
                    let current = document.getElementById(id);
                    if (current.getAttribute("value") === 'phone-noservice-10' && this.phoneininv == false) {
                        console.log("phone-noservice-5 in bar, battery 5%");
                        this.changephonebar(new Item('phone-noservice-5'), 'phone-noservice-10');
                        this.phoneininv = true;
                    }
                    if (current.getAttribute("value") === 'phone-service-10' && this.phoneininv == false) {
                        console.log("phone-service-5 in bar, battery 5%");
                        this.changephonebar(new Item('phone-service-5'), 'phone-service-10');
                        this.phoneininv = true;
                    }
                    if (current.getAttribute("value") === ('phone-noservice-5') && this.phoneininv == false) {
                        console.log("phone-0 in bar, battery empty");
                        this.changephonebar(new Item('phone-0'), 'phone-noservice-5');
                        this.phoneininv = true;
                    }
                    if (current.getAttribute("value") === ('phone-service-5') && this.phoneininv == false) {
                        console.log("phone-0 in bar, battery empty, connection gone");
                        this.phoneconnected = false;
                        this.changephonebar(new Item('phone-0'), 'phone-service-5');
                        this.phoneininv = true;
                    }
                }
            }
        };

        this.changephoneinv = function(itemId, newphone){
            let current = document.getElementById(itemId);
            items[itemId] = null;
            current.innerHTML = '';
            inv.pushItem(new Item(newphone));
        };

        this.changephonebar = function(newphone, oldphone){
            var img = document.createElement('img');
            img.src = newphone.picturePath;
            var phones = ['phone-noservice-5', 'phone-service-5', 'phone-noservice-10', 'phone-service-10', 'phone', '5', '6'];
            for( let i = 1; i <= 6; i++){
                let id = "slot" + i.toString();
                let current = document.getElementById( id );
                if(current.getAttribute("value") === oldphone){
                    current.onclick = function() { hotbar.returnToInventory( id, newphone )};
                    current.innerHTML = '';
                    current.setAttribute("value", "");
                    current.setAttribute("value", newphone.name);
                    current.appendChild(img);
                }
                if(currentHotbar === phones[i-1]){
                    console.log('Tellie beet.');
                    document.getElementById('itemholder').innerHTML = '<img src=' + 'shared/images/items/' + newphone.name + '.png>';
                    _anchorStore.deAnchorObject();
                }
            }
        };
    }
}