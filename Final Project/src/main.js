var setting = 0; 

/*
* Functions to select world terrain. 
*/
//var shader = null;
function SelectForest()
{
  setting = 1;
  main()
}

function SelectIce()
{
  setting = 2;
  main()
}

function SelectFire()
{
  setting = 3;
  main()
}

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
 
  // Hook pointer lock state change events for different browsers
  document.addEventListener('pointerlockchange', lockChangeAlert, false);
  document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

  function lockChangeAlert() 
    {
      if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas)
        { console.log('The pointer lock status is now locked'); }  
        else 
        { console.log('The pointer lock status is now unlocked'); }
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

      // set the HUD canvas to display width
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
  shader3 = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);

  // Add attibutes
  shader3.addAttribute("a_Position");
  shader3.addAttribute("a_Color");
  shader3.addAttribute("a_TexCoord");
  shader3.addAttribute("a_Normal");

  // Add uinforms
  shader3.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader3.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader3.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader3.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  // Add uniforms for phong shader
  shader3.addUniform("u_LightPosition", "vec3", new Vector3().elements);
  shader3.addUniform("u_LightColor", "vec3", new Vector3().elements);
  shader3.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader3.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);


  drawWorld(setting, scene, inputHandler, shader, shader3)

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();

  draw2D(ctx)
  }

  function draw2D(ctx) {
    ctx.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
    ctx.font = '18px "Times New Roman"';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
    ctx.fillText('- Move with W A S D', 5, canvas.height-350); 
    ctx.fillText('- Click on the buttons to ', 5, canvas.height-320); 
    ctx.fillText('  generate the planet terrain', 5, canvas.height-295); 
  }

  function drawWorld(setting, scene, inputHandler, shader, shader3){

    function P(max) 
    { return Math.floor(Math.random() * Math.floor(max)) + 1 ; }

    if(setting != 0)
    {

      var floor;
      var terra;

      if(setting == 1){
        floor = document.getElementById('Green')
        terra = document.getElementById('Grass')
      } else if (setting == 2){
        floor = document.getElementById('Blue')
        terra = document.getElementById('Ice')
      } else if (setting == 3){
        floor = document.getElementById('Red')
        terra = document.getElementById('Lava')
      }

      //draws the map
      var map = [ 
        [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
        [0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0,0,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1]] 

      for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
          if(map[i][j]==1){
            var y = P(6);
            var image = terra;
            var shape = new Terrain(shader, [-30+i*2, -y, -30+j*2], map[i][j], 3, image)
            scene.addGeometry(shape)
          } 
          else if(map[i][j]==2){
            var y = P(4)
            var image = terra;
            var shape = new Terrain(shader, [-30+i*2, -y, -30+j*2], map[i][j], 3, image)
            scene.addGeometry(shape)
          }
        }
      }

      //creates floor 
        var image = floor;
        var square = new Square(shader, image)
        scene.addGeometry(square)
  }

  //creates the sky
  inputHandler.readTexture("objs/stars.png", function(image) 
    {
      var shape = new Cube(shader3, image, 50, 0, 0, 0)
      scene.addGeometry(shape)
    })

  /*
  Draws the planets 
  */
  //creates planet 1
  inputHandler.readTexture("objs/P1_P.png", function(image) 
    {
      var shape = new Cube(shader3, image, 2, -30, 25, 30)
      scene.addGeometry(shape)
    })
  //creates planet 2
  inputHandler.readTexture("objs/P2_P.jpg", function(image) 
    {
      var shape = new Cube(shader3, image, 3, 0, 30, -30)
      scene.addGeometry(shape)
    })
  //creates planet 3
  inputHandler.readTexture("objs/P3_P.jpg", function(image) 
    {
      var shape = new Cube(shader3, image, 2, 30, 35, 15)
      scene.addGeometry(shape)
    })
}

  
