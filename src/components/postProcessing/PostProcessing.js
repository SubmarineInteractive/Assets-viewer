import EffectComposer from './EffectComposer';
import postProcessingConfig from '../../config/postProcessing';
import Gui from '../core/Gui';
import capitalize from 'lodash.capitalize';

/**
 * PostProcessing
 */
class PostProcessing {

  /**
   * Constructor function
   * @param  {Scene} scene       Scene instance
   * @param  {Renderer} renderer Renderer instance
   * @param  {Camera} camera     Camera instance
   */
  constructor( scene, renderer, camera ) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.config = postProcessingConfig;

    this.active = this.config.active;
    this.composer = new EffectComposer( this.renderer, this.config.effectComposer );
    this.passes = this.config.passes;

    this.gui();
  }

  /**
   * gui function
   */
  gui() {

    const group = Gui.panel
      .addGroup({ label: 'Post-processing', enable: false })
        .addCheckbox( this, 'active', { label: 'Activated' });

    for( let i = 0; i < this.passes.length; i++ ) {
      group.addCheckbox( this.passes[i], 'active', { label: capitalize( this.passes[i].name.slice( 0, -4 ) ) });
    }
  }

  /**
   * Update function
   */
  update() {

    if( this.active ) {

      this.composer.reset();
      this.composer.render( this.scene, this.camera );
      this.passes
        .filter( pass => pass.active )
        .forEach( pass => this.composer.pass( pass.constructor ) );
      this.composer.toScreen();

    } else {

      this.renderer.render( this.scene, this.camera );
    }
  }
}

export default PostProcessing;