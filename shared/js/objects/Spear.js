class Spear{
    constructor(object) {
        object.mass = spear.mass;
        _anchorStore.placeObject = object;
        _anchorStore.isBeingPlaced = true;
        this.object = object;
        this.update	= function(delta) {

        };
        object._type = 'spear';
        scene.add(object);
    }
}
