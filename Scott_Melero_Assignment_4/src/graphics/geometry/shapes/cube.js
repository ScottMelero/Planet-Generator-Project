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
  constructor(shader,x,y, z, size, image) {
      super(shader, x, y);

      this.image = image

      this.x = y;
      this.y = x;

      this.vertices = this.generateCubeVertices(x, y, z, size);
      this.faces = {0: this.vertices};
      
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(x, y, z, size) {
    var vertices = []

    // Face 1
    var vertex1 = new Vertex(x-Number(size), y-Number(size), z);
    vertex1.texCoord = [0.0, 0.0]
    vertices.push(vertex1);
    var vertex2 = new Vertex(x+Number(size), y+Number(size), z);
    vertex2.texCoord = [1.0, 1.0]
    vertices.push(vertex2);
    var vertex3 = new Vertex(x-Number(size), y+Number(size), z);
    vertex3.texCoord = [0.0, 1.0]
    vertices.push(vertex3);
    var vertex4 = new Vertex(x-Number(size), y-Number(size), z);
    vertex4.texCoord = [0.0, 0.0]
    vertices.push(vertex4);
    var vertex5 = new Vertex(x+Number(size), y-Number(size), z);
    vertex5.texCoord = [1.0, 0.0]
    vertices.push(vertex5);
    var vertex6 = new Vertex(x+Number(size), y+Number(size), z);
    vertex6.texCoord = [1.0, 1.0]
    vertices.push(vertex6);
    
    // Face 2 
    var vertex7  = new Vertex(x-Number(size), y+Number(size), z);
    vertex7.texCoord = [0.0, 0.0]
    vertices.push(vertex7);
    var vertex8  = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex8.texCoord = [1.0, 1.0]
    vertices.push(vertex8);
    var vertex9  = new Vertex(x-Number(size), y+Number(size), z-Number(size)*2);
    vertex9.texCoord = [0.0, 0.0]
    vertices.push(vertex9);
    var vertex10 = new Vertex(x-Number(size), y+Number(size), z);
    vertex10.texCoord = [0.0, 0.0]
    vertices.push(vertex10);
    var vertex11 = new Vertex(x+Number(size), y+Number(size), z);
    vertex11.texCoord = [1.0, 0.0]
    vertices.push(vertex11);
    var vertex12 = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex12.texCoord = [1.0, 1.0]
    vertices.push(vertex12);

    // Face 3
    var vertex13 = new Vertex(x-Number(size), y-Number(size), z-Number(size)*2);
    vertex13.texCoord = [0.0, 0.0]
    vertices.push(vertex13);
    var vertex14 = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex14.texCoord = [1.0, 1.0]
    vertices.push(vertex14);
    var vertex15 = new Vertex(x-Number(size), y+Number(size), z-Number(size)*2);
    vertex15.texCoord = [0.0, 1.0]
    vertices.push(vertex15);
    var vertex16 = new Vertex(x-Number(size), y-Number(size),z -Number(size)*2);
    vertex16.texCoord = [0.0, 0.0]
    vertices.push(vertex16);
    var vertex17 = new Vertex(x+Number(size), y-Number(size), z-Number(size)*2);
    vertex17.texCoord = [1.0, 0.0]
    vertices.push(vertex17);
    var vertex18 = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex18.texCoord = [1.0, 1.0]
    vertices.push(vertex18);

    // Face 4
    var vertex19 = new Vertex(x-Number(size), y-Number(size), z);
    vertex19.texCoord = [0.0, 0.0]
    vertices.push(vertex19);
    var vertex20 = new Vertex(x+Number(size), y-Number(size), z);
    vertex20.texCoord = [1.0, 1.0]
    vertices.push(vertex20);
    var vertex21 = new Vertex(x-Number(size), y-Number(size), z-Number(size)*2);
    vertex21.texCoord = [0.0, 1.0]
    vertices.push(vertex21);
    var vertex22 = new Vertex(x-Number(size), y-Number(size), z-Number(size)*2);
    vertex22.texCoord = [0.0, 1.0]
    vertices.push(vertex22);
    var vertex23 = new Vertex(x+Number(size), y-Number(size), z);
    vertex23.texCoord = [1.0, 1.0]
    vertices.push(vertex23);
    var vertex24 = new Vertex(x+Number(size), y-Number(size), z-Number(size)*2);
    vertex24.texCoord = [1.0, 1.0]
    vertices.push(vertex24);

    // Face 5
    var vertex25 = new Vertex(x-Number(size), y-Number(size), z);
    vertex25.texCoord = [0.0, 0.0]
    vertices.push(vertex25);
    var vertex26 = new Vertex(x-Number(size), y+Number(size), z);
    vertex26.texCoord = [0.0, 1.0]
    vertices.push(vertex26);
    var vertex27 = new Vertex(x-Number(size), y+Number(size), z-Number(size)*2);
    vertex27.texCoord = [1.0, 1.0]
    vertices.push(vertex27);
    var vertex28 = new Vertex(x-Number(size), y-Number(size), z);
    vertex28.texCoord = [0.0, 0.0]
    vertices.push(vertex28);
    var vertex29 = new Vertex(x-Number(size), y-Number(size), z-Number(size)*2);
    vertex29.texCoord = [1.0, 0.0]
    vertices.push(vertex29);
    var vertex30 = new Vertex(x-Number(size), y+Number(size), z-Number(size)*2);
    vertex30.texCoord = [1.0, 1.0]
    vertices.push(vertex30);

    // Face 6
    var vertex31 = new Vertex(x+Number(size), y-Number(size), z);
    vertex31.texCoord = [0.0,0.0]
    vertices.push(vertex31);
    var vertex32 = new Vertex(x+Number(size), y+Number(size), z);
    vertex32.texCoord = [0.0, 1.0] 
    vertices.push(vertex32);
    var vertex33 = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex33.texCoord = [1.0, 1.0]
    vertices.push(vertex33);
    var vertex34 = new Vertex(x+Number(size), y-Number(size), z);
    vertex34.texCoord = [0.0,0.0]
    vertices.push(vertex34);
    var vertex35 = new Vertex(x+Number(size), y-Number(size), z-Number(size)*2);
    vertex35.texCoord = [1.0, 0.0]
    vertices.push(vertex35);
    var vertex36 = new Vertex(x+Number(size), y+Number(size), z-Number(size)*2);
    vertex36.texCoord = [1.0, 1.0]
    vertices.push(vertex36);
    
    return vertices;
  }
}