class Axe{
    constructor(object) {
        object.mass = axe.mass;
        var animationTime = 0;
        var animate = false;
        this.object = object;
        axes.push(this);
        this.update	= function(delta) {
            if (animationTime > 0){
                animationTime -= delta * 5;
                object.rotation.y = animationTime + Math.PI * 2;
            }
            else if (animate){
                animationTime = 0;
                object.rotation.y = 0;
                animate = false;
            }
        };
        
        object._type = 'axe';
        scene.add(object);
        
        this.cutAnimation = function () {
            animationTime = 1;
            animate = true;
        }
    }
}
