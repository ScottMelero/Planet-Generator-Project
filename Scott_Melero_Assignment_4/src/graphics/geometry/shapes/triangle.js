/**
 * Specifies a triangle. A subclass of geometry.
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
      super(shader, x, y);

      this.vertices = this.generateTriangleVertices(x, y);
      this.faces = {0: [0, 1, 2]};
      this.rot = 0;

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

    scaleUp() 
        {
            // Translate origin to triangle's center
            this.translationMatrix.setTranslate(this.x, this.y, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

            // Scale triangle up at triangle's center
            this.scalingMatrix.setScale(1.025, 1.025, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

            // Translate triangle back
            this.translationMatrix.setTranslate(-this.x, -this.y, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix); 
        }
        
    scaleDown() 
        {
            // Translate origin to triangle's center
            this.translationMatrix.setTranslate(this.x, this.y, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

            // Scale triangle down at triangle's center
            this.scalingMatrix.setScale(0.975, 0.975, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.scalingMatrix);

            // Translate triangle back
            this.translationMatrix.setTranslate(-this.x, -this.y, 0);
            this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  
        }

    render() {
        // Create the translation and scaling matrix
        this.translationMatrix = new Matrix4();
        this.scalingMatrix = new Matrix4();

        this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    }
}
