/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
      this.point  = new Vector3([x, y, z]);
      this.color  = [1.0, 1.0, 0.0, 1.0];
      this.texCoord  = [0.0, 0.0];
      this.normal = new Vector3([0.0, 0.0, 0.0]);

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}



// /**
//  * Specifies a vertex. Currently only contains the vertex's position.
//  *
//  * @author Lucas N. Ferreira
//  * @this {Vertex}
//  */
// class Vertex {
//   constructor(x, y, z) {
//       this.point  = new Vector3([x, y, z, r, g, b]);

//       // get rgb valeus from sliders
//       var r = r/255;
//       var g = g/255;
//       var b = b/255;

//       this.color  = [r, g, b, 1.0];


//       // this.color  = [0.0, 1.0, 0.0, 1.0];
//       this.texCoord  = null;
//       this.normal = new Vector3([0.0, 0.0, 0.0]);

//       // This class can be extended to support other attributes such as
//       // normals and UV coordinates.
//   }
// }