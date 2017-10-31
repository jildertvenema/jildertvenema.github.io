class Hotbar{


    constructor(){
        var self = this;
        var currentScrol = 0;
        var hotbar = document.getElementById("hotbar");

        renderer.domElement.addEventListener( 'mousewheel', mousewheel, false );
        renderer.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

        this.hide = function(){

            hotbar.style.display = "none";

        };

        this.show = function(){

            hotbar.style.display = "block";

        };


        var timeout;
        function mousewheel( event ) {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if ( controls.enabled === false ) return;
                event.preventDefault();
                event.stopPropagation();

                if( event.wheelDelta  < 0) {
                    if (currentScrol === 1) currentScrol = 6;
                    else currentScrol--;
                }else {
                    if (currentScrol === 6) currentScrol = 1;
                    else currentScrol++;
                }

                self.toggle(currentScrol + 48);
            }, 50);
        }


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
                    currentScrol = i;
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
                        console.log(newObject.object);
                        _anchorStore.anchorObject(newObject.object);
                        _anchorStore.hotBarItem = true;
                        _anchorStore.hotBarID = currentHotbarID;
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
                    else if ($(id).attr("value") != "" && $(id).attr("value") != undefined) { //Hier nog alle objecten die een image moeten
                        document.getElementById('itemholder').innerHTML = '<img src=' + 'shared/images/items/' + $(id).attr("value") + '.png>';
                        _anchorStore.deAnchorObject();
                    }
                    else{
                        document.getElementById('itemholder').innerHTML = '';
                        _anchorStore.deAnchorObject();
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
                document.getElementById('itemholder').innerHTML = '';
                _anchorStore.deAnchorObject();
            }
        };

        this.hectobarSticks = function(){
            for( let i = 1; i <= 6; i++){
                let id = "slot" + i.toString();
                let current = document.getElementById( id );

                if(current.getAttribute("value") === 'stick'){
                    current.innerHTML = '';
                    current.setAttribute("value", "");
                    document.getElementById('itemholder').innerHTML = '';
                    _anchorStore.deAnchorObject();
                    return true;
                }
            }
        }
    }
}