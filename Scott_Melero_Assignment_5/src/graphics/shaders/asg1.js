// Work in same coordinate space 
// model matrix is in space 

// Vertex Shader
var ASG5_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal;
  attribute vec2 a_TexCoord;

  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;
  varying vec2 v_TexCoord;

  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_NormalMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;


// Fragment Shaderasd
var ASG5_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;

  uniform vec3 u_LightPosition;
  uniform vec3 u_LightColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;

  uniform sampler2D u_Sampler;
  varying vec2 v_TexCoord;

  void main() {
    // Normalize the normal because it is interpolated and not 1.0 in length any more
    vec3 normal = normalize(v_Normal);
    
    // Calculate the light direction and make it 1.0 in length
    vec3 lightDirection = normalize(u_LightPosition - v_Position);

    // The dot product of the light direction and the normal
    float nDotL = max(dot(lightDirection, normal), 0.0);

    // Calculate the final color from diffuse, ambient, and specular reflection
    vec3 diffuse = u_LightColor * v_Color.rgb+ texture2D(u_Sampler, v_TexCoord).rgb  * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb + texture2D(u_Sampler, v_TexCoord).rgb;
    vec3 specular =(nDotL*nDotL*nDotL) * u_SpecularColor;
    
    gl_FragColor = vec4((diffuse + ambient + specular) *texture2D(u_Sampler, v_TexCoord).rgb, texture2D(u_Sampler, v_TexCoord).a) ;
  }`;
 
  
// Vertex Shader
var ASG1_VSHADER =
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


void main() {
  v_Color = a_Color;
  v_Position = vec3(u_ModelMatrix * a_Position);
  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
  gl_Position = u_ModelMatrix * u_ProjectionMatrix * u_ViewMatrix * a_Position;
}`;

// Fragment Shader
var ASG1_FSHADER =
`precision mediump float;

uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess

varying vec4 v_Color; 
varying vec3 v_Normal; //surface normal
varying vec3 v_Position; //vertex position 

uniform vec3 u_DiffuseColor;
uniform vec3 u_AmbientColor;
uniform vec3 u_LightPosition;
uniform vec3 u_SpecularColor;

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

  gl_FragColor = vec4(Ka * u_AmbientColor + Kd * lambertian * u_DiffuseColor + Ks * specular * u_SpecularColor, 1.0);
}`;
