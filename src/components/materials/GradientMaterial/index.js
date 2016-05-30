import THREE from 'three';
import shaderParse from '../../../utils/shader-parse';
var glslify = require('glslify');

/**
 * GradientMaterial class
 */
class GradientMaterial extends THREE.ShaderMaterial {

  /**
   * Constructor function
   * @param {Object} options Options
   */
  constructor({ texture, preset, ...options }) {
    super( options );

    this.vertexShader = shaderParse(glslify( './shaders/vert.glsl' ));
    this.fragmentShader = shaderParse(glslify( './shaders/frag.glsl' ));

    this.gradientTexture = texture;
    this.gradientTexture.magFilter = this.gradientTexture.minFilter = THREE.LinearFilter;

    this.transparent = true;
    this.fog = true;

    this.uniforms = {
      ...THREE.UniformsLib[ 'fog' ],
      'time': {
        type: 'f',
        value: 0.0
      },
      'opacity': {
        type: 'f',
        value: 0.9,
        range: [ 0, 1 ]
      },
      'random': {
        type: 'f',
        value: 1.0
      },
      'gradientTexture': {
        type: 't',
        value: this.gradientTexture
      },
      'luminanceSteps': {
        type: 'i',
        value: 10
      },
      'luminanceBoost': {
        type: 'f',
        value: 0.5
      },
      'useWave': {
        type: 'f',
        value: true
      },
      'modelLength': {
        type: 'f',
        value: 650.0,
        range: [ 0, 1000 ]
      },
      'waveLength': {
        type: 'f',
        value: 3.0,
        range: [ 0, 20 ]
      },
      'waveSpeed': {
        type: 'f',
        value: 2.5,
        range: [ 0, 30 ]
      },
      'waveBendAmount': {
        type: 'f',
        value: 10.0,
        range: [ 0, 100 ]
      },
      'waveOffset': {
        type: 'f',
        value: 1.0,
        range: [ 0, 5 ]
      }
    };

    if( preset.material && preset.material.uniforms ) {
      this.uniforms = {
        ...this.uniforms,
        ...preset.material.uniforms
      };
    }
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.uniforms.time.value = time;
  }
}

export default GradientMaterial;