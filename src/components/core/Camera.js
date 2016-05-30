import THREE from 'three';
import OrbitControls from '../helpers/OrbitControls';
import Window from '../events/Window';
import Gui from '../core/Gui';
import toRadians from '../../utils/to-radians';

/**
 * Camera class
 */
class Camera extends THREE.PerspectiveCamera {

  /**
   * Constructor function
   */
  constructor( fov, aspect, near, far ) {
    super( fov, aspect, near, far );

    this.controls = new OrbitControls( this, document.getElementById( 'webgl-container' ) );
    this.controls.enableKeys = false;

    this.position.x = -500;
    this.position.z = -600;

    this.initialPosition = this.position.clone();

    this.position.range = [ -1000, 1000 ];
    this.rotation.range = [ toRadians( -360 ), toRadians( 360 ) ];

    Window.add( ::this.resize );

    this.gui();
  }

  /**
   * Update function
   * @param  {number} delta Delta
   */
  update( delta ) {
    if( this.controls.enabled ) {
      this.controls.update( delta );
    }
  }

  /**
   * gui function
   */
  gui() {

    Gui.panel
      .addGroup({ label: 'Camera', enable: false })
        .addSubGroup({ label: 'Orbit controls', enable: false })
          .addCheckbox( this.controls, 'enabled', { label: 'Activated' })
        .addSubGroup({ label: 'Position', enable: false })
          .addButton( 'Reset', () => this.resetPosition() )
          .addSlider( this.position, 'x', 'range', { label: 'X', dp: 0 })
          .addSlider( this.position, 'y', 'range', { label: 'Y', dp: 0 })
          .addSlider( this.position, 'z', 'range', { label: 'Z', dp: 0 })
        .addSubGroup({ label: 'Rotation', enable: false })
          .addSlider( this.rotation, 'x', 'range', { label: 'X' })
          .addSlider( this.rotation, 'y', 'range', { label: 'Y' })
          .addSlider( this.rotation, 'z', 'range', { label: 'Z' });
  }

  /**
   * resetPosition function
   */
  resetPosition() {
    this.position.copy( this.initialPosition );
  }

  /**
   * Resize function
   * @param  {integer} width  Width
   * @param  {integer} height Height
   * @return {void}
   */
  resize( width, height ) {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  }
}

export default Camera;