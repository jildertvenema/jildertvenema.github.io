class Tutorial {
    constructor() {

        var self = this;

        this.start = function () {

            blocker.style.display = "none";

            player.mass = 0;
            player.needsUpdate = true;
            player.position.set(0, 300, 0);
            player.rotation.y = 0;
            player.__dirtyPosition = true;
            player.__dirtyRotation = true;
            self.moveToPosition(new THREE.Vector3(0, 300, 200));

        };

        this.moveToPosition = function (pos) {
            var lastPos = player.position;
            var differenceInX = Math.abs(lastPos.x - pos.x);
            var differenceInY = Math.abs(lastPos.y - pos.y);
            var differenceInZ = Math.abs(lastPos.z - pos.z);

        }
    }
}