class Menu{
    constructor() { //aka de variabelen?
        let inventoryIsOpen = false;
        let craftingIsOpen = false;

        inv.create();
        new Crafting().createList();

        let menu = document.getElementById('menu');
        let inventory = document.getElementById('inventory');
        let crafting = document.getElementById('crafting');
        let blocker = document.getElementById('blocker');

        let self = this;

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