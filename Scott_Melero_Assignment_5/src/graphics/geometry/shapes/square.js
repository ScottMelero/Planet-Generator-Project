/**
 * Specifies a square. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, image) {
      super(shader);

      this.image = image

      this.vertices = this.generateSquareVertices()
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices() {
      var vertices = []

      var vertex1 = new Vertex(-16, -1, -16)
      vertex1.texCoord = [0.0, 0.0]
      vertices.push(vertex1);

      var vertex2 = new Vertex(16, -1, -16)
      vertex2.texCoord = [1.0, 0.0]
      vertices.push(vertex2);

      var vertex3 = new Vertex(16, -1, 16)
      vertex3.texCoord = [1.0, 1.0]
      vertices.push(vertex3);

      var vertex4 = new Vertex(-16, -1, -16)
      vertex4.texCoord = [0.0, 0.0]
      vertices.push(vertex4)

      var vertex5 = new Vertex(-16, -1, 16)
      vertex5.texCoord = [0.0, 1.0]
      vertices.push(vertex5)

      var vertex6 = new Vertex(16, -1, 16)
      vertex6.texCoord = [1.0, 1.0] 
      vertices.push(vertex6)

      return vertices;
  }
}
