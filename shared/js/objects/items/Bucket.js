class Bucket{
    constructor(object) {
        object.mass = bucket.mass;
        this.object = object;
        this.kokendWater = false;
        this.gekooktTijd = 0;
        this.hasFish = false;
        buckets.push(this);

        this.fillBucket = function(){
            if (this.object.children[3].visible) return;
            this.object.children[3].visible = true;
            success('Je hebt succesvol water opgepakt');
        };
        this.emptyBucket = function(){
            this.gekooktTijd = 0;
            this.kokendWater = false;
            this.object.children[3].visible = false;
            warn('Je emmer is leeg');
        };

        this.checkBucket = function(){
            var rot =  bucket.rotation;
            var o = 0.5;
            if (rot.z < Math.PI + o && rot.z > Math.PI - o)this.emptyBucket();
            if (rot.x < Math.PI + o && rot.x > Math.PI - o)this.emptyBucket();
        };
        this.addFish = function () {
            this.hasFish = true;
            this.object.children[4].visible = true;
            success('Je hebt een vis in je emmer gestopt');
        };
        this.removeFish = function () {
            this.hasFish = false;
            this.object.children[4].visible = false;
            success('Je hebt een vis uit je emmer gehaald');
        };
        this.update	= function(delta) {
            this.checkBucket();
            if (this.object.position.y < -6.4)this.fillBucket();
            if (this.kokendWater) this.gekooktTijd += delta;
        };
        object._type = 'bucket';
        scene.add(object);
        success('Een bucket is handig om water te koken of voedsel mee te verwarmen');
    }
}
