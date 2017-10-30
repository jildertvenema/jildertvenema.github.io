class Spear{
    constructor(object) {
        object.mass = spear.mass;
        this.object = object;
        spears.push(this);
        this.update	= function(delta) {

        };
        object._type = 'spear';
        for (let i = 0 ; i < object.children.length; i++) object.children[i]._type = 'spear';
        scene.add(object);
        success('Maybe you can use this spear to catch something!');
    }
}
