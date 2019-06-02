/**
 * Fog class
 *
 * @author Lucas N. Ferreira
 * @this {Fog}
 */
class Fog {
    constructor(x, y, z, distX, distY){
        this.color = new Vector3([x, y, z])
        this.distance = [distX,distY]
    }
}