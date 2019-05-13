/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y) {
      super(shader);

      this.vertices = this.generateTriangleVertices(x, y);
      this.faces = {0: this.verticies};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x, y) 
    {
        var vertices = []

        var size = document.getElementById("Size").value/200;  

        // Vertex 0
        var vertex0 = new Vertex(x, y+size, 0.0);
        vertices.push(vertex0);

        // Vertex1
        var vertex1 = new Vertex( x-size, y-size, 0.0);
        vertices.push(vertex1);

        // Vertex 2
        var vertex2 = new Vertex( x+size, y-size, 0.0);
        vertices.push(vertex2);

        return vertices;
    }
}
