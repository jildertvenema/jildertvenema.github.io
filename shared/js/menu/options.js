class Options {
    constructor(){

        //options
        this.volume = 100;
        this.renderDistance = 100;
        this.quality = 100;
        this.godMode = false;

        //difficulty
        var difficultyCounter = 0;
        var difficulties = ["peaceful", "normal", "hardcore"];
        this.difficulty = difficulties[difficultyCounter];

        //options array for easy loop
        this.options = [this.volume, this.renderDistance,
            this.quality];

        var self = this;

        var isOpen;
        var element = document.getElementById("options");

        //document values
        var volume = document.getElementsByName("volume")[0];
        var renderDistance = document.getElementsByName("renderDistance")[0];
        var quality = document.getElementsByName("quality")[0];
        var difficulty = document.getElementById("difficulty");
        var godMode = document.getElementById("godmode");


        var options = [volume, renderDistance,
            quality];

        //toggle options visi
        this.toggle = function(){
            if(isOpen){
                element.style.display = "none";
                isOpen = false;
            }
            else{
                element.style.display = "block";
                isOpen = true;
            }
        };

        //set latest values
        this.setValue = function(){
            for( let i = 0; i < options.length; i ++ ){
                options[i].value = this.options[i];
            }

            godMode.checked = this.godMode;
        };

        //save values to object
        this.save = function(){
            for( let i = 0; i < this.options.length; i ++ ){
                this.options[i] = options[i].value
            }

            self.toggle();
        };

        //update difficulty
        this.updateDifficulty = function(){
            difficultyCounter++;

            if(difficultyCounter === 3)
                difficultyCounter = 0;

            difficulty.innerText = "gamemode: " + difficulties[difficultyCounter];
        };

        this.updateGodMode = function(){
            if(this.godMode){

                this.godMode = false;
                godMode.innerText = "Godmode: off";

            }
            else{

                this.godMode = true;
                godMode.innerText = "Godmode: on";

            }
        };
    }
}