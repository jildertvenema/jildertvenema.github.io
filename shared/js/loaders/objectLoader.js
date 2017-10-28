class object {
    constructor(objectName){
        this.objectName = objectName;
    }

    loadObject(){

        // variables

        var objPath, mtlPath;
        objPath = "shared/models/obj/";
        mtlPath = "shared/models/mtl/";

        var onProgress, onError, mtlLoader, objLoader;

        mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath( mtlPath );
        mtlLoader.setTexturePath( mtlPath );

        objLoader = new THREE.OBJLoader();
        objLoader.setPath( objPath );

        //loader manager

        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {

            console.log( item, loaded, total );

        };

        //loader onProgress

        onProgress = function ( object ) {
            if ( object.lengthComputable ) {
                var percentComplete = object.loaded / object.total * 100;
                percentComplete = Math.round(percentComplete, 2);
                loadStatusBar.style.width = percentComplete + '%';

                if(percentComplete >= 40
                    && percentComplete < 60){
                    loadStatusBar.style.background = '#FFC522';
                }
                if(percentComplete >= 60){
                    loadStatusBar.style.background = '#40C612';
                }
                if(percentComplete >= 100) {
                    $('#loadStatus').delay(2000).fadeOut();

                    $('#loadScreen').delay(2300).fadeOut();
                }

            }
        };

        //loader done

        manager.onLoad = function ( ) {

            console.log( 'Loading complete!');

        };

        //loader onError

        onError = function ( object ) {
            console.warn(object);
        };

        // loader

        var object;
        mtlLoader.load( this.objectName + '.mtl', (materials) => {
            materials.preload();
            objLoader.load( this.objectName + '.obj', ( obj ) => {
                objLoader.setMaterials( materials );
                obj.position.y = 10;
                object = obj;
                return object;

            }, onProgress, onError );
        });
    }


}



