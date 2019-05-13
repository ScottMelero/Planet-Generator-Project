/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Circle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, seg) {
      super(shader);

      this.vertices = this.generateTriangleVertices(x, y, seg);
      this.faces = {0: this.verticies};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x , y, seg) {
    var vertices = []


    for(var i = 0; i <= seg; i++)
    {
        x = x * Math.cos();
        y = y * Math.sin();
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

        x = x + x/10;
        y = y + y/10;

        return vertices;
    }
  }
}
