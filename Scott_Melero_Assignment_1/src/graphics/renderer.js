var _renderer = null;

/**
 * Specifies a WebGL render. Used alongside Spring 2019 CMPS 160's Scene,
 * Camera, Geometry, and other subclasses.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Renderer {
   /**
    * Constructor for Renderer.
    *
    * @constructor
    * @returns {Renderer} Renderer object created
    */
    constructor(gl, scene, camera) {
        this.gl = gl;
        this.scene = scene;
        this.camera = camera;

        this.initGLSLBuffers();

        // Setting canvas' clear color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Use the z-buffer when drawing
        this.gl.enable(gl.DEPTH_TEST);

        _renderer = this;
    }

    /**
     * Starts an animation loop
     */
    start() {
        _renderer.render();
        requestAnimationFrame(_renderer.start);
    }

    /**
     * Renders all the geometry within the scene.
     */
    render() {
        // Clear the geometry onscreen
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        for (var i = 0; i < this.scene.geometries.length; i++) {
            // Switch to shader attached to geometry
            this.gl.useProgram(this.scene.geometries[i].shader.program)
            this.gl.program = this.scene.geometries[i].shader.program

            // Callback function in the case user wants to change the
            // geometry before the draw call
            this.scene.geometries[i].render();

            // Draw geometry
            var geometry = this.scene.geometries[i];
            this.sendVertexDataToGLSL(geometry.data, geometry.dataCounts, geometry.shader);
            this.sendIndicesToGLSL(geometry.indices);
            this.drawBuffer(geometry.indices.length)
        }
    }

    /**
     * Initializes a single index and single attribute buffer for future use
     */
    initGLSLBuffers() {
        var attributeBuffer = this.gl.createBuffer();
        var indexBuffer = this.gl.createBuffer();

        if (!attributeBuffer || !indexBuffer) {
            console.log("Failed to create buffers!");
            return;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributeBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    /**
     * Sends an array of interleaved vertex information the shader.
     *
     * @private
     * @param {Float32Array} data Data being sent to attribute variable
     * @param {Number} dataCount The amount of data to pass per vertex
     * @param {String} attribName The name of the attribute variable
     */
    sendVertexDataToGLSL(data, dataCounts, shader) {
      var FSIZE = data.BYTES_PER_ELEMENT;

      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

      var dataEnd = 0;
      for (var i = 0; i < dataCounts.length; i++) {
        dataEnd += dataCounts[i];
      }
      dataEnd *= FSIZE;

      var i = 0;
      var currentDataStart = 0;

      // Send attributes
      for (var i = 0; i < shader.attributeLocations.length; i++) {
          var attribute = shader.attributeLocations[i]["location"];

          this.gl.vertexAttribPointer(attribute, dataCounts[i], this.gl.FLOAT, false, dataEnd, currentDataStart);
          this.gl.enableVertexAttribArray(attribute);

          currentDataStart += FSIZE * dataCounts[i];
       }

       // Send uniforms
       for (var i = 0; i < shader.uniformLocations.length; i++) {
           this.sendUniformToGLSL(shader.uniformLocations[i]);
        }
    }

    /**
     * Passes a uniform's value to it's saved location
     * @private
     * @param uniform An associative array with the location and value of a uniform
     */
    sendUniformToGLSL(uniform) {
        switch (uniform["type"]) {
            case "float":
              this.gl.uniform1f(uniform["location"], uniform["value"]);
              break;
            case "vec2":
              this.gl.uniform2fv(uniform["location"], uniform["value"]);
              break;
            case "vec3":
              this.gl.uniform3fv(uniform["location"], uniform["value"]);
              break;
            case "vec4":
              this.gl.uniform4fv(uniform["location"], uniform["value"]);
              break;
            case "mat2":
              this.gl.uniformMatrix2fv(uniform["location"], false, uniform["value"]);
              break;
            case "mat3":
              this.gl.uniformMatrix3fv(uniform["location"], false, uniform["value"]);
              break;
            case "mat4":
              this.gl.uniformMatrix4fv(uniform["location"], false, uniform["value"]);
              break;
        }
    }

    /**
     * Passes the indices of a geometry to the index buffer
     *
     * @private
     * @param {Uint16Array} indices An array of indices
     */
    sendIndicesToGLSL(indices) {
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW);
    }

    /**
     * Draws the current buffer loaded. The buffer was loaded by sendVerticesToGLSL.
     *
     * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
     */
    drawBuffer(indicesLength) {
        this.gl.drawElements(this.gl.TRIANGLES, indicesLength, this.gl.UNSIGNED_SHORT, 0);
    }
}
