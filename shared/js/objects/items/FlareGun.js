/**
 * Created by Jildert on 27-10-2017.
 */
class FlareGun{
    constructor(object) {
        object.mass = flaregun.mass;
        this.object = object;
        this.update	= function(delta) {

        };
        object._type = 'flaregun';
        scene.add(object);
        success('You only have one flare. Use it wisely.');
    }
}
