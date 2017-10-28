class Hotbar{
    constructor(){
        var self = this;

        this.toggle = function(keyCode){
            if(!controlsEnabled) return;
            var key = keyCode - 48;
            _anchorStore.removeWeapon();

            for(let i = 0; i <= 6; i++){
                var id = "#slot" + i.toString();
                var value = $(id).attr("value");
                //if it is active, remove active
                if($(id).hasClass("hotbarActive")){
                    $(id).removeClass( "hotbarActive" );
                }
                //if it isnt active add active
                if(i == key) {
                    $(id).addClass("hotbarActive");
                    currentHotbar = value;
                    currentHotbarID = id;
                    var newObject;
                    switch (value) {
                        case 'bucket':
                            newObject = Object.assign(new Bucket(bucket.clone()));
                            break;
                        case 'campfire':
                            newObject = Object.assign(new CampFire(campfire.clone()));
                            break;
                    }
                    if (newObject != undefined) {
                        _anchorStore.anchorObject(newObject.object);
                        $(id).html('');
                        $(id).attr("value", "");
                        // geen image
                        document.getElementById('itemholder').innerHTML = '';
                    }
                    else if (value === 'spear' || value === 'flaregun' || value === 'axe'){
                        var weapon = undefined;
                        switch (value){
                            case 'spear':
                                weapon = Object.assign(new Spear(spear.clone()));
                                break;
                            case 'flaregun':
                                weapon = Object.assign(new FlareGun(flaregun.clone()));
                                break;
                            case 'axe':
                                weapon = Object.assign(new Axe(axe.clone()));
                                break;
                        }
                        // geen image
                        document.getElementById('itemholder').innerHTML = '';
                        _anchorStore.setWeapon(weapon);
                    }
                    else if ($(id).attr("value") != undefined) { //Hier nog alle objecten die een image moeten
                        document.getElementById('itemholder').innerHTML = '<img src=' + 'shared/images/items/' + $(id).attr("value") + '.png>';
                        _anchorStore.letGoObject();
                    }
                }
            }

            return $("#slot" + key).attr("value");
        };

        this.addToSlot = function(item){

            var img = document.createElement('img');
            img.src = item.picturePath;

            for( let i = 1; i <= 6; i++){

                let id = "slot" + i.toString();
                let current = document.getElementById( id );

                if(current.innerHTML === ''){

                    current.onclick = function() { self.returnToInventory( id, item )};
                    current.setAttribute("value", item.name);
                    current.appendChild(img);

                    //succes
                    return true;

                }
            }

            //hotbar is full
            return false;

        };

        this.returnToInventory = function(id, item){
            let current = document.getElementById( id );

            if(current.innerHTML != '' && inv.pushItem(item, true)){
                current.innerHTML = '';
                current.setAttribute("value", "");
            }
        };

        this.hectobarSticks = function(){
            for( let i = 1; i <= 6; i++){
                let id = "slot" + i.toString();
                let current = document.getElementById( id );

                if(current.getAttribute("value") === 'stick'){
                    current.innerHTML = '';
                    current.setAttribute("value", "");
                    return true;

                }
            }
        }
    }
}