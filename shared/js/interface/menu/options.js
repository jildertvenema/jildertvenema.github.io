class Options {
    constructor(){

        //gameOptions
        this.volume = 1;
        this.renderDistance = 15500;
        this.godMode = false;

        //difficulty
        var difficultyCounter = 0;
        var difficulties = ["peaceful", "normal", "hardcore"];
        this.difficulty = difficulties[difficultyCounter];

        //quality
        var qualityCounter = 0;
        var qualities = ["fast", "normal", "fancy"];
        this.quality = qualities[qualityCounter];

        var self = this;
        var isOpen;
        var element = document.getElementById("options");

        //document values
        var volume = document.getElementsByName("volume")[0];
        var renderDistance = document.getElementsByName("renderDistance")[0];
        var quality = document.getElementsByName("quality")[0];
        var difficulty = document.getElementsByName("difficulty")[0];
        var godmode = document.getElementsByName("godmode")[0];

        //toggle gameOptions visi
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

        //save values to object
        this.save = function(){

            this.godMode = godmode.value === 'true';
            this.quality = quality.value;
            this.difficulty = difficulty.value;
            this.volume = volume.value;
            this.renderDistance =  parseInt(renderDistance.value);

            self.updateSettings();

        };

        //update difficulty
        this.updateDifficulty = function(){
            difficultyCounter++;

            if(difficultyCounter === 3)
                difficultyCounter = 0;

            let result = difficulties[difficultyCounter];

            difficulty.innerText = "Difficulty: " + result;
            difficulty.setAttribute("value", result);
            this.difficulty = result;
        };

        //update godmode
        this.updateGodMode = function(){
            if(this.godMode){

                godmode.innerText = "Godmode: off";
                this.godMode = false;
                godmode.setAttribute("value", "false");
            }
            else{

                godmode.innerText = "Godmode: on";
                this.godMode = true;
                godmode.setAttribute("value", "true");
            }
        };

        //update quality
        this.updateQuality = function(){
            qualityCounter++;

            if(qualityCounter === 3)
                qualityCounter = 0;

            let result = qualities[qualityCounter];

            quality.innerText = "gamemode: " + result;
            quality.setAttribute("value", result);
            this.quality = result;
        };

        //return current options
        this.ToString = function(){
            return "Volume: " + this.volume + "\n" +
            "Render distance: " + this.renderDistance + "\n" +
            "Quality: " + this.quality + "\n" +
            "Godmode: " + this.godMode + "\n" +
            "Difficulty: " + this.difficulty + "\n";
        }

        this.updateSettings = function(){

            camera.far = gameOptions.renderDistance;
            scene.fog.far = gameOptions.renderDistance;
            godMode = gameOptions.godMode;
            backgroundSong.volume = gameOptions.volume;

            console.log(gameOptions.ToString());

            camera.updateProjectionMatrix();

        }
    }
}