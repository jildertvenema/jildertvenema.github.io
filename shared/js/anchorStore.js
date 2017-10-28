class AnchorStore{
    constructor() {
        this.placeObject = undefined;
        this.isBeingPlaced = false;
        this.lastPlacePos = new THREE.Vector3(0,0,0);
        this.weaponHold = false;
        this.weapon = undefined;
        this.otherObject = undefined;
        this.otherIsBeingPlaced = false;
        this.objectGone = false;
        this.otherLastPlace = new THREE.Vector3(0,0,0);

        this.update = function (delta) {

            this.checkPlacement();

            if (this.weaponHold){
                var xoffset = 0;
                if (this.weapon.object._type === 'flaregun')this.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,-18);
                if (this.weapon.object._type === 'axe')this.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,-20);
                if (this.weapon.object._type === 'spear')this.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,0);
                if (this.weapon.object._type === 'flaregun' || this.weapon.object._type === 'spear') xoffset = -Math.PI / 2;
                if (this.weapon.object._type === 'axe')  xoffset = -Math.PI;
                this.weapon.object.rotation.x =  player.children[0].children[0].rotation.x + xoffset;
                this.weapon.object.__dirtyPosition = true;
                this.weapon.object.__dirtyRotation = true;
            }
        };

        this.checkPlacement = function(){
            if (this.isBeingPlaced &&  this.placeObject) {
                mouse.x = 0.017;
                mouse.y = 0.017;

                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(scene.children);

                for (var i = 0; i < intersects.length; i++) {
                    var intersecting = ['terrain', 'campfire', 'hout', 'steen', 'bucket'];
                    if (intersecting.indexOf(intersects[i].object._type) === -1 || intersects[i].object ===  this.placeObject) continue;

                    var dis = player.position.distanceTo(intersects[i].point);
                    if (dis > 150) {
                        this.placeObject.position.set(this.lastPlacePos.x, this.lastPlacePos.y, this.lastPlacePos.z);
                        continue;
                    }

                    this.placeObject.position.x = (intersects[i].point.x);
                    this.placeObject.position.y = (intersects[i].point.y + 5);
                    this.placeObject.position.z = (intersects[i].point.z);
                    this.lastPlacePos.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
                    break;
                }
            }
        };

        this.anchorObject = function(object) {
            this.isBeingPlaced = true;
            this.placeObject =  object;
        };

        this.deAnchorObject = function() {
            if (!this.isBeingPlaced) return;
            this.isBeingPlaced = false;
            this.letGoObject(this.placeObject);
            this.objectGone = true;
        };
        this.anchorOtherObject = function(object) {
            this.otherIsBeingPlaced = true;
            this.otherObject =  object;
        };

        this.deAnchorOtherObject = function() {
            if (!this.otherIsBeingPlaced) return;
            this.otherIsBeingPlaced = false;
            this.letGoOtherObject(this.otherObject);
        };

        this.setWeapon = function(weapon){
            player.add(weapon.object);
            this.weapon = weapon;
            this.weaponHold = true;
        };
        this.removeWeapon = function(){
            if (!this.weaponHold) return;
            player.remove(this.weapon.object);
            this.weapon.object.position.set(0,0,-25);
            this.weaponHold = false;
        };

        this.letGoObject = function(){
            if (this.placeObject._type == 'spear') {
                this.lastPlacePos = player.position.clone();
                this.lastPlacePos.add(player.getWorldDirection().multiplyScalar(10));
            }

            if (this.placeObject._type === 'campfire')this.lastPlacePos.y -= 5;

            this.placeObject.position.set(this.lastPlacePos.x, this.lastPlacePos.y +5 , this.lastPlacePos.z);
            this.placeObject.__dirtyPosition = true;
            this.placeObject.__dirtyRotation = true;
        };

        this.letGoOtherObject = function(){
            if (this.otherObject._type == 'spear') {
                this.otherLastPlace = otherModel.position.clone();
                this.otherLastPlace.add(otherModel.getWorldDirection().multiplyScalar(10));
            }

            if (this.otherObject._type === 'campfire')this.otherLastPlace.y -= 5;

            this.otherObject.position.set(this.otherLastPlace.x, this.otherLastPlace.y +5 , this.otherLastPlace.z);
            this.otherObject.__dirtyPosition = true;
            this.otherObject.__dirtyRotation = true;
        };
    }
}
