class ShipPlaneHandler{
    constructor() {
        this.pirateBoat = new THREE.Object3D();
        this.airPlane = new THREE.Object3D();
        this.isBoat = false;
        this.isPlane = false;
        this.update	= function(delta) {
            if (this.isBoat){
                this.pirateBoat.position.z += delta * 200;
                if ( this.pirateBoat.position.z > 30000){
                    this.isBoat = false;
                    this.pirateBoat.visible = false;
                }
            }
            if (this.isPlane) {
                this.airPlane.position.z += delta * 500.0;
                if ( this.airPlane.position.z > 10000){
                    this.isPlane = false;
                    this.airPlane.visible = false;
                }
            }

            if (scene.children.indexOf(boat) != -1){
                boat.position.z += delta * 100;
            }
        };
        this.spawnBoat = function(){
            if (this.pirateBoat == undefined) return;

            this.pirateBoat.position.set(-25000, 170, -20000);
            this.isBoat = true;
            this.pirateBoat.visible = true;
        };
        this.flyPlane = function(){
            if (this.airPlane == undefined) return;
            var planeSound = new Audio('shared/sounds/plane.mp3');
            planeSound.play();
            this.airPlane.position.set(80, 10000, -10000);
            this.isPlane = true;
            this.airPlane.visible = true;
        };
    }
}
