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
        var self = this;

        this.update = function (delta) {

            self.checkPlacement();

            if (self.weaponHold){
                var xoffset = 0;
                if (self.weapon.object._type === 'flaregun')self.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,-18);
                if (self.weapon.object._type === 'axe')self.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,-20);
                if (self.weapon.object._type === 'spear')self.weapon.object.position.set(5, player.children[0].children[0].rotation.x + 0,0);
                if (self.weapon.object._type === 'flaregun' || self.weapon.object._type === 'spear') xoffset = -Math.PI / 2;
                if (self.weapon.object._type === 'axe')  xoffset = -Math.PI;
                self.weapon.object.rotation.x =  player.children[0].children[0].rotation.x + xoffset;
                self.weapon.object.__dirtyPosition = true;
                self.weapon.object.__dirtyRotation = true;
            }
        };

        this.checkPlacement = function(){
            if (self.isBeingPlaced &&  self.placeObject) {
                mouse.x = 0.017;
                mouse.y = 0.017;

                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(scene.children);

                for (var i = 0; i < intersects.length; i++) {
                    var intersecting = ['terrain', 'campfire', 'hout', 'steen', 'bucket'];
                    if (intersecting.indexOf(intersects[i].object._type) === -1 || intersects[i].object ===  self.placeObject) continue;

                    var dis = player.position.distanceTo(intersects[i].point);
                    if (dis > 150) {
                        self.placeObject.position.set(self.lastPlacePos.x, self.lastPlacePos.y, self.lastPlacePos.z);
                        continue;
                    }

                    self.placeObject.position.x = (intersects[i].point.x);
                    self.placeObject.position.y = (intersects[i].point.y + 5);
                    self.placeObject.position.z = (intersects[i].point.z);
                    self.lastPlacePos.set(intersects[i].point.x, intersects[i].point.y, intersects[i].point.z);
                    break;
                }
            }
        };

        this.anchorObject = function(object) {
            self.isBeingPlaced = true;
            self.placeObject =  object;
        };

        this.deAnchorObject = function() {
            if (!self.isBeingPlaced) return;
            self.isBeingPlaced = false;
            letGoObject();
            self.objectGone = true;
        };
        this.anchorOtherObject = function(object) {
            self.otherIsBeingPlaced = true;
            self.otherObject =  object;
        };

        this.deAnchorOtherObject = function() {
            if (!self.otherIsBeingPlaced) return;
            self.otherIsBeingPlaced = false;
            //self.letGoOtherObject(self.otherObject);
        };

        this.setWeapon = function(weapon){
            player.add(weapon.object);
            self.weapon = weapon;
            self.weaponHold = true;
        };
        this.removeWeapon = function(){
            if (!self.weaponHold) return;
            player.remove(self.weapon.object);
            self.weapon.object.position.set(0,0,-25);
            self.weaponHold = false;
        };

        function letGoObject(){

            if (self.placeObject._type === 'spear') {
                self.lastPlacePos = player.position.clone();
                self.lastPlacePos.add(player.getWorldDirection().multiplyScalar(10));
            }

            if (self.placeObject._type === 'campfire')self.lastPlacePos.y -= 5;

            self.placeObject.position.set(self.lastPlacePos.x, self.lastPlacePos.y +5 , self.lastPlacePos.z);
            self.placeObject.__dirtyPosition = true;
            self.placeObject.__dirtyRotation = true;
        };

        this.letGoOtherObject = function(){
            if (self.otherObject._type == 'spear') {
                self.otherLastPlace = otherModel.position.clone();
                self.otherLastPlace.add(otherModel.getWorldDirection().multiplyScalar(10));
            }

            if (self.otherObject._type === 'campfire')self.otherLastPlace.y -= 5;

            self.otherObject.position.set(self.otherLastPlace.x, self.otherLastPlace.y +5 , self.otherLastPlace.z);
            self.otherObject.__dirtyPosition = true;
            self.otherObject.__dirtyRotation = true;
        };
    }
}
