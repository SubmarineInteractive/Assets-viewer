import Renderer from './Renderer';
import Camera from './Camera';
import Scene from './Scene';

/**
 * App class
 */
class App {

  /**
   * Begin function
   */
  static begin() {

    // Renderer
    const renderer = new Renderer();

    // Container
    const container = document.getElementById( 'webgl-container' );
    container.appendChild( renderer.domElement );

    // Camera
    const camera = new Camera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

    // Scene
    const scene = new Scene( renderer, camera );
  }
}

export default App;