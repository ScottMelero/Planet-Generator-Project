class Sky extends Geometry {
    /**
     * Constructor for Circle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param size Size of the Sky
     * @returns {Sky} Circle created
     */
    constructor(shader, image) {
        super(shader);

        this.image = image
    
        this.vertices = this.generateSkyVertices();
        this.faces = {0: this.vertices};
  
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateSkyVertices(){
        var vertices = []

        //front face of Sky with full texture
        var vertex1 = new Vertex(-50, -50, 50);
        vertex1.texCoord = [0.0, 0.0]
        var vertex2 = new Vertex(50, 50, 50);
        vertex2.texCoord = [1.0, 1.0]
        var vertex3 = new Vertex(-50, 50, 50);
        vertex3.texCoord = [0.0, 1.0]
        var vertex4 = new Vertex(-50,-50, 50);
        vertex4.texCoord = [0.0, 0.0]
        var vertex5 = new Vertex(50,-50, 50);
        vertex5.texCoord = [1.0, 0.0]
        var vertex6 = new Vertex(50,50, 50);
        vertex6.texCoord = [1.0, 1.0]
        

        //adding front face of Sky vertices
        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);

        //top face of Sky with the bottom half of the texture 
        var vertex7  = new Vertex(-50, 50, 50);
        vertex7.texCoord = [0.0, 0.0]
        var vertex8  = new Vertex(50, 50, -50);
        vertex8.texCoord = [1.0, 1.0]
        var vertex9  = new Vertex(-50, 50, -50);
        vertex9.texCoord = [0.0, 1.0]
        var vertex10 = new Vertex(-50, 50, 50);
        vertex10.texCoord = [0.0, 0.0]
        var vertex11 = new Vertex(50,50, 50);
        vertex11.texCoord = [1.0, 0.0]
        var vertex12 = new Vertex(50,50,-50);
        vertex12.texCoord = [1.0, 1.0]

        //adding top face of Sky vertices
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
        vertices.push(vertex10);
        vertices.push(vertex11);
        vertices.push(vertex12);

        //back face of Sky with the two images 
        var vertex13 = new Vertex(-50,-50,-50);
        vertex13.texCoord = [0.0, 0.0]
        var vertex14 = new Vertex(50,50,-50);
        vertex14.texCoord = [1.0, 1.0]
        var vertex15 = new Vertex(-50,50,-50);
        vertex15.texCoord = [0.0, 1.0]
        var vertex16 = new Vertex(-50,-50,-50);
        vertex16.texCoord = [0.0, 0.0]
        var vertex17 = new Vertex(50,-50,-50);
        vertex17.texCoord = [1.0, 0.0]
        var vertex18 = new Vertex(50,50,-50);
        vertex18.texCoord = [1.0, 1.0]

        //adding back face of Sky vertices
        vertices.push(vertex13);
        vertices.push(vertex14);
        vertices.push(vertex15);
        vertices.push(vertex16);
        vertices.push(vertex17);
        vertices.push(vertex18);

        // bottom face of vertices with half the image on the Sky
        var vertex19 = new Vertex(-50,-50, 50);
        vertex19.texCoord = [0.0, 1.0]
        var vertex20 = new Vertex(50, -50, 50);
        vertex20.texCoord = [1.0, 1.0]
        var vertex21 = new Vertex(-50, -50, -50);
        vertex21.texCoord = [0.0, 0.0]
        var vertex22 = new Vertex(-50, -50, -50);
        vertex22.texCoord = [0.0, 0.0]
        var vertex23 = new Vertex(50, -50, 50);
        vertex23.texCoord = [1.0, 1.0]
        var vertex24 = new Vertex(50, -50, -50);
        vertex24.texCoord = [1.0, 0.0]

        //bottom face of Sky vertices being added
        vertices.push(vertex19);
        vertices.push(vertex20);
        vertices.push(vertex21);
        vertices.push(vertex22);
        vertices.push(vertex23);
        vertices.push(vertex24);

        //left facing Sky has the image three times in a 3x3 table
        var vertex50 = new Vertex(-50, -50, 50);
        vertex50.texCoord = [0.0, 0.0]
        var vertex26 = new Vertex(-50, 50, 50);
        vertex26.texCoord = [0.0, 1.0]
        var vertex27 = new Vertex(-50, 50, -50);
        vertex27.texCoord = [1.0, 1.0]
        var vertex28 = new Vertex(-50, -50, 50);
        vertex28.texCoord = [0.0, 0.0]
        var vertex29 = new Vertex(-50, -50, -50);
        vertex29.texCoord = [1.0, 0.0]
        var vertex30 = new Vertex(-50, 50, -50);
        vertex30.texCoord = [1.0, 1.0]

        //adding left face of Sky vertices 
        vertices.push(vertex50);
        vertices.push(vertex26);
        vertices.push(vertex27);
        vertices.push(vertex28);
        vertices.push(vertex29);
        vertices.push(vertex30);

        //Right face has 4 faces on it a 2x2 table
        var vertex31 = new Vertex(50, -50, 50);
        vertex31.texCoord = [0.0,0.0]
        var vertex32 = new Vertex(50, 50, 50);
        vertex32.texCoord = [0.0, 1.0] 
        var vertex33 = new Vertex(50, 50, -50);
        vertex33.texCoord = [1.0, 1.0]
        var vertex34 = new Vertex(50, -50, 50);
        vertex34.texCoord = [0.0,0.0]
        var vertex35 = new Vertex(50, -50, -50);
        vertex35.texCoord = [1.0, 0.0]
        var vertex36 = new Vertex(50, 50, -50);
        vertex36.texCoord = [1.0, 1.0]

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