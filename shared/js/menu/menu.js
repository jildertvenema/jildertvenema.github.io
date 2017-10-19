class Menu{
    constructor() { //aka de variabelen?
        var inventoryIsOpen = false;
        var craftingIsOpen = false;

        new Inventory().create();
        new Crafting().createList();

        var menu = document.getElementById('menu');
        var inventory = document.getElementById('inventory');
        var crafting = document.getElementById('crafting');
        var blocker = document.getElementById('blocker');

        var self = this;

        this.toggleCrafting = function(){
            if(craftingIsOpen) {

                inventoryIsOpen = false;
                craftingIsOpen = false;
                element.requestPointerLock();

                menu.style.display = "none";
            }
            else{

                inventory.style.visibility = "hidden";
                crafting.style.visibility = "visible";
                menu.style.display = "block";

                craftingIsOpen = true;
                inventoryIsOpen = false;

                interfacePause = true;
                pauseGame();
            }
        };

        this.toggleInventory = function(){
            if(inventoryIsOpen){

                inventoryIsOpen = false;
                craftingIsOpen = false;
                element.requestPointerLock();

                menu.style.display = "none";
            }
            else{

                crafting.style.visibility = "hidden";
                inventory.style.visibility = "visible";
                menu.style.display = "block";

                inventoryIsOpen = true;
                craftingIsOpen = false;

                interfacePause = true;
                pauseGame();
            }
        };
    }
}