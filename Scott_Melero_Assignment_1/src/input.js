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
          }
        }

        //clears canvas 
        begonethot()
          {
            this.scene.clearGeometries();
          }

        //clears canvas 
        setSquare()
          {
            shp = 1;
            return shp;
          }
        //clears canvas 
        setTriangle()
          {
            shp = 2;
            return shp;
          }
        //clears canvas 
        setCircle()
          {
            shp = 3;
            return shp;
          }
  }
