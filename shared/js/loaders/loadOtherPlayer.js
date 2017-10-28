class loadOtherPlayer {

    loadJsonModel (){

        // Prepare JSONLoader
        var jsonLoader = new THREE.JSONLoader();
        jsonLoader.load('shared/models/json/girl.json', function (geometry, materials) {

            materials.forEach(function (mat) {
                mat.skinning = true;
            });

            // Prepare SkinnedMesh with MeshFaceMaterial (using original texture)
            var modelMesh = new THREE.SkinnedMesh(
                geometry, new THREE.MeshFaceMaterial(materials)
            );

            // Set position and scale
            var scale = 40;
            modelMesh.position.set(0, -15, 0);
            modelMesh.scale.set(scale, scale, scale);

            // Prepare animation
            mixer = new THREE.AnimationMixer( modelMesh );
            mixer.clipAction( geometry.animations[0] ).play();

            // Add the mesh and play the animation

            var physGeom = new THREE.CylinderGeometry(10, 20, 30, 50);
            var physMaterial = new Physijs.createMaterial(new THREE.MeshBasicMaterial({}));
            physMaterial.visible = false;
            var physObject = new Physijs.CylinderMesh(physGeom, physMaterial, 20);

            physObject.add(modelMesh);

            otherModel = physObject;
            otherModel.addEventListener("ready", function(){
                otherModel.setAngularFactor(new THREE.Vector3(0, 0, 0));
            });

            otherModel.visible = false;
            scene.add(otherModel);
        });

    };
}