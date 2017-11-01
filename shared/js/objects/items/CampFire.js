class CampFire{
    constructor(object) {
        object.mass = campfire.mass;
        campfires.push(this);
        this.object = object;
        this.isOnFire = false;
        if (this.object.objID == undefined)this.object.objID = Date.now();
        var pointLight;
        var fireWidth  = 20;
        var fireHeight = 40;
        var fireDepth  = 20;
        var sliceSpacing = 0.5;
        this.campfired = false;
        this.campfireID = undefined;
        var fire = new VolumetricFire(
            fireWidth,
            fireHeight,
            fireDepth,
            sliceSpacing,
            camera
        );
        var self = this;

        this.update	= function(elapsed, delta) {
            if (fire != undefined ) fire.update( elapsed);
            for (var i =0 ; i < buckets.length; i ++){
                if (fire.mesh.position.distanceTo(buckets[i].object.position) < 10 && buckets[i].object.children[3].visible && !buckets[i].kokendWater){
                    success('Succesfully cooked some water.');
                    buckets[i].kokendWater = true;
                }
            }
            if (fire.mesh.position.distanceTo(player.position) < 18){
                playerClass.hp -= 20 * delta;
                warn('Auwch!');
                if ( playerClass.hp <= 0){
                    playerClass.hp = 0;
                    playerDeath("You have died in the flames of your own campfire...");
                }
                document.getElementById('hpbar').style.width =  playerClass.hp + '%';
            }
            if (fire.mesh.position.distanceTo(player.position) < 100) {
                dichtBijVuur = true;
            }
            else{
                dichtBijVuur = false;
            }
        };


        this.fireStart = function(){
            if (campfire.isOnFire) return;
            campfire.isOnFire = true;
            var pos = this.object.position;
            pos.y += 10;

            fire.mesh.position.set( pos.x, pos.y, pos.z );
            scene.add( fire.mesh );

            pointLight = new THREE.PointLight( 0xFFCF50, 2, 300 );
            pointLight.position.set( pos.x, pos.y, pos.z);
            scene.add(pointLight );

            fire.mesh.visible = true;
            console.log(fire);
            success('You have made a fire!');
            self.campfired = true;
            self.campfireID = self.object.objID;
        };


        this.fireStop = function() {
            if (fire)fire.mesh.visible = false;
            if (pointLight != undefined ) {
                pointLight.intensity = 0;
                pointLight.needsUpdate = true;
            }
            campfire.isOnFire = false;
        };


        this.object._type = 'campfire';
        scene.add(object);
    }

}
