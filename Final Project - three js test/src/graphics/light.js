class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);

        // light colors
        this.ambient = [0.5,1.0,0.5];
        this.diffuse = [0.5,1.0,1.0];
        this.specular = [1.0,1.0,1.0]
    }
}
