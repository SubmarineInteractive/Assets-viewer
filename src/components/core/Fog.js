import THREE from 'three';
import Gui from './Gui';

/**
 * Fog class
 */
class Fog extends THREE.FogExp2 {

  /**
   * constructor function
   * @param  {Renderer} Renderer Renderer
   */
  constructor( Renderer ) {
    super( new THREE.Color( '#243465' ), 0.0016 );

    this.renderer = Renderer;

    this.hexColor = `#${ this.color.getHexString() }`;
    this.renderer.setClearColor( this.color );

    this.gui();
  }

  /**
   * gui function
   */
  gui() {

    Gui.panel
      .addGroup({ label: 'Fog', enable: false })
        .addColor( this, 'hexColor', { label: 'Color', colorMode: 'hex', onChange: color => {
          const parsedColor = parseInt( color.substring( 1 ), 16 );
          this.color.setHex( parsedColor );
          this.renderer.setClearColor( parsedColor );
        } })
        .addNumberInput( this, 'density', { label: 'Density', dp: 4, step: 0.0001 })
  }
}

export default Fog;