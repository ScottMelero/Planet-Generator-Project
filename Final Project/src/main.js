//var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  hud = document.getElementById("hud");  

  if (!canvas || !hud) { 
    console.log('Failed to get HTML elements');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = hud.getContext('2d');
  if (!ctx){ 
    console.log('Failed to get rendering context');
    return;
  }

  // pointer lock object forking for cross browser
  canvas.requestPointerLock = canvas.requestPointerLock ||
  canvas.mozRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock || 
  document.mozExitPointerLock;

  hud.onclick = function() { canvas.requestPointerLock(); };

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
  function resize(canvas, hud) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;
    
    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {
    
      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;

      hud.width = canvas.width;
      hud.height = canvas.height;
    }
  }
  
  resize(canvas, hud); 

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  var ctx = hud.getContext('2d');
  if (!gl || !ctx) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  var light = new Light(60, 1, 60);
  var fog = new Fog(0.5, 0.5, 0.5, 1, 50)

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();
  scene.setLight(light);
  scene.addFog(fog)

  var inputHandler = new InputHandler(canvas, scene, camera, hud, fog);

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
 shader.addUniform("Kd", "float", 1.0)
 shader.addUniform("Ks", "float", 1.0)
 shader.addUniform("shininessVal", "float", 80.0)

 shader.addUniform("u_Eye", "vec4", new Vector4().elements)
 shader.addUniform("u_FogColor", "vec3", new Vector3().elements)
 shader.addUniform("u_FogDist", "vec2", [1,1])


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
shader2.addUniform("u_Eye", "vec4", new Vector4().elements)

shader2.addUniform("u_FogColor", "vec3", new Vector3().elements)
shader2.addUniform("u_FogDist", "vec2", [1,1])

shader2.addUniform("Ka", "float", 1.0)
shader2.addUniform("Kd", "float", 1.0)
shader2.addUniform("Ks", "float", 1.0)
shader2.addUniform("shininessVal", "float", 80.0)

  drawWorld(scene, inputHandler, shader, shader)

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();

  draw2D(ctx)
  }

  function draw2D(ctx) {
    ctx.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
    ctx.font = '18px "Times New Roman"';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
    ctx.fillText('HUD: Head Up Display', 10, canvas.height-60); 
    ctx.fillText('Im booutta fuckin uuuuhhhh...', 10, canvas.height-35); 
    ctx.fillText('give it to em', 10, canvas.height-10); 
  }


  function drawWorld(scene, inputHandler, shader, shader2){
    // //draws the map
    // var map = [
    //   [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,3,2,1,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
    //   [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0]]
  

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

    
    var PlanetOne = new Sphere(shader2, 5, [-50, 25, 50]);
    scene.addGeometry(PlanetOne);

    var PlanetTwo = new Sphere(shader2, 5, [0, 30, 25]);
    scene.addGeometry(PlanetTwo);

    var PlanetThree = new Sphere(shader2, 5, [50, 25, 50]);
    scene.addGeometry(PlanetThree)
}
