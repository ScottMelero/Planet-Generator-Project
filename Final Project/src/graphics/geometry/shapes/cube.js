class Cube extends Geometry {
    /**
     * Constructor for Circle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param size Size of the Sky
     * @returns {Sky} Circle created
     */
    constructor(shader, image, size, x, y, z) {
        super(shader);

        this.image = image
    
        this.vertices = this.generateSkyVertices(size, x, y, z);
        this.faces = {0: this.vertices};
  
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateSkyVertices(size, x, y, z){
        var vertices = []

        //front face of Sky with full texture
        var vertex1 = new Vertex(-size+x, -size+y, size+z);
        vertex1.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex2 = new Vertex(size+x, size+y, size+z);
        vertex2.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex3 = new Vertex(-size+x, size+y, size+z);
        vertex3.texCoord = [Math.floor(0.0), Math.floor(1.0)]
        var vertex4 = new Vertex(-size+x, -size+y, size+z);
        vertex4.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertexsize = new Vertex(size+x, -size+y, size+z);
        vertexsize.texCoord = [Math.floor(1.0), Math.floor(0.0)]
        var vertex6 = new Vertex(size+x, size+y, size+z);
        vertex6.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        

        //adding front face of Sky vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertexsize);
        vertices.push(vertex6);

        //top face of Sky with the bottom half of the texture 
        var vertex7  = new Vertex(-size+x, size+y, size+z);
        vertex7.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex8  = new Vertex(size+x, size+y, -size+z);
        vertex8.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex9  = new Vertex(-size+x, size+y, -size+z);
        vertex9.texCoord = [Math.floor(0.0), Math.floor(1.0)]
        var vertex10 = new Vertex(-size+x, size+y, size+z);
        vertex10.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex11 = new Vertex(size+x, size+y, size+z);
        vertex11.texCoord = [Math.floor(1.0), Math.floor(0.0)]
        var vertex12 = new Vertex(size+x, size+y,-size+z);
        vertex12.texCoord = [Math.floor(1.0), Math.floor(1.0)]

        //adding top face of Sky vertices
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
        vertices.push(vertex10);
        vertices.push(vertex11);
        vertices.push(vertex12);

        //back face of Sky with the two images 
        var vertex13 = new Vertex(-size+x, -size+y,-size+z);
        vertex13.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex14 = new Vertex(size+x, size+y, -size+z);
        vertex14.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex1size = new Vertex(-size+x, size+y,-size+z);
        vertex1size.texCoord = [Math.floor(0.0), Math.floor(1.0)]
        var vertex16 = new Vertex(-size+x, -size+y,-size+z);
        vertex16.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex17 = new Vertex(size+x, -size+y,-size+z);
        vertex17.texCoord = [Math.floor(1.0), Math.floor(0.0)]
        var vertex18 = new Vertex(size+x, size+y,-size+z);
        vertex18.texCoord = [Math.floor(1.0), Math.floor(1.0)]

        //adding back face of Sky vertices
        vertices.push(vertex13);
        vertices.push(vertex14);
        vertices.push(vertex1size);
        vertices.push(vertex16);
        vertices.push(vertex17);
        vertices.push(vertex18);

        // bottom face of vertices with half the image on the Sky
        var vertex19 = new Vertex(-size+x,-size+y, size+z);
        vertex19.texCoord = [Math.floor(0.0), Math.floor(1.0)]
        var vertex20 = new Vertex(size+x, -size+y, size+z);
        vertex20.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex21 = new Vertex(-size+x, -size+y, -size+z);
        vertex21.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex22 = new Vertex(-size+x, -size+y, -size+z);
        vertex22.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex23 = new Vertex(size+x, -size+y, size+z);
        vertex23.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex24 = new Vertex(size+x, -size+y, -size+z);
        vertex24.texCoord = [Math.floor(1.0), Math.floor(0.0)]

        //bottom face of Sky vertices being added
        vertices.push(vertex19);
        vertices.push(vertex20);
        vertices.push(vertex21);
        vertices.push(vertex22);
        vertices.push(vertex23);
        vertices.push(vertex24);

        //left facing Sky has the image three times in a 3x3 table
        var vertexsize = new Vertex(-size+x, -size+y, size+z);
        vertexsize.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex26 = new Vertex(-size+x, size+y, size+z);
        vertex26.texCoord = [Math.floor(0.0), Math.floor(1.0)]
        var vertex27 = new Vertex(-size+x, size+y, -size+z);
        vertex27.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex28 = new Vertex(-size+x, -size+y, size+z);
        vertex28.texCoord = [Math.floor(0.0), Math.floor(0.0)]
        var vertex29 = new Vertex(-size+x, -size+y, -size+z);
        vertex29.texCoord = [Math.floor(1.0), Math.floor(0.0)]
        var vertex30 = new Vertex(-size+x, size+y, -size+z);
        vertex30.texCoord = [Math.floor(1.0), Math.floor(1.0)]

        //adding left face of Sky vertices 
        vertices.push(vertexsize);
        vertices.push(vertex26);
        vertices.push(vertex27);
        vertices.push(vertex28);
        vertices.push(vertex29);
        vertices.push(vertex30);

        //Right face has 4 faces on it a 2x2 table
        var vertex31 = new Vertex(size+x, -size+y, size+z);
        vertex31.texCoord = [Math.floor(0.0),Math.floor(0.0)]
        var vertex32 = new Vertex(size+x, size+y, size+z);
        vertex32.texCoord = [Math.floor(0.0), Math.floor(1.0)] 
        var vertex33 = new Vertex(size+x, size+y, -size+z);
        vertex33.texCoord = [Math.floor(1.0), Math.floor(1.0)]
        var vertex34 = new Vertex(size+x, -size+y, size+z);
        vertex34.texCoord = [Math.floor(0.0),Math.floor(0.0)]
        var vertex3size = new Vertex(size+x, -size+y, -size+z);
        vertex3size.texCoord = [Math.floor(1.0), Math.floor(0.0)]
        var vertex36 = new Vertex(size+x, size+y, -size+z);
        vertex36.texCoord = [Math.floor(1.0), Math.floor(1.0)]

        //adding right face of vertices
        vertices.push(vertex31);
        vertices.push(vertex32);
        vertices.push(vertex33);
        vertices.push(vertex34);
        vertices.push(vertex3size);
        vertices.push(vertex36);

        return vertices;
    }
}