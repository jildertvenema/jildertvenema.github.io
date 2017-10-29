class CampFire{
    constructor(object) {
        object.mass = campfire.mass;
        campfires.push(this);
        this.object = object;
        this.isOnFire = false;
        var pointLight;
        var fireWidth  = 20;
        var fireHeight = 40;
        var fireDepth  = 20;
        var sliceSpacing = 0.5;
        var fire = new VolumetricFire(
            fireWidth,
            fireHeight,
            fireDepth,
            sliceSpacing,
            camera
        );

        this.update	= function(elapsed, delta) {
            if (fire != undefined ) fire.update( elapsed);
            for (var i =0 ; i < buckets.length; i ++){
                if (fire.mesh.position.distanceTo(buckets[i].object.position) < 10 && buckets[i].object.children[3].visible && !buckets[i].kokendWater){
                    success('Succesvol water gekookt');
                    buckets[i].kokendWater = true;
                }
            }
            if (fire.mesh.position.distanceTo(player.position) < 18){
                hp -= 20 * delta;
                warn('Au');
                if (hp <= 0){
                    hp = 0;
                    playerDeath('went in flames');
                }
                document.getElementById('hpbar').style.width = hp + '%';
            }
            if (fire.mesh.position.distanceTo(player.position) < 100) {
            player.dichtbijVuur = true;
            }
        };


        this.fireStart = function(){
            campfire.isOnFire = true;
            var pos = this.object.position;
            pos.y += 10;

            fire.mesh.position.set( pos.x, pos.y, pos.z );
            scene.add( fire.mesh );

            this.pointLight = new THREE.PointLight( 0xFFCF50, 2, 300 );
            this.pointLight.position.set( pos.x, pos.y, pos.z);
            scene.add(this.pointLight );

            fire.mesh.visible = true;
            console.log(fire);
            success('noice');

        };


        this.fireStop = function() {
            if (fire)fire.mesh.visible = false;
            if (pointLight != undefined ) {
                pointLight.intensity = 0;
                pointLight.needsUpdate = true;
            }
        };


        this.object._type = 'campfire';
        scene.add(object);
    }

}
