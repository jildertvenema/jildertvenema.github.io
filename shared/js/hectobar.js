class Hotbar{
    constructor(){
        var self = this;

        this.toggle = function(keyCode){
            var key = keyCode - 48;

            for(let i = 0; i <= 6; i++){
                var id = "#slot" + i.toString();

                //if it is active, remove active
                if($(id).hasClass("hotbarActive")){
                    $(id)
                        .removeClass( "hotbarActive" );
                }
                //if it isnt active add active
                else if(i == key){
                    $(id)
                        .addClass( "hotbarActive" );
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