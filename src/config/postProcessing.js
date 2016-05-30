import THREE from 'three';
import { BlendMode } from '@superguigui/wagner';
import RGBSplitPass from '@superguigui/wagner/src/passes/rgbsplit/rgbsplit';
import TiltShiftPass from '@superguigui/wagner/src/passes/tiltShift/tiltShiftPass';
import NoisePass from '@superguigui/wagner/src/passes/noise/noise';
import FXAAPass from '@superguigui/wagner/src/passes/fxaa/FXAAPass';

export default {
  active: true,
  passes: [
    {
      name: 'RGBSplitPass',
      active: true,
      constructor: new RGBSplitPass({
        delta: new THREE.Vector2( 10, 10 )
      })
    },
    {
      name: 'noisePass',
      active: true,
      constructor: new NoisePass({
        amount: 0.01,
        speed: 0.1
      })
    },
    {
      name: 'tiltshiftPass',
      active: true,
      constructor: new TiltShiftPass({
        bluramount: 0.5,
        center: 1,
        stepSize: 0.005
      })
    },
    {
      name: 'fxaaPass',
      active: true,
      constructor: new FXAAPass()
    }
  ]
};