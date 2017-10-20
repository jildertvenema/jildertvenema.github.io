class Bucket{
    constructor(object) {
        object.mass = bucket.mass;
        _anchorStore.placeObject = object;
        _anchorStore.isBeingPlaced = true;
        this.object = object;
        this.kokendWater = false;
        this.gekooktTijd = 0;

        this.fillBucket = function(){
            this.object.children[3].visible = true;
        };
        this.emptyBucket = function(){
            this.gekooktTijd = 0;
            this.kokendWater = false;
            this.object.children[3].visible = false;
        };

        this.checkBucket = function(){
            var rot =  bucket.rotation;
            var o = 0.5;
            if (rot.z < Math.PI + o && rot.z > Math.PI - o)this.emptyBucket();
            if (rot.x < Math.PI + o && rot.x > Math.PI - o)this.emptyBucket();
        };
        this.update	= function(delta) {
            this.checkBucket();
            if (this.object.position.y < -6.4)this.fillBucket();
            if (this.kokendWater) this.gekooktTijd += delta;
        };
        object._type = 'bucket';
        scene.add(object);
    }
}
