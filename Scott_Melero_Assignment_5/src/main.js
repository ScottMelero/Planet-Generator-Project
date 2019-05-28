var shader = null;
var cycle = 0;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // pointer lock object forking for cross browser
  canvas.requestPointerLock = canvas.requestPointerLock ||
  canvas.mozRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock || 
  document.mozExitPointerLock;

  canvas.onclick = function() { canvas.requestPointerLock(); };

  // pointer lock event listeners
 
  // Hook pointer lock state change events for different browsers
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

  function lockChangeAlert() 
    {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas)
      {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
      } 
      else 
      {
        console.log('The pointer lock status is now unlocked');  
        document.removeEventListener("mousemove", updatePosition, false);
      }
    }

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var light = new Light(-50, 50, -50);
  var scene = new Scene();
  scene.setLight(light);

  //initialize camera
  var camera = new Camera();

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG5_VSHADER, ASG5_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");
  shader.addAttribute("a_Normal");

  // Add uinforms
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  // Add uniforms for phong shader
  shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shader.addUniform("u_LightColor", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  // Initialize shader
shader2 = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

// Add attibutes
shader2.addAttribute("a_Position");
shader2.addAttribute("a_Color");
shader2.addAttribute("a_Normal");

shader2.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
shader2.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
shader2.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
shader2.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

shader2.addUniform("u_LightPosition", "vec3", new Vector3().elements);
shader2.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
shader2.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
shader2.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

shader2.addUniform("Ka", "float", 1.0)
shader2.addUniform("Kd", "float", 1.0)
shader2.addUniform("Ks", "float", 1.0)
shader2.addUniform("shininessVal", "float", 80.0)

  // Set camera distance 
  camera.setDistance()

  // Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/dirt.jpg", function(image) 
    {  
      for (i = 0; i < 1;i = i +.20)
        {
          for (j = 0; j < 5;j = j +.20)
            {
              var shape = new Cube(shader,-3, i-.875, j, .125, image)
              scene.addGeometry(shape)
            }
        }
    })

  //create square and add it 
  inputHandler.readTexture("objs/grass.jpg", function(image) {
    var square = new Square(shader, image)
    scene.addGeometry(square)
  })

  inputHandler.readTexture("objs/sky.png", function(image) {
    var shape = new Cube(shader, 0, 0, 8, 5, image)
    scene.addGeometry(shape)
})

// Add the end and start sphere
var shape = new Sphere(shader, 13);
scene.addGeometry(shape);

// Initialize renderer with scene and camera
renderer = new Renderer(gl, scene, camera);
renderer.start();

var tick = function() {
  //-y, +z for night 
      
    if(cycle > 450)  
        cycle = 0; 
    else if(cycle > 300)
        light.rotateLight(0, 1, 0);
    else if(cycle > 150)
        light.rotateLight(-1, -1, -1);
    else if(cycle <= 150) 
        light.rotateLight(1, 0, 1);
    cycle++;
    
    requestAnimationFrame(tick);
  }
  tick();

}
