import THREE from 'three';
import shaderParse from '../../../utils/shader-parse';
var glslify = require('glslify');

/**
 * FresnelMaterial class
 */
class FresnelMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor({ texture, ...options }) {
    super( options );

    this.vertexShader = shaderParse(glslify( './shaders/vert.glsl' ));
    this.fragmentShader = shaderParse(glslify( './shaders/frag.glsl' ));

    this.gradientTexture = texture;
    this.gradientTexture.magFilter = this.gradientTexture.minFilter = THREE.LinearFilter;

    this.transparent = true;
    this.fog = true;
    this.lights = true;
    this.side = THREE.DoubleSide;

    this.uniforms = {
      ...THREE.UniformsLib[ 'fog' ],
      ...THREE.UniformsLib[ 'lights' ],
      ...THREE.UniformsLib[ 'ambient' ],
      'id': {
        type: 'i',
        value: 0
      },
      'opacity': {
        type: 'f',
        value: 0.3,
        range: [ 0, 1 ]
      },
      'time': {
        type: 'f',
        value: 0.0
      },
      'gradientTexture': {
        type: 't',
        value: this.gradientTexture
      },
      'gradientProgress': {
        type: 'f',
        value: 0.0
      },
      'useLights': {
        type: 'i',
        value: true
      },
      'useWave': {
        type: 'f',
        value: true
      },
      'modelLength': {
        type: 'f',
        value: 730.0
      },
      'waveLength': {
        type: 'f',
        value: 2.0,
        range: [ 0, 20 ]
      },
      'waveSpeed': {
        type: 'f',
        value: 3.0,
        range: [ 0, 30 ]
      },
      'waveBendAmount': {
        type: 'f',
        value: 8.0,
        range: [ 0, 100 ]
      },
      'waveOffset': {
        type: 'f',
        value: 1.5,
        range: [ 0, 5 ]
      }
    };
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.time.value = time;
  }
}

export default FresnelMaterial;