/**
 * Specifies a Scene full of Geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   * @returns {Scene} Scene object created
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    this.light = null;
    this.fog = null;
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry);
  }

  setLight(light) {
    this.light = light;
 }

 addFog(fog){
   this.fog = fog
 }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometries() {
    this.geometries = [];
  }
}