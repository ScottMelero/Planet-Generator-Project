var transX = (Math.random()*0.008)-0.004;
var transY = (Math.random()*0.008)-0.004;

/**
 * Specifies a Circle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Circle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateCircleVertices(x, y);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  // a circle consists of triangles 
  generateCircleVertices(x, y) {
      var vertices = []
      
      var seg = document.getElementById("Segment").value;

      var size = document.getElementById("Size").value/200;
      var p = 6*Math.PI;

      var delta = (2*Math.PI) / seg;
      var center = new Vertex(x, y, 0.0);

      // Draw circle 
      for(var theta = 0; theta < p; theta += delta) {
         var x2 = (Math.cos(theta) * size) + x;
         var y2 = (Math.sin(theta) * size) + y;

         var x3 = (Math.cos(theta + delta) * size) + x;
         var y3 = (Math.sin(theta + delta) * size) + y;

         vertices.push(center);
         vertices.push(new Vertex(x2, y2, 0.0));
         vertices.push(new Vertex(x3, y3, 0.0));
     
      }
       return vertices;
  }

  render() {
      // Create translation matrix
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(transX,transY,0);

      // reset timer and x and y translate variables
      if(timer >= 30) {
          timer = 0;

          transX = (Math.random()*0.008)-0.004;
          transY = (Math.random()*0.008)-0.004;
      }
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}