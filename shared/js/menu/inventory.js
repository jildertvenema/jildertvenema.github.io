class Inventory {
    constructor(){ //aka de variabelen?
        var inventory = document.getElementById('inventory');
        var table = document.createElement('table');
        var self = this;

        //create inventory

        this.create = function (){
            for (let i = 0; i < 2; i++) {
                var tr = document.createElement('TR');
                tr.id = 'tr' + i;
                for (let j = 0; j < 8; j++) {

                    let td = document.createElement('TD');
                    let id = j + (i * 8);

                    td.id = id ;

                    td.onmouseover = showToolTip();
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
            if(self.getLength(items) == 16){
                warn("inventory is full");
            }
            else {
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 8; j++) {

                        var id = (j + (i * 8)).toString() ;
                        var current = document.getElementById( id);

                        if (current.innerHTML === '') {
                            if(!returned) popUpItem(item.picturePath);
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

            var current = document.getElementById(itemId);

            if(current.innerHTML != '' && hotbar.addToSlot(items[itemId])){

                items[itemId] = null;
                current.innerHTML = '';

            }
            else{
                console.warn("cannot push empty to hotbar");
            }


        };

        this.getLength = function(array){
            var count = 0;

            for(let i = 0; i < array.length; i ++){
                if(array[i] != null){
                    count ++;
                }
            }

            return count;
        };

        this.getItemInSlot = function(itemId){
            return items[itemId];
        };

    }

}