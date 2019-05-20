/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
      this.point  = new Vector3([x, y, z]);
      
      var name = document.getElementById('changeColors').value
      if(name === "Solid Color"){
        var redCol = (document.getElementById("Red").value); 
        var red = redCol/255;

        var greenCol = (document.getElementById("Green").value); 
        var green = greenCol/255;

        var blueCol = (document.getElementById("Blue").value); 
        var blue = blueCol/255;
      }else{
       var red = Math.random()
       var green = Math.random()
       var blue = Math.random()
      }

      this.color  = [red, green, blue, 1.0];

      this.texCoord = [0.0, 0.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}