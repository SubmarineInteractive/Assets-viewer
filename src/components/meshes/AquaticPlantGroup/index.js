import THREE from 'three';
import Gui from '../../core/Gui';
import SmallAquaticPlant from './SmallAquaticPlant';
import BigAquaticPlant from './BigAquaticPlant';
import find from 'lodash.find';
import capitalize from 'lodash.capitalize';

/**
 * AquaticPlantGroup class
 */
class AquaticPlantGroup extends THREE.Object3D {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor({ resources, model, texture, preset }) {
    super();

    this.resources = resources;
    this.preset = preset;

    this.numberSmallPlants = {
      last: this.preset.group ? this.preset.group.numberSmallPlants : 50,
      value: this.preset.group ? this.preset.group.numberSmallPlants : 50,
      range: [ 0, 200 ]
    };

    this.numberBigPlants = {
      last: this.preset.group ? this.preset.group.numberBigPlants : 25,
      value: this.preset.group ? this.preset.group.numberBigPlants : 25,
      range: [ 0, 100 ]
    };

    this.smallPlants = [];
    this.bigPlants = [];

    this.model = find( this.resources, { id: model }).resource;
    this.texture = find( this.resources, { id: texture }).resource;

    // Small plants
    for ( let i = 0; i < this.numberSmallPlants.value; i++ ) {

      const plant = new SmallAquaticPlant({ model: this.model.clone(), texture: this.texture, preset: this.preset });

      this.add( plant );
      this.smallPlants.push( plant );
    }

    // Big plants
    for ( let i = 0; i < this.numberBigPlants.value; i++ ) {

      const plant = new BigAquaticPlant({ model: this.model.clone(), texture: this.texture, preset: this.preset });

      this.add( plant );
      this.bigPlants.push( plant );
    }

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

    const defaultPlant = this.smallPlants[ 0 ].modelObject;

    Gui.panel
      .addGroup({ label: 'Aquatic Plant', enable: false })
        .addSlider( this.numberSmallPlants, 'value', 'range', { label: 'Small amount', dp: 0, onChange: () => this.updateNumberPlants( 'small' ) })
        .addSlider( this.numberBigPlants, 'value', 'range', { label: 'Big amount', dp: 0, onChange: () => this.updateNumberPlants( 'big' ) })
        .addSubGroup({ label: 'Material', enable: false })
          .addCheckbox( defaultPlant.material.uniforms.useWave, 'value', { label: 'Animated', onChange: () => this.updateAllUniforms( 'useWave', defaultPlant.material.uniforms.useWave.value ) })
          .addCheckbox( defaultPlant.material, 'wireframe', { label: 'Wireframe', onChange: () => this.updateAllMaterials( 'wireframe', defaultPlant.material.wireframe ) })
          .addSlider( defaultPlant.material.uniforms.opacity, 'value', 'range', { label: 'Opacity', onChange: () => this.updateAllUniforms( 'opacity', defaultPlant.material.uniforms.opacity.value ) })
          .addSlider( defaultPlant.material.uniforms.waveBendAmount, 'value', 'range', { label: 'Wave bend', onChange: () => this.updateAllUniforms( 'waveBendAmount', defaultPlant.material.uniforms.waveBendAmount.value ) })
          .addSlider( defaultPlant.material.uniforms.waveSpeed, 'value', 'range', { label: 'Wave speed', onChange: () => this.updateAllUniforms( 'waveSpeed', defaultPlant.material.uniforms.waveSpeed.value ) })
          .addSlider( defaultPlant.material.uniforms.waveLength, 'value', 'range', { label: 'Wave length', onChange: () => this.updateAllUniforms( 'waveLength', defaultPlant.material.uniforms.waveLength.value ) })
          .addSlider( defaultPlant.material.uniforms.waveOffset, 'value', 'range', { label: 'Wave offset', onChange: () => this.updateAllUniforms( 'waveOffset', defaultPlant.material.uniforms.waveOffset.value ) });
  }

  /**
   * updateNumberPlants function
   * @param {string} type Plant type
   */
  updateNumberPlants( type = 'small' ) {

    const diff = this[ `number${ capitalize( type ) }Plants` ].value - this[ `number${ capitalize( type ) }Plants` ].last;
    this[ `number${ capitalize( type ) }Plants` ].last = this[ `number${ capitalize( type ) }Plants` ].value;

    const oldLength = this[ `${ type }Plants` ].length;

    for ( let i = 0; i < Math.abs( diff ); i++ ) {

      if( diff < 0 ) {

        this.remove( this[ `${ type }Plants` ][ oldLength - 1 - i ] );

        this[ `${ type }Plants` ].pop();

      } else if( diff > 0 ) {

        let plant = null;

        const options = { model: this.model.clone(), texture: this.texture, preset: this.preset };

        if( type === 'small' ) {
          plant = new SmallAquaticPlant( options );
        } else {
          plant = new BigAquaticPlant( options );
        }

        this.add( plant );
        this[ `${ type }Plants` ].push( plant );
      }
    }
  }

  updateAllMaterials( name, value ) {
    for ( let i = 0; i < this.smallPlants.length; i++ ) {
      this.smallPlants[ i ].modelObject.material[ name ] = value;
    }

    for ( let i = 0; i < this.bigPlants.length; i++ ) {
      this.bigPlants[ i ].modelObject.material[ name ] = value;
    }
  }

  /**
   * updateAllUniforms function
   * @param {string} name Uniform name
   * @param {mixed} value Uniform value
   */
  updateAllUniforms( name, value ) {
    for ( let i = 0; i < this.smallPlants.length; i++ ) {
      this.smallPlants[ i ].modelObject.material.uniforms[ name ].value = value;
    }

    for ( let i = 0; i < this.bigPlants.length; i++ ) {
      this.bigPlants[ i ].modelObject.material.uniforms[ name ].value = value;
    }
  }

  /**
   * Update function
   * @param {number} time Time
   */
  update( time ) {
    for ( let i = 0; i < this.smallPlants.length; i++ ) {
      this.smallPlants[ i ].update( time );
    }

    for ( let i = 0; i < this.bigPlants.length; i++ ) {
      this.bigPlants[ i ].update( time );
    }
  }
}

export default AquaticPlantGroup;