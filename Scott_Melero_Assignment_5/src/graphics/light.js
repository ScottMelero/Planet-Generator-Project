
class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);

        // light colors
        this.ambient = [0.5,0.5,0.5];
        this.diffuse = [1.0, 1.0, 0.0];

        // Later you will add specular here too.
        this.specular = [1.0, 1.0, 1.0];
        this.lightColor = [0, 0.0, 0.0];
    }

    rotateLight(x, y, z) 
        {
            var cycle = new Vector3([x, y, z]);
            this.pos = this.pos.add(cycle);
        }

}
