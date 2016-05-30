import SPE from 'shader-particle-engine';
import emitterConfig from '../../../config/particleSystem/emitter';

/**
 * Emitter class
 */
class Emitter extends SPE.Emitter {

  /**
   * Constructor function
   * @param {object} customConfig Custom configuration
   */
  constructor( customConfig = {}) {
    super({ ...emitterConfig, ...customConfig });
  }
}

export default Emitter;