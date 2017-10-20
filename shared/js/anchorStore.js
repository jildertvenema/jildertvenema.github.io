class anchorStore{
    constructor() {
        this.placeObject = undefined;
        this.isBeingPlaced = false;

        this.update = function (delta) {
            //place anchor object
            if (this.isBeingPlaced && this.placeObject){

                if (this.placeObject._type == 'spear' ||this.placeObject._type == 'axe' ) {
                    var direction = controls.getObject().getWorldDirection().multiplyScalar(-1);
                    direction.y = camera.getWorldDirection().y;
                    var newPos = direction.clone().multiplyScalar(20);
                    var playerPos = player.position.clone().add(newPos);
                    this.placeObject.position.set(playerPos.x, playerPos.y, playerPos.z);
                    this.placeObject.rotation.z  = controls.getY();
                    if (this.placeObject._type == 'spear' )this.placeObject.rotation.x = -Math.PI / 2;
                    else this.placeObject.rotation.x = 0;
                    this.placeObject.rotation.y = camera.rotation.y;
                }
                else {
                    mouse.x = 0.017;
                    mouse.y = 0.017;

                    raycaster.setFromCamera(mouse, camera);

                    var intersects = raycaster.intersectObjects(scene.children);

                    for (var i = 0; i < intersects.length; i++) {
                        var intercectigns = ['terrain', 'campfire', 'hout', 'steen'];
                        if (intercectigns.indexOf(intersects[i].object._type) === -1 || intersects[i].object === _anchorStore.placeObject) continue;

                        var dis = player.position.distanceTo(intersects[i].point);
                        if (dis > 150) {
                            _anchorStore.placeObject.position.set(lastPlacePos.x, lastPlacePos.y, lastPlacePos.z);
                            continue;
                        }

                        this.placeObject.position.x = (intersects[i].point.x);
                        this.placeObject.position.y = (intersects[i].point.y + 5);
                        this.placeObject.position.z = (intersects[i].point.z);
                        lastPlacePos = intersects[i].point;
                        break;
                    }
                }
            }
        }
    }
}
