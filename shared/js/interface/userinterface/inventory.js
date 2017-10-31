class Inventory {
    constructor(){ //aka de variabelen?
        var inventory = document.getElementById('inventory');
        var table = document.createElement('table');
        var pickUpSound = new Audio('shared/sounds/pickup.mp3');
        var self = this;

        //create inventory

        this.create = function (){
            for (let i = 0; i < 2; i++) {
                let tr = document.createElement('TR');
                tr.id = 'tr' + i;
                for (let j = 0; j < 8; j++) {

                    let td = document.createElement('TD');
                    let id = j + (i * 8);

                    td.id = id ;

                    //td.onmouseover = showToolTip();
                    td.onclick = function() { self.itemClick( id ); };
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            inventory.appendChild(table);
            table.id = 'tableInv';
        };

        //add craftables to inventory

        this.pushItem = function(item, returned = false) {
            if(self.getLength(items) === 16){
                warn("Your inventory is full!");
            }
            else {
                pickUpSound.play();

                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 8; j++) {

                        let id = (j + (i * 8)).toString() ;
                        let current = document.getElementById( id);

                        if (current.innerHTML === '') {
                            if(!returned) self.popUpItem(item.picturePath);
                            let img = new Image(40, 40);
                            img.src = item.picturePath;
                            current.appendChild(img);

                            items[id] = item;

                            //succes
                            return true;
                        }
                    }
                }
            }

            //failed to push
            return false;
        };

        //inventory Item click

        this.itemClick = function(itemId) {
            if(tutorialIsPlaying) return;

            let current = document.getElementById(itemId);

            if(current.innerHTML !== '' && hotbar.addToSlot(items[itemId])){

                items[itemId] = null;
                current.innerHTML = '';

            }
            else{
                console.warn("You cannot push empty to hotbar");
            }


        };

        this.getLength = function(array){
            let count = 0;

            for(let i = 0; i < array.length; i ++){
                if(array[i] !== null){
                    count ++;
                }
            }

            return count;
        };

        this.getItemInSlot = function(itemId){
            return items[itemId];
        };

        this.popUpItem = function(image){
            itemPopup.innerHTML = '';

            var img = document.createElement('img');
            img.src = image;

            itemPopup.appendChild(img);
            $('#itemPopup')
                .stop( true ,true )
                .fadeIn()
                .animate({top: '-=45%'}, 1000, "linear")
                .fadeOut()
                .css( "top" , "50%" );

        };

    }

}