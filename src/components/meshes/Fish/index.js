import THREE from 'three';
import Gui from '../../core/Gui';
import FresnelMaterial from '../../materials/FresnelMaterial';
import find from 'lodash.find';

/**
 * Fish class
 */
class Fish extends THREE.Object3D {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor({ resources, model, texture }) {
    super();

    this.resources = resources;

    this.model = find( this.resources, { id: model }).resource;
    this.modelObject = this.model.children[ 0 ];

    this.texture = find( this.resources, { id: texture }).resource;
    this.modelObject.material = new FresnelMaterial({ texture: this.texture });

    this.add( this.model );
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
      .addGroup({ label: 'Fish', enable: false })
        .addSubGroup({ label: 'Material', enable: false })
          .addCheckbox( this.modelObject.material.uniforms.useWave, 'value', { label: 'Animated' })
          .addCheckbox( this.modelObject.material, 'wireframe', { label: 'Wireframe' })
          .addSlider( this.modelObject.material.uniforms.opacity, 'value', 'range', { label: 'Opacity' })
          .addSlider( this.modelObject.material.uniforms.waveBendAmount, 'value', 'range', { label: 'Wave bend' })
          .addSlider( this.modelObject.material.uniforms.waveSpeed, 'value', 'range', { label: 'Wave speed' })
          .addSlider( this.modelObject.material.uniforms.waveLength, 'value', 'range', { label: 'Wave length' })
          .addSlider( this.modelObject.material.uniforms.waveOffset, 'value', 'range', { label: 'Wave offset' });
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    this.modelObject.material.update( time );
  }
}

export default Fish;