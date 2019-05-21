var shader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var camera = new Camera();

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");

  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  camera.setDistance()

  // Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/dirt.jpg", function(image) {
    for (i = 0; i < 1;i = i +.20){
      var shape = new Cube(shader,i, -.875, 0, .125, image)
      scene.addGeometry(shape)
  }
  for (i = .25; i < 1;i = i +.20){
      var shape = new Cube(shader,i, -.625, 0, .125, image)
      scene.addGeometry(shape)
  }
  for (i = .5; i < 1;i = i +.20){
      var shape = new Cube(shader,i, -.375, 0, .125, image)
      scene.addGeometry(shape)
  }
  var shape = new Cube(shader,.75, -.125, 0, .125, image)
  scene.addGeometry(shape)

  for (i = 0; i < 1;i = i +.20){
    for (j = 0; j < 1;j = j +.20){
      var shape = new Cube(shader,-1, i-.875, j, .125, image)
      scene.addGeometry(shape)
    }
  }

  for (i = 0; i < 1;i = i +.25){
    for (j = 0; j < 1;j = j +.25){
      var shape = new Cube(shader,1, i-.875, j, .125, image)
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

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
