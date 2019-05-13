/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex 
  {
    constructor(x, y, z) 
      {
          this.point  = new Vector3([x, y, z]);

          // get rgb valeus from sliders
          var r = document.getElementById("Red").value/255;
          var g = document.getElementById("Green").value/255;
          var b = document.getElementById("Blue").value/255;

          this.color  = [r, g, b, 1.0];

          // This class can be extended to support other attributes such as
          // normals and UV coordinates.
      }
  }
