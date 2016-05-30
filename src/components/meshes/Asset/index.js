import THREE from 'three';
import assets from '../../assets';
import Gui from '../../core/Gui';
import filter from 'lodash.filter';
import find from 'lodash.find';
import findIndex from 'lodash.findindex';

/**
 * Asset class
 */
class Asset extends THREE.Object3D {

  /**
   * constructor function
   * @param {Object} resources Resources
   */
  constructor( resources ) {
    super();

    this.resources = resources;
    this.assets = assets;
    this.asset = {};
    this.assetsNames = filter( this.assets, 'name' ).map( asset => asset.name );
    this.defaultAssetIndex = ( findIndex( this.assets, { default: true }) === -1 ) ? 0 : findIndex( this.assets, { default: true });
    this.defaultAsset = this.assets[ this.defaultAssetIndex ];
    this.defaultAssetName = this.defaultAsset.name;

    this.position.range = [ -1000, 1000 ];
    this.scale.range = [ 0.01, 2 ]; // 0.01 to prevent warning : can't invert matrix, determinant is 0
    this.scale.uniform = {
      value: 1,
      range: this.scale.range
    };

    this.gui();
    this.updateAsset( this.defaultAssetIndex );
  }

  /**
   * updateAsset function
   * @param {number} index Asset index
   */
  updateAsset( index ) {

    const newAssetName = this.assetsNames[ index ];
    const newAsset = find( this.assets, { name: newAssetName });

    this.remove( ( this.asset.group ) ? this.asset.group.mesh : this.asset );
    if( this.asset && typeof this.asset.removeGui === 'function' ) {
      this.asset.removeGui();
    }

    const options = {
      resources: this.resources,
      model: newAsset.model || null,
      texture: newAsset.texture || null,
      preset: newAsset.preset || {}
    };

    this.asset = newAsset.mesh( options );
    const mesh = ( this.asset instanceof THREE.Object3D ) ? this.asset : this.asset.group.mesh;
    this.add( mesh );
  }

  /**
   * gui function
   */
  gui() {

    Gui.panel
      .addGroup({ label: 'Asset', enable: false })
        .addSelect( this, 'assetsNames', { label: 'Choose', target: 'defaultAssetName', onChange: index => this.updateAsset( index ) })
        .addSubGroup({ label: 'Position', enable: false })
          .addSlider( this.position, 'x', 'range', { label: 'X', dp: 0 })
          .addSlider( this.position, 'y', 'range', { label: 'Y', dp: 0 })
          .addSlider( this.position, 'z', 'range', { label: 'Z', dp: 0 })
        .addSubGroup({ label: 'Scale', enable: false })
          .addSlider( this.scale.uniform, 'value', 'range', { label: 'Uniform', onChange: () => this.scale.set( this.scale.uniform.value, this.scale.uniform.value, this.scale.uniform.value ) })
          .addSlider( this.scale, 'x', 'range', { label: 'X' })
          .addSlider( this.scale, 'y', 'range', { label: 'Y' })
          .addSlider( this.scale, 'z', 'range', { label: 'Z' });
  }

  /**
   * Update function
   * @param {number} time Time
   * @param {number} delta Delta
   */
  update( time, delta ) {
    this.asset.update( time, delta );
  }
}

export default Asset;