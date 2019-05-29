var shader = null;
var timestamp = 0;
var mY = 0;

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

  // Resizes the canvas to fit the viewport 
  function resize(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    
    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {
    
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }
  
  resize(canvas); 

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  var light = new Light(1,1,1);

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();
  scene.setLight(light);

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Normal");
  shader.addAttribute("a_TexCoord");

  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  shader.addUniform("Ka", "float", 1.0)
  shader.addUniform("Kd", "float", 0.0)
  shader.addUniform("Ks", "float", 1.0)
  shader.addUniform("shininessVal", "float", 1.0)

//sets the view
camera.setDistance()

// Initialize shader
shader2 = new Shader(gl, ASG5_VSHADER, ASG5_FSHADER);

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

 shader2.addUniform("Ka", "float", 0.0)
 shader2.addUniform("Kd", "float", 1.0)
 shader2.addUniform("Ks", "float", 2.0)
 shader2.addUniform("shininessVal", "float", 90.0)

drawWorld(scene, inputHandler, shader, shader2)

// Initialize renderer with scene and camera
renderer = new Renderer(gl, scene, camera);
renderer.start();
}

function drawWorld(scene, inputHandler, shader, shader2){
  //draws the map
  // var map = [
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

  // for(var i = 0; i < map.length; i++){
  //   for(var j = 0; j < map[i].length; j++){
  //     if(map[i][j]!=0){
  //       var image = document.getElementById('wallSpace')
  //       var shape = new Cube(shader, [-12+i*.5, -1, -12+j*.5], map[i][j], .35, image)
  //       scene.addGeometry(shape)
  //     }
  //   }
  // }

  //create square and add it 
  inputHandler.readTexture("objs/darkBlueSky.jpg", function(image) {
    var square = new Square(shader, image)
    scene.addGeometry(square)
  })

  //creates the sky
  inputHandler.readTexture("objs/pinkSky.jpg", function(image) {
    var shape = new Sky(shader, image)
    scene.addGeometry(shape)
  })

  var PlanetOne = new Sphere(shader2, 5, [-9, 0, -9]);
  scene.addGeometry(PlanetOne);

  var PlanetTwo = new Sphere(shader2, 5, [-11, 0, -11]);
  scene.addGeometry(PlanetTwo);

  var PlanetThree = new Sphere(shader2, 5, [-13, 0, -13]);
  scene.addGeometry(PlanetThree)
}