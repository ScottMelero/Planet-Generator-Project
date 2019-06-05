var setting = 0; 
var shader = null;


/*
 * Functions to select world terrain. 
 * on this will set the setting value for the world textures 
 */
function SelectForest()
{
  setting = 1;
  main()
  var ctx1 = hud.getContext('2d');
  ctx1.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
  ctx1.font = '18px "Impact"';
  ctx1.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
  ctx1.fillText('Forest Planet:', 5, canvas.height-60); 
  ctx1.fillText('A lush green planet.', 5, canvas.height-35); 
  ctx1.fillText('Perfect for 420', 5, canvas.height-10);
}

function SelectIce()
{
  setting = 2;
  main()
  var ctx2 = hud.getContext('2d');
  ctx2.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
  ctx2.font = '18px "Impact"';
  ctx2.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
  ctx2.fillText('Ice Planet:', 5, canvas.height-60); 
  ctx2.fillText('"What is cooler than being cool?"', 5, canvas.height-35); 
  ctx2.fillText('"Ice cold." - Andre 3000', 5, canvas.height-10);
}

function SelectFire()
{
  setting = 3;
  main()
  var ctx3 = hud.getContext('2d');
  ctx3.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
  ctx3.font = '18px "Impact"';
  ctx3.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
  ctx3.fillText('Fire Planet:', 5, canvas.height-60); 
  ctx3.fillText('Molten on the outside.', 5, canvas.height-35); 
  ctx3.fillText('Rock solid on the inside.', 5, canvas.height-10);
}


/*
 * Start of Main.
 * This is where everything while be drawn and where most of the vars are initiated. 
 */
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

  /*
   * pointer lock object forking for cross browser
   * this will lock the mosue to the  screen bounds for ease of use.
  */
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

    
  /*
   * Resizes the canvas to fit the viewport 
   * works on all systems and makes for a more enjoyable experience. 
   */ 
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

  /*
   * Retrieve WebGL rendering context
   */ 
  var gl = getWebGLContext(canvas);
  var ctx = hud.getContext('2d');
  if (!gl || !ctx) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  /*
   * Implement fog onto the planet terrains
   */ 
  var light = new Light(60, 1, 60);
  var fog = new Fog(0.5, 0.5, 0.5, 1, 50)

  /* 
   * Initialize the scene
   * also initializs the fog and camera 
   */ 
  var scene = new Scene();
  var camera = new Camera();
  scene.setLight(light);
  scene.addFog(fog)

  // input handler
  var inputHandler = new InputHandler(canvas, scene, camera, hud, fog);

  /*
   * Initialize all the shaders 
   * one shader for fogged objects
   * other for non fogged objects.
   */
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

  /*
   * Draws the world 
   */ 
  drawWorld(setting, scene, inputHandler, shader, shader3)
  // for the H.U.D
  draw2D(ctx)


  /*
   * Initialize renderer with scene and camera
   */ 
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}

/* 
 * Creates the starting hud
 * adds the directions for how to play and interact
 */
function draw2D(ctx) {
  ctx.clearRect(0, 0, canvas.height, canvas.width); // Clear <hud>
  ctx.font = '18px "Impact"';
  ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
  ctx.fillText('- Move with W A S D', 0, canvas.height-85); 
  ctx.fillText('- Click on the buttons ', 0, canvas.height-60); 
  ctx.fillText('  to randomly generate', 0, canvas.height-35);
  ctx.fillText('  the planet terrain', 0, canvas.height-10); 
}

/*
 * Creates the unique(random) layout for each of the three planets.
 * uses the setting var to determine which textures the world will get.  
 */ 
function drawWorld(setting, scene, inputHandler, shader, shader3){

  var floor;
  var terra;

  function P(max) 
  { return Math.floor(Math.random() * Math.floor(max)) + 1 ; }

  if(setting != 0)
  {  

    if(setting == 1){
      floor = document.getElementById('Green')
      terra = document.getElementById('Grass')

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

    else if (setting == 2){
      floor = document.getElementById('Blue')
      terra = document.getElementById('Ice')
      //creates planet 1
      inputHandler.readTexture("objs/P1_P.png", function(image) 
      {
        var shape = new Cube(shader3, image, 2, -30, 25, 30)
        scene.addGeometry(shape)
      })
      //creates planet 3
      inputHandler.readTexture("objs/P3_P.jpg", function(image) 
      {
        var shape = new Cube(shader3, image, 2, 30, 35, 15)
        scene.addGeometry(shape)
      })
    } 

    else if (setting == 3){
      floor = document.getElementById('Red')
      terra = document.getElementById('Lava')

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
    }

    //draws the map of blocks
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
    var square = new Square(shader3, image)
    scene.addGeometry(square)
  }

  //creates the sky
  inputHandler.readTexture("objs/stars.png", function(image) 
    {
      var shape = new Cube(shader3, image, 55, 0, 0, 0)
      scene.addGeometry(shape)
    })

  if(setting == 0)
  {
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
}

  
