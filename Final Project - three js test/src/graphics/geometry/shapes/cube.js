/**
 * Specifies a Cube. A subclass of geometry.
 */
class Cube extends Geometry {
    /**
     * Constructor for Circle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param size Size of the cube
     * @returns {Cube} Circle created
     */
    constructor(shader, g_points, height, size, image) {
        super(shader);
        this.image = image

        this.vertices = this.generateCubeVertices(g_points, height, size);
        this.faces = {0: this.vertices};
  
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateCubeVertices(g_points, height, size){
        var vertices = []

        //front face of cube with full texture
        var vertex1 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]);
        vertex1.texCoord = [0.0, 0.0]
        var vertex2 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex2.texCoord = [1.0, height]
        var vertex3 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex3.texCoord = [0.0, height]
        var vertex4 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]);
        vertex4.texCoord = [0.0, 0.0]
        var vertex5 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]);
        vertex5.texCoord = [1.0, 0.0]
        var vertex6 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex6.texCoord = [1.0, height]
        

        //adding front face of cube vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);

        //top face of cube with the bottom half of the texture 
        var vertex7  = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex7.texCoord = [0.0, 0.0]
        var vertex8  = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex8.texCoord = [1.0, 1.0]
        var vertex9  = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex9.texCoord = [0.0, 1.0]
        var vertex10 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex10.texCoord = [0.0, 0.0]
        var vertex11 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex11.texCoord = [1.0, 0.0]
        var vertex12 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex12.texCoord = [1.0, 1.0]

        //adding top face of cube vertices
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
        vertices.push(vertex10);
        vertices.push(vertex11);
        vertices.push(vertex12);

        //back face of cube with the two images 
        var vertex13 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        vertex13.texCoord = [0.0, 0.0]
        var vertex14 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex14.texCoord = [1.0, height]
        var vertex15 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex15.texCoord = [0.0, height]
        var vertex16 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size),g_points[2] -Number(size)*2);
        vertex16.texCoord = [0.0, 0.0]
        var vertex17 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        vertex17.texCoord = [1.0, 0.0]
        var vertex18 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex18.texCoord = [1.0, height]

        //adding back face of cube vertices
        vertices.push(vertex13);
        vertices.push(vertex14);
        vertices.push(vertex15);
        vertices.push(vertex16);
        vertices.push(vertex17);
        vertices.push(vertex18);

        // // //bottom face of vertices with half the image on the cube
        // // var vertex19 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]);
        // // vertex19.texCoord = [0.0, 1.0]
        // // var vertex20 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]);
        // // vertex20.texCoord = [1.0, 1.0]
        // // var vertex21 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        // // vertex21.texCoord = [0.0, 0.0]
        // // var vertex22 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        // // vertex22.texCoord = [0.0, 0.0]
        // // var vertex23 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]);
        // // vertex23.texCoord = [1.0, 1.0]
        // // var vertex24 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        // // vertex24.texCoord = [1.0, 0.0]

        // // //bottom face of cube vertices being added
        // // vertices.push(vertex19);
        // // vertices.push(vertex20);
        // // vertices.push(vertex21);
        // // vertices.push(vertex22);
        // // vertices.push(vertex23);
        // // vertices.push(vertex24);

        //left facing cube has the image three times in a 3x3 table
        var vertex25 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]);
        vertex25.texCoord = [0.0, 0.0]
        var vertex26 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex26.texCoord = [0.0, height]
        var vertex27 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex27.texCoord = [1.0, height]
        var vertex28 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]);
        vertex28.texCoord = [0.0, 0.0]
        var vertex29 = new Vertex(g_points[0]-Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        vertex29.texCoord = [1.0, 0.0]
        var vertex30 = new Vertex(g_points[0]-Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex30.texCoord = [1.0, height]

        //adding left face of cube vertices 
        vertices.push(vertex25);
        vertices.push(vertex26);
        vertices.push(vertex27);
        vertices.push(vertex28);
        vertices.push(vertex29);
        vertices.push(vertex30);

        //Right face has 4 faces on it a 2x2 table
        var vertex31 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]);
        vertex31.texCoord = [0.0,0.0]
        var vertex32 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]);
        vertex32.texCoord = [0.0, height] 
        var vertex33 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex33.texCoord = [1.0, height]
        var vertex34 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]);
        vertex34.texCoord = [0.0,0.0]
        var vertex35 = new Vertex(g_points[0]+Number(size), g_points[1]-Number(size), g_points[2]-Number(size)*2);
        vertex35.texCoord = [1.0, 0.0]
        var vertex36 = new Vertex(g_points[0]+Number(size), (g_points[1]+Number(size))*-height, g_points[2]-Number(size)*2);
        vertex36.texCoord = [1.0, height]

        //adding right face of vertices
        vertices.push(vertex31);
        vertices.push(vertex32);
        vertices.push(vertex33);
        vertices.push(vertex34);
        vertices.push(vertex35);
        vertices.push(vertex36);

        return vertices;
    }
}