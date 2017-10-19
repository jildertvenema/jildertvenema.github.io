class Item {
    constructor(name, recipe = []){
        this.name = name;
        this.picturePath = "shared/images/items/" + name + ".png";
        this.recipe = recipe;

        this.ToString = function() {
            var string = "";
            if(this.recipe){
                for(let i = 0; i < this.recipe.length; i++){
                    string += this.recipe[i].name + " ";
                }
            }

            return [
                this.name, string
            ];
        }
    }




}



