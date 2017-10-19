class person{
    constructor(playerName, playerHealth) {

        this.playerName = playerName;
        this.playerHealth = playerHealth;

    }

    create(){

        var player;

        controls = new THREE.PointerLockControls( camera );

        var physGeom = new THREE.CylinderGeometry(10, 20, 30, 50);
        var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
        physMaterial.visible = false;

        var physObject = new Physijs.CylinderMesh(physGeom, physMaterial, 20);
        //physObject.position.set(controls.getObject().position);

        physObject.add( controls.getObject());

        controls.getObject().position.y = 10;
        physObject.position.y = 300;
        physObject.__dirtyPosition = true;
        player = physObject;
        player._type = 'player';
        savedPos.set(player.position.x, player.position.y, player.position.z);

        player.addEventListener("ready", function(){
            player.setAngularFactor(new THREE.Vector3(0, 0, 0));
        });

        scene.add(physObject);

        return player;
    }

}


