import ParticleSystem from './';
import emitterConfig from '../../../config/particleSystem/bubbleEmitter';
import find from 'lodash.find';
import Gui from '../../core/Gui';

/**
 * BubbleParticleSystem class
 */
class BubbleParticleSystem extends ParticleSystem {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor({ resources, texture }) {

    const groupConfig = {
      texture: {
        value: find( resources, { id: texture }).resource
      }
    };

    super( groupConfig, emitterConfig );

    this.emitter.particleCountRange = [ 0, 500 ];
    this.emitter.drag.range = [ 0, 1 ];
    this.emitter.wiggle.range = [ 0, 100 ];
    this.emitter.maxAge.range = [ 0, 10 ];

    this.emitter.acceleration.value.range = [ -300, 300 ];

    this.gui();
  }

  /**
   * removeGui function
   */
  removeGui() {
    Gui.removeLastGroup();
  }

  /**
   * gui function
   */
  gui() {

    Gui.panel
      .addGroup({ label: 'Bubble emitter', enable: false })
        .addCheckbox( this.emitter, 'isStatic', { label: 'Is static' })
        .addSlider( this.emitter, 'particleCount', 'particleCountRange', { label: 'Opacity', dp: 0, onChange: () => { this.emitter.reset(); this.emitter.enable() } })
        .addSlider( this.emitter.drag, 'value', 'range', { label: 'Drag' })
        .addSlider( this.emitter.wiggle, 'value', 'range', { label: 'Wiggle', dp: 0 })
        .addSlider( this.emitter.maxAge, 'value', 'range', { label: 'Max age' })
        .addSubGroup({ label: 'Acceleration', enable: false })
          .addSlider( this.emitter.acceleration.value, 'x', 'range', { label: 'X', dp: 0 })
          .addSlider( this.emitter.acceleration.value, 'y', 'range', { label: 'Y', dp: 0 })
          .addSlider( this.emitter.acceleration.value, 'z', 'range', { label: 'Z', dp: 0 });
  }

  /**
   * update function
   * @param {number} time Time
   * @param {number} delta Delta
   */
  update( time, delta ) {
    this.group.tick( delta );
  }
}

export default BubbleParticleSystem;