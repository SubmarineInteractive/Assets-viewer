import THREE from 'three';
import Fish from './';
import Gui from '../../core/Gui';

/**
 * LanternFish class
 */
class LanternFish extends Fish {

  /**
   * constructor function
   * @param {Object} options Options
   */
  constructor( options ) {
    super( options );
  }

  /**
   * createLight function
   */
  createLight() {

    // Point light
    this.pointLight = new THREE.PointLight( new THREE.Color( '#435eb0' ), 0, 800, 2 );
    this.pointLight.hexColor = `#${ this.pointLight.color.getHexString() }`;
    this.pointLight.debug = false;
    this.pointLight.position.set( 0, 445, -125 );
    this.pointLight.animation = true;
    this.add( this.pointLight );

    // Debug
    const sphereSize = 25;
    this.pointLightHelper = new THREE.PointLightHelper( this.pointLight, sphereSize );
    this.pointLightHelper.material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, wireframeLinewidth: 2 });
    this.pointLightHelper.visible = false;
    this.add( this.pointLightHelper );

    this.pointLightTl = new TimelineMax({ paused: true });

    this.pointLightTl.to( this.pointLight, 2, { intensity: 15, ease: Power2.easeIntOut, yoyo: true, repeat: -1 });

    this.pointLightTl.play();
  }

  /**
   * removeGui function
   */
  removeGui() {
    Gui.removeGroup( Gui.panel._groups.length - 2 );
    Gui.removeLastGroup();
  }

  /**
   * gui function
   */
  gui() {

    super.gui();

    this.createLight();

    Gui.panel
      .addGroup({ label: 'Lantern fish', enable: false })
        .addSubGroup({ label: 'Point light', enable: false })
          .addCheckbox( this.pointLight, 'visible', { label: 'Visible' })
          .addCheckbox( this.pointLight, 'debug', { label: 'Debug', onChange: () => {
            if( this.pointLight.debug ) {
              this.pointLightHelper.visible = true;
            } else {
              this.pointLightHelper.visible = false;
            }
          } })
          .addCheckbox( this.pointLight, 'animation', { label: 'Animated', onChange: () => {
            if( this.pointLight.animation ) {
              this.pointLightTl.resume();
            } else {
              this.pointLightTl.pause();
            }
          } })
          .addColor( this.pointLight, 'hexColor', { label: 'Color', colorMode: 'hex', onChange: color => {
            const parsedColor = parseInt( color.substring( 1 ), 16 );
            this.pointLight.color.setHex( parsedColor );
          } })
          .addNumberInput( this.pointLight, 'intensity', { label: 'Intensity' });
  }
}

export default LanternFish;