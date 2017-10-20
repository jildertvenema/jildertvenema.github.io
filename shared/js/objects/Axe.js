class Axe{
    constructor(object) {
        object.mass = axe.mass;
        _anchorStore.placeObject = object;
        _anchorStore.isBeingPlaced = true;
        this.object = object;
        this.update	= function(delta) {

        };
        object._type = 'axe';
        scene.add(object);
    }
}
