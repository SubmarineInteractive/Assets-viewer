import Group from './Group';
import Emitter from './Emitter';

/**
 * ParticleSystem class
 */
class ParticleSystem {

  /**
   * constructor function
   * @param {Object} groupConfig   Group configuration
   * @param {Object} emitterConfig Emitter configuration
   */
  constructor( groupConfig, emitterConfig ) {

    this.group = new Group( groupConfig );
    this.emitter = new Emitter( emitterConfig );
    
    this.group.addEmitter( this.emitter );
  }
}

export default ParticleSystem;