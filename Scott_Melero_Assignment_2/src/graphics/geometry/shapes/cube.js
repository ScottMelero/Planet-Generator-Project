/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader,x,y) {
      super(shader,x,y);

      this.vertices = this.generateCubeVertices(x, y);
      this.faces = {0: this.vertices};

      // Set initial position to tilt cube
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(15, 1, 0, 0);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(x, y) {
      var vertices = []

      var size = document.getElementById("Size").value/200; 

      // front face
      var vertex1 = new Vertex( x+size, y+size, size); 
      vertices.push(vertex1);
      var vertex2 = new Vertex( x-size, y+size, size);
      vertices.push(vertex2); 
      var vertex3 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex3);
      var vertex4 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex4);
      var vertex5 = new Vertex( x+size, y-size, size); 
      vertices.push(vertex5);
      var vertex6 = new Vertex( x+size, y+size, size); 
      vertices.push(vertex6);

      // right face
      vertex1 = new Vertex( x+size, y+size, -size);
      vertices.push(vertex1);
      vertex2 = new Vertex( x+size, y+size, size);
      vertices.push(vertex2);
      vertex3 = new Vertex( x+size, y-size, size); 
      vertices.push(vertex3);
      vertex4 = new Vertex( x+size, y-size, size);
      vertices.push(vertex4);
      vertex5 = new Vertex( x+size, y-size, -size);
      vertices.push(vertex5);
      vertex6 = new Vertex( x+size, y+size, -size);
      vertices.push(vertex6);

      // back face
      vertex1 = new Vertex( x+size, y+size, -size);
      vertices.push(vertex1);
      vertex2 = new Vertex( x-size, y+size, -size); 
      vertices.push(vertex2);
      vertex3 = new Vertex( x-size, y-size, -size);
      vertices.push(vertex3);
      vertex4 = new Vertex( x-size, y-size, -size); 
      vertices.push(vertex4);
      vertex5 = new Vertex( x+size, y-size, -size);
      vertices.push(vertex5);
      vertex6 = new Vertex( x+size, y+size, -size); 
      vertices.push(vertex6);

      // left face
      vertex1 = new Vertex( x-size, y+size, -size);
      vertices.push(vertex1);
      vertex2 = new Vertex( x-size, y+size, size); 
      vertices.push(vertex2);
      vertex3 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex3);
      vertex4 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex4);
      vertex5 = new Vertex( x-size, y-size, -size); 
      vertices.push(vertex5);
      vertex6 = new Vertex( x-size, y+size, -size);
      vertices.push(vertex6);

      // top face
      vertex1 = new Vertex( x+size, y+size, -size); 
      vertices.push(vertex1);
      vertex2 = new Vertex( x-size, y+size, -size); 
      vertices.push(vertex2);
      vertex3 = new Vertex( x-size, y+size, size);
      vertices.push(vertex3);
      vertex4 = new Vertex( x-size, y+size, size); 
      vertices.push(vertex4);
      vertex5 = new Vertex( x+size, y+size, size); 
      vertices.push(vertex5);
      vertex6 = new Vertex( x+size, y+size, -size); 
      vertices.push(vertex6);

      // bottom face
      vertex1 = new Vertex( x+size, y-size, -size); 
      vertices.push(vertex1);
      vertex2 = new Vertex( x-size, y-size , -size); 
      vertices.push(vertex2);
      vertex3 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex3);
      vertex4 = new Vertex( x-size, y-size, size); 
      vertices.push(vertex4);
      vertex5 = new Vertex( x+size, y-size, size); 
      vertices.push(vertex5);
      vertex6 = new Vertex( x+size, y-size, -size); 
      vertices.push(vertex6);

      return vertices;
  }

  render() {
      
       // Translate origin to center of the object and update matrix
       this.translationMatrix = new Matrix4();
       this.translationMatrix.setTranslate(this.x, this.y, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);

       // Rotate the object
       this.rotationMatrix = new Matrix4();
       this.rotationMatrix.setRotate(0.5, 1, 1, 0);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);

       // Translate object back for proper rotation
       this.translationMatrix.setTranslate(-this.x, -this.y, 0);
       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);  

       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
}