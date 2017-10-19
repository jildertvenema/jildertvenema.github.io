class island{

    createIsland(){
        var texturesPath, heightmapImage, waterNormals;

        var objectsToLoad = [
            ['tree1', 150, 120, 0, 'shared/models/trees/tree1/', 'Tree N161113.obj.mtl', 'Tree N161113.obj', 50, 0, -2, 0, -1.5, 0, 0 , 0, true],
            ['campfire', -100, 108, 0, 'shared/models/', 'mtl/Campfire_v2.mtl', 'obj/Campfire_v2.obj', 0.5, 0, 0, 0, 0, 0 , 0 , 0 , true],
            ['bucket' , -80, 120, 20, 'shared/models/', 'mtl/bucket.mtl', 'obj/bucket.obj', 0.1, 3, 0, -60, 0, 0, -75, -130, true],
            ['plane' , 80, 5000, -10000, 'shared/models/', 'mtl/cirrus.mtl', 'obj/cirrus.obj', 20, 0, 0, -60, 0, 0, -100, -130, false],
            ['phone' , 0, 150, -200, 'shared/models/', 'mtl/phone.mtl', 'obj/phone.obj', 0.5, 3, 0, 10, 0, 0, 0, -30, true],
            ['pirate ship' , -12000, 170, 12000, 'shared/models/', 'mtl/Pirate Ship.mtl', 'obj/Pirate Ship.obj', 20, 0, 0, 0, 0, 0, 0, 0, false],
            ['shark', -100, 140, -100, 'shared/models/', 'mtl/shark.mtl', 'obj/shark.obj', 5, 0, 0, 0, 0, 0 , 0 , 0 , false],
            ['help', -336, 47, -1000, 'shared/models/obj/', 'help.mtl', 'help.obj', 10, 0, 0, 0, 0, 0 , 0 , 0 , false],
            ['spear', 200, 150, -1000, 'shared/models/', 'mtl/spear.mtl', 'obj/spear.obj', 2, 3, 2, 2, 2, 0 , -45 , 0 , true]
        ];

        texturesPath = "shared/models/textures/";

        var parameters = {
            width: 2000,
            height: 2000,
            widthSegments: 250,
            heightSegments: 250,
            depth: 1500,
            param: 4,
            filterparam: 1
        };

        var tmaterial = THREE.Terrain.generateBlendedMaterial([
            // The first texture is the base; other textures are blended in on top.
            {texture: THREE.ImageUtils.loadTexture( texturesPath + 'terrain/sand3.jpg')},
            // Start blending in at height -80; opaque between -35 and 20; blend out by 50
            {texture: THREE.ImageUtils.loadTexture( texturesPath + 'terrain/grass1.jpg'), levels: [20, 60, 100, 30]},
            {texture: THREE.ImageUtils.loadTexture( texturesPath + 'terrain/stone1.jpg'), levels: [60, 90, 150, 30]},
            // How quickly this texture is blended in depends on its x-position.
            {texture: THREE.ImageUtils.loadTexture( texturesPath + 'terrain/grass1.jpg'), glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 80.0, 150.0, vPosition.z)'},
            // Use this texture if the slope is between 27 and 45 degrees
            {texture: THREE.ImageUtils.loadTexture( texturesPath + 'terrain/stone1.jpg'), glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2'}
        ]);

        //land

        heightmapImage = new Image();
        heightmapImage.src = texturesPath + 'terrain/heightmap.png';

        heightmapImage.onload = function() {generate()};

        function generate(){
            var xS = 127, yS = 127;
            terrain = {
                easing: THREE.Terrain.Linear,
                frequency: 2.5,
                heightmap: heightmapImage,
                material: tmaterial,
                maxHeight: 150,
                minHeight: -200,
                steps: 1,
                useBufferGeometry: false,
                xSegments: xS,
                xSize: 10000,
                ySegments: yS,
                ySize: 10000
            };

            var terrainScene = THREE.Terrain(terrain);

            var he = document.getElementById('heightmap');
            if (terrain) {
                terrain.heightmap = he;
                THREE.Terrain.toHeightmap(terrainScene.children[0].geometry.vertices, terrain);
            }

            var physGeom = terrainScene.children[0].geometry;
            terrainScene.children[0]._type = 'terrain';

            var physMaterial = new Physijs.createMaterial(terrainScene.children[0].material, 10, 0.5);

            physMaterial.visible = false;
            var physObject = new Physijs.HeightfieldMesh(physGeom, physMaterial, 0);

            physObject.add(terrainScene.children[0]);

            physObject._type = 'terrain';

            physObject.rotateX(-Math.PI /2);

            terrain = physObject;
            scene.add(physObject);

            var mobilebereik = new THREE.CylinderGeometry( 200, 200, 1000, 32 );
            var mobile_mat = new THREE.MeshBasicMaterial( { color: 0xffff00, opacity: 0.1 } );
            var mobilemesh = new THREE.Mesh(mobilebereik, mobile_mat);
            mobilemesh.position.set(61,0,2251)
            scene.add(mobilemesh)
        }

        //DAY NIGHT

        sunAngle = 0.8;
        dayDuration	= 1500;

        renderer.autoClear = false;
        sunSphere	= new THREEx.DayNight.SunSphere();
        scene.add( sunSphere.object3d );

        sunLight	= new THREEx.DayNight.SunLight();
        scene.add( sunLight.object3d );

        skydom	= new THREEx.DayNight.Skydom();
        scene.add( skydom.object3d );

        starField	= new THREEx.DayNight.StarField();
        scene.add( starField.object3d );


        //water

        waterNormals = new THREE.TextureLoader().load( texturesPath + 'waternormals.jpg' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;


        water = new THREE.Water( renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 	0.5,
            sunDirection: sunLight.object3d.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 5.0,
            fog: scene.fog != undefined
        } );

        var mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
            water.material
        );

        water.material.transparent = false;
        water.material.alphaTest = 1;
        water.material.side = THREE.DoubleSide;
        mirrorMesh.add( water );
        mirrorMesh.rotation.x = - Math.PI * 0.5;
        scene.add( mirrorMesh );

        //model

        var objectloader = function(_type, x, y, z, path, mtlpath, objpath, scale, mass, x_offset = 0 ,y_offset = 0, z_offset = 0, x_object = 0, y_object=0, z_object=0, collider = true,){
            var oneCollider = false;
            if (_type == 'campfire' || _type == 'spear') oneCollider = true;
            THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath( path );
            mtlLoader.load( mtlpath, function( materials ) {
                if (_type == 'bucket') {
                    materials.side = THREE.DoubleSide;
                }
                materials.preload();

                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials( materials );
                objLoader.setPath( path );
                objLoader.load( objpath, function ( object ) {

                        var pObject;

                        if (collider) {
                            for (var i = 0; i < object.children.length; i++) {
                                if (oneCollider) {
                                    pObject = (MeshToPhy(object, mass, x_offset, y_offset, z_offset, x_object, y_object, z_object));;
                                    pObject.scale.set(scale, scale, scale);
                                    pObject.position.set(x, y, z);
                                    pObject.add(object);
                                    scene.add(pObject);
                                    allObjects.push(pObject);
                                    pObject._type = _type;
                                    break;
                                }

                                pObject = (MeshToPhy(object.children[i], mass, x_offset, y_offset, z_offset, x_object, y_object, z_object));;
                                pObject.scale.set(scale, scale, scale);

                                if (object.children[i] != undefined) pObject.add(object.children[i]);
                                else pObject.add(object);
                                pObject.position.set(x, y, z);
                                scene.add(pObject);
                                allObjects.push(pObject);
                                pObject._type = _type;
                            }
                        }
                        else{
                            object.position.set(x, y, z);
                            object.scale.set(scale, scale, scale);
                            scene.add(object);
                            allObjects.push(object);
                        }

                        if (_type == 'plane'){
                            plane = object;
                            plane.visible = false;
                        }

                        if (_type == 'bucket'){
                            bucket = pObject;
                            var geometry = new THREE.CircleBufferGeometry( 80, 32 );
                            var material = new THREE.MeshBasicMaterial( { color: 0x87CEEB } );
                            var circle = new THREE.Mesh( geometry, material );
                            circle.rotateX(-Math.PI / 2);
                            circle.position.y += 15;
                            scene.add( circle );
                            bucket.add(circle);
                            bucket.kokendWater = false;
                            bucket.gekooktTijd = 0;
                        }

                        if (_type == 'campfire'){
                            campfire = pObject;
                            campfire.isOnFire = false;
                        }

                        if (_type == 'phone'){
                            phone = pObject;
                        }

                        if (_type == 'pirate ship'){
                            object.visible = false;
                            pirateShip = object;
                        }
                        if (_type == 'shark'){
                            shark = object;
                        }

                        if (_type == 'help'){
                            help = object;
                        }

                        if(_type === 'tree1'){
                            var trees = [];
                            var tree = pObject.clone();
                            for(var i = 0; i < 10; i++){
                                var newtree = tree.clone();
                                newtree.rotateY(Math.random() * Math.PI);
                                newtree.mass = 0;
                                trees.push(newtree);
                            }
                            trees[1].position.set(18, 103, 98); scene.add(trees[1]);
                            trees[2].position.set(-234, 102, 178); scene.add(trees[2]);
                            trees[3].position.set(234, 145, -177); scene.add(trees[3]);
                            trees[4].position.set(408, 120, 118); scene.add(trees[4]);
                            trees[5].position.set(120, 98, 120); scene.add(trees[5]);
                            trees[6].position.set(240, 108, 138); scene.add(trees[6]);
                            trees[7].position.set(239, 77, 396); scene.add(trees[7]);
                            trees[8].position.set(-70, 70, -300); scene.add(trees[8]);
                            trees[9].position.set(-350, 106, -70); scene.add(trees[9]);
                            //trees[10].position.set(-520, 125, 127); scene.add(trees[10]);
                        }
                    },
                    function ( xhr ) {
                        if (xhr.loaded / xhr.total * 100 % 20 == 0) console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                    },
                    function ( xhr ) {
                        console.error( 'Er ging iets fout.' );
                    }
                );
            });
        };
		
		for (let i = 0 ;i < objectsToLoad.length; i ++){
		    var b = objectsToLoad[i];
		        objectloader(b[0], b[1], b[2], b[3],b[4],b[5],b[6],b[7],b[8],b[9],b[10], b[11],b[12],b[13],b[14],b[15]);
        }
    }
}

