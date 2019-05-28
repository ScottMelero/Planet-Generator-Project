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
      
      this.canvas.onmousemove = function(ev) { _inputHandler.mouseMove(ev) };
      this.canvas.addEventListener('wheel', function(ev) { _inputHandler.mouseZoom(ev)}, false)

      // Keyboard Events
      document.addEventListener('keydown', function(ev) { _inputHandler.keyDown(ev); }, false);
    }

    mouseMove(ev) {
        var movementX = ev.movementX;
        var movementY = ev.movementY;
        
        if(movementY > 0){
            this.camera.tilt(-1)
        }else if(movementY < 0){
            this.camera.tilt(1)
        }

        if(movementX > 0 ){
            this.camera.pan(1)
        }else if(movementX < 0){
            this.camera.pan(-1)
        }
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

        if(keyName == "a" || keyName == "ArrowLeft") {
            this.camera.truck(-1);
        }else if(keyName == "d" || keyName == "ArrowRight") {
            this.camera.truck(1);
        }else if(keyName == "w" || keyName == "ArrowUp"){
            this.camera.dolly(-1)
        }else if(keyName == "s" || keyName == "ArrowDown"){
            this.camera.dolly(1)
        }else if(keyName =='z'){
            this.camera.setDistance();
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
}