// Vertex Shader
var ASG5_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;

  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  attribute vec4 a_Color;
  varying vec4 v_Color;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform vec4 u_Eye; 

  varying float v_Dist; 
  

  void main() {
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_Dist = distance(u_ModelMatrix * a_Position, u_Eye);
    gl_Position = u_ModelMatrix * u_ProjectionMatrix * u_ViewMatrix * a_Position;
  }`;

// Fragment Shader
var ASG5_FSHADER =
  `precision mediump float;

  uniform float Ka;   // Ambient reflection coefficient
  uniform float Kd;   // Diffuse reflection coefficient
  uniform float Ks;   // Specular reflection coefficient
  uniform float shininessVal; // Shininess

  varying vec4 v_Color; 
  varying float v_Dist; 
  varying vec3 v_Normal; //surface normal
  varying vec3 v_Position; //vertex position 

  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_LightPosition;
  uniform vec3 u_SpecularColor;

  uniform vec3 u_FogColor;
  uniform vec2 u_FogDist;

  void main() {
    vec3 N = normalize(v_Normal);
    vec3 L = normalize(u_LightPosition - v_Position);

    // Lambert's cosine law
    float lambertian = max(dot(N, L), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
      vec3 R = reflect(-L, N);      // Reflected light vector
      vec3 V = normalize(-v_Position); // Vector to viewer
      // Compute the specular term
      float specAngle = max(dot(R, V), 0.0);
      specular = pow(specAngle, shininessVal);
    }

    float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);
    vec3 color = mix(u_FogColor, vec3((Ka * u_AmbientColor * v_Color.rgb) + (Kd * lambertian * u_DiffuseColor * v_Color.rgb) + (Ks * specular * u_SpecularColor * v_Color.rgb)), fogFactor);

    gl_FragColor = vec4(color, v_Color.a);
  }`;
