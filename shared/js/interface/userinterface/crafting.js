class Crafting{
    constructor(){
        let craftedItem = document.getElementById( "craftedItem" );
        let itemName = document.getElementById( "craftAbleItemName" );
        let craftAbleItems = document.getElementById( "craftAbleItems" );
        let requiredItems = document.getElementById( "requiredItems" );

        let self = this;

        this.create = function(){
            for(let i = 0; i < craftables.length; i++){
                let item = Object.assign(craftables[i]);
                if(item.recipe.length > 0) {
                    let li = document.createElement('li');
                    let img = document.createElement('img');

                    img.src = item.picturePath;
                    li.appendChild(img);

                    li.innerHTML += item.name;

                    li.onclick = function () {
                        self.itemClick(i);
                    };
                    
                    craftAbleItems.appendChild(li);
                }
            }
        };

        this.itemClick = function(index){
            requiredItems.innerHTML = "";
            let itemToCraft = Object.assign(craftables[index]);

            for(let i = 0; i < itemToCraft.recipe.length; i++){
                let requiredItem = Object.assign(itemToCraft.recipe[i]);

                let li = document.createElement('li');
                let img = document.createElement('img');

                img.src = requiredItem.picturePath;
                li.appendChild(img);
                li.innerHTML += requiredItem.name;
                requiredItems.appendChild(li);
            }

            let img = document.createElement('img');

            img.src = itemToCraft.picturePath;
            img.onclick = function() { self.craftItem(itemToCraft); };

            craftedItem.innerHTML = "";
            craftedItem.appendChild(img);

            itemName.innerHTML = itemToCraft.name;
        };

        this.craftItem = function(item){

            if(self.containsAll(item.recipe, items)){
                $('#craftingProgress')
                    .animate({width: '100%'}, 1000)
                    .delay(2000)
                    .queue(function (next) {
                        $(this)
                            .css("background", "rgba(0,0,0,0)")
                            .text("Succesfully crafted!");
                        next();
                    });


                setTimeout(inv.pushItem(item), 4000);
            }
            else{
                warn("Insufficient resources.");
            }

        };

        this.containsAll = function (needles, haystack){
            let contains = false;

            //array for indexes it shouldnt check again
            let doNotCheck = [];

            outerloop:
            for( let i = 0 ; i < needles.length; i++ ){
                for ( let j = 0; j < haystack.length; j++ ){
                    //if Item is not null and exists in inventory: add it to doNotCheck and
                    // set contains value to true
                    if ( haystack[j]
                        && haystack[j].name === needles[i].name
                        && doNotCheck.indexOf(j) === -1 ){
                        console.log("found required Item");
                        doNotCheck.push(j);

                        contains = true;
                        break;
                    }
                    //otherrwise you dont have the Item and the loop is stopped
                    else{
                        contains = false;
                        if(j === haystack.length - 1) break outerloop;
                    }
                }
            }
            //if required items are found
            if(contains){
                for(let i = 0; i < doNotCheck.length; i++){
                    //remove from Item array
                    let id = doNotCheck[i];

                    items[id] = null;

                    //remove from inventory element
                    let current = document.getElementById(id.toString());
                    current.innerHTML = '';
                }
            }

            //clear doNotCheck list
            doNotCheck.splice(0,1000);
            return contains;
        }
    }
}