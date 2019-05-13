var _inputHandler = null;
var down = false;
var shp; 

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 * 
 * built off of the base code given by the TA's
 * 
 */

class InputHandler 
  {
      //Initializes the event handeling functions within the program.
      constructor(canvas, scene) 
        {
          this.canvas = canvas;
          this.scene = scene;

          _inputHandler = this;

          // Mouse Events
          this.canvas.onmousedown = function(ev){ _inputHandler.click(ev);}
          this.canvas.onmousemove = function(ev) { _inputHandler.move(ev);};
          this.canvas.onmouseup = function(ev) { _inputHandler.mouseUp(ev);};

          //clear canvas 
          document.getElementById("Clear").onclick = function(){ _inputHandler.begonethot();}

          //shape buttons 
          document.getElementById("square").onclick = function(){ _inputHandler.setSquare();}
          document.getElementById("triangle").onclick = function(){ _inputHandler.setTriangle();}
          document.getElementById("circle").onclick = function(){ _inputHandler.setCircle();}
          document.getElementById("cube").onclick = function(){ _inputHandler.setCube();}

           // Button Events
          document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };

        }

        /**
         * Function called to read a selected file.
         */
        readSelectedFile() 
          {
            var fileReader = new FileReader();
            var objFile = document.getElementById("fileInput").files[0];

            if (!objFile) {
                alert("OBJ file not set!");
                return;
            }

            fileReader.readAsText(objFile);
            fileReader.onloadend = function() {
                var customObj = new CustomOBJ(shader, fileReader.result);
                console.log(customObj);
                _inputHandler.scene.addGeometry(customObj);
            }
        }

      /**
       * Function called upon mouse click.
       */
      click(ev) 
        {
            down = true;

            // Print x,y coordinates.
            console.log(ev.clientX, ev.clientY);
            
            var x = ev.clientX; // x coordinate of a mouse pointer
            var y = ev.clientY; // y coordinate of a mouse pointer

            // convert to gl coordinates 
            var rect = ev.target.getBoundingClientRect() ;
            x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
            y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

            if (shp == 1){
              var shape = new Square(shader, x, y);
              this.scene.addGeometry(shape);
            }
            else if(shp == 2){
              var shape = new Triangle(shader, x, y);
              this.scene.addGeometry(shape);
            }
            else if(shp == 3){
              var shape = new Circle(shader, x, y);
              this.scene.addGeometry(shape); 
            }
            else if(shp == 4){
              var shape = new Cube(shader, x, y);
              this.scene.addGeometry(shape); 
            }
            else {
              console.log("no shape selected") 
            }
        }

      mouseUp(ev)
        {
            down = false;
        }

      move(ev)
        {
          if (down == true)
            {
              // Print x,y coordinates.
              console.log(ev.clientX, ev.clientY);

              var x = ev.clientX; // x coordinate of a mouse pointer
              var y = ev.clientY; // y coordinate of a mouse pointer

              // convert to gl coordinates 
              var rect = ev.target.getBoundingClientRect() ;
              x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
              y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

              if (shp == 1){
                var shape = new Square(shader, x, y);
                this.scene.addGeometry(shape);
              }
              else if(shp == 2){
                var shape = new Triangle(shader, x, y);
                this.scene.addGeometry(shape);
              }
              else if(shp == 3){
                var shape = new Circle(shader, x, y);
                this.scene.addGeometry(shape); 
              }
              else if(shp == 4){
                var shape = new Cube(shader, x, y);
                this.scene.addGeometry(shape); 
              }
          }
        }

        //clears canvas 
        begonethot()
          {this.scene.clearGeometries();}

        // set sqr
        setSquare()
          {
            shp = 1;
            return shp;
          }

        // set tri
        setTriangle()
          {
            shp = 2;
            return shp;
          }

        // set crc 
        setCircle()
          {
            shp = 3;
            return shp;
          }

        // set cube
        setCube()
          {
            shp = 4;
            return shp;
          }
  }
