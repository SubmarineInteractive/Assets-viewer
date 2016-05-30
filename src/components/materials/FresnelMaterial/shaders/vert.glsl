uniform float time;

uniform float useWave;
uniform float modelLength;
uniform float waveLength;
uniform float waveSpeed;
uniform float waveBendAmount;
uniform float waveOffset;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying mat4 vModelMatrix;
varying vec3 vI;

void main() {

  vNormal = normalize( normal );
  vModelMatrix = modelMatrix;

  float mult = - position.z / modelLength * 2.0 - waveOffset;
  float s = sin( time * waveSpeed + mult * waveLength );
  float offset = pow( mult, 2.0 ) * s * ( waveBendAmount );

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ) + vec4( offset, 0.0, 0.0, 0.0 ) * step( 1.0, useWave );
  vViewPosition = - mvPosition.xyz;

  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 I = ( worldPosition.xyz ) - cameraPosition;
  vI = I;

  gl_Position = projectionMatrix * mvPosition;

}