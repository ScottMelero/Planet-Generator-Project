var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera) {
      this.canvas = canvas;
      this.scene  = scene;
      this.camera = camera;

      _inputHandler = this;

      // Mouse Events
      this.canvas.onmousemove = function(ev) { _inputHandler.mouseMove(ev) };
      this.canvas.addEventListener ('wheel', function(ev){ _inputHandler.mouseZoom(ev)}, false )

      // Keyboard Events
      document.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); });
    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            alert(fileReader.result);
        }
    }

    readTexture(src, onTexLoad) {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    }
    
    mouseMove(ev) {
        var movementX = ev.movementX;
        var movementY = ev.movementY;

        this.camera.tilt(-movementY/12);
        this.camera.pan(movementX/12);
    } 

    mouseZoom(ev){ 
        var moveY = ev.deltaY;
        if(moveY > 0){
            this.camera.setZoom(1)
        }else if(moveY < 0){
            this.camera.setZoom(-1)
        }
    }

    keyDown(ev) {
        var keyName = event.key

        if(keyName == "a" || keyName == "Left") {
            this.camera.truck(-1);
        }else if(keyName == "d" || keyName == "Right") {
            this.camera.truck(1);
        }else if(keyName == "w" || keyName == "Up"){
            this.camera.dolly(-1)
        }else if(keyName == "s" || keyName == "Down"){
            this.camera.dolly(1)
        }
    }

}
