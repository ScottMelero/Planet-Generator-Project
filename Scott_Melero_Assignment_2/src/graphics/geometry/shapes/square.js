/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Square extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y) {
      super(shader);

      this.vertices = this.generateSquareVertices(x, y);
      this.faces = {0: this.verticies};

      // Translate origin to center of the object and update matrix
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x, y, 0);

      // Rotate the matrix around object's center
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(-0.5, 0, 0, 1);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x, y) {
      var vertices = []

      var size = document.getElementById("Size").value/200;  

      // Vertex 0
      var vertex0 = new Vertex(x, y + size, 0.0);
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex(x, y, 0.0);
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex(x + size, y, 0.0);
      vertices.push(vertex2);

      // Vertex3 for shared points
      var vertex3 = new Vertex(x, y + size, 0.0);
      vertices.push(vertex3);

      // Vertex4 for shared points
      var vertex4 = new Vertex(x + size, y, 0.0);
      vertices.push(vertex4);

      // Vertex5 for other half of the square 
      var vertex5 = new Vertex(x + size, y + size, 0.0);
      vertices.push(vertex5);

      return vertices;
   }

   render() {
     this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
     // this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
     // this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

     this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}
