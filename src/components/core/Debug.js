import THREE from 'three';
import Gui from './Gui';

/**
 * Debug class
 */
class Debug extends THREE.Object3D {

  /**
   * constructor function
   */
  constructor() {
    super();

    this.axisHelper();
    this.gridHelper();

    this.gui();
  }

  /**
   * axisHelper function
   */
  axisHelper() {
    this.axisHelper = new THREE.AxisHelper( 500 );
    this.axisHelper.visible = false;
    this.add( this.axisHelper );
  }

  /**
   * gridHelper function
   */
  gridHelper() {
    const size = 500;
    const step = 10;

    this.gridHelper = new THREE.GridHelper( size, step );
    this.gridHelper.visible = false;
    this.add( this.gridHelper );
  }

  /**
   * gui function
   */
  gui() {

    Gui.panel
      .addGroup({ label: 'Debug', enable: false })
        .addCheckbox( this.axisHelper, 'visible', { label: 'Axis helper' })
        .addCheckbox( this.gridHelper, 'visible', { label: 'Grid helper' });
  }
}

export default Debug;