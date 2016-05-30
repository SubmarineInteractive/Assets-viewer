import THREE from 'three';
import raf from 'raf-loop';
import Fog from './Fog';
import Gui from './Gui';
import Debug from './Debug';
import resources from '../../resources';
import Clock from '../helpers/Clock';
import Loader from '../helpers/Loader';
import Asset from '../meshes/Asset';
import PostProcessing from '../postProcessing/PostProcessing';

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * Constructor function
   * @param {Renderer} Renderer Renderer instance
   * @param {Camera}   Camera   Camera instance
   */
  constructor( Renderer, Camera ) {
    super();

    this.renderer = Renderer;
    this.camera = Camera;
    this.gui = Gui;
    this.postProcessing = new PostProcessing( this, this.renderer, this.camera );

    this.clock = new Clock();

    this.loader = new Loader( resources );

    this.loader.load().then( resources => {
      this.resources = resources;

      this.createScene();
    });

  }

  /**
   * CreateScene function
   */
  createScene() {

    // Debug
    this.debug = new Debug();
    this.add( this.debug );

    // Fog
    this.fog = new Fog( this.renderer );

    // Asset
    this.asset = new Asset( this.resources );
    this.add( this.asset );

    this.raf = raf( ::this.render ).start();
  }

  /**
   * Render function
   */
  render() {

    this.asset.update( this.clock.time, this.clock.delta );

    this.gui.update();
    this.postProcessing.update();
    this.camera.update( this.clock.delta );
  };
}

export default Scene;