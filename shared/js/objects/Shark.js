class Shark{
    constructor(object) {
        this.object = object;
        var sharkSpeed = 200;
        var previousSharkPosition = new THREE.Vector3(0, 0, 0);
        this.update = function (delta) {
            if (player.position.distanceTo(object.position) < 200 && !deathOrWin) {
                playerDeath('shark');
            }

            var sunPos = new THREE.Vector3(Math.sin(sunAngle) * 3000, -20, Math.cos(sunAngle) * 3000);
            sunPos.y = -20;

            if (!playerVisable) {
                if (!this.isCloseEnough(object.position.x, previousSharkPosition.x, 5) && !this.isCloseEnough(object.position.z, previousSharkPosition.z, 5)) {
                    var sunDir = sunPos.clone().sub(object.position).normalize();
                    object.lookAt(sunPos);
                    object.position.add(sunDir.multiplyScalar(sharkSpeed * delta));
                }
                else {
                    object.position.set(sunPos.x, -20, sunPos.z);
                    object.rotation.y = (sunAngle + 0.5 * Math.PI);
                }
            }
            else {
                //shark to player
                var dir = player.position.clone().sub(object.position).normalize();
                object.lookAt(player.position);
                object.position.add(dir.multiplyScalar(sharkSpeed * delta));
            }

            previousSharkPosition = sunPos;


            if (underWater && player.position.distanceTo(object.position) < 3000) {
                playerVisable = true;
            }
            else playerVisable = false;
        };

        object._type = 'shark';
        scene.add(object);
        this.isCloseEnough = function (x, y, offset) {return (Math.abs(x - y) <= offset)};
    }
}
