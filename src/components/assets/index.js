import Fish from '../meshes/Fish';
import BubbleParticleSystem from '../meshes/ParticleSystem/BubbleParticleSystem';
import LanternFish from '../meshes/Fish/LanternFish';
import AquaticPlantGroup from '../meshes/AquaticPlantGroup';

import { seaweed, anemone } from '../presets';

export default [
  {
    name: 'Lantern fish',
    model: 'lanternFishModel',
    texture: 'fishGradientTexture',
    default: true,
    mesh: options => new LanternFish( options )
  },
  {
    name: 'Hachette fish',
    model: 'hachetteFishModel',
    texture: 'fishGradientTexture',
    mesh: options => new Fish( options )
  },
  {
    name: 'Slender fish',
    model: 'slenderFishModel',
    texture: 'fishGradientTexture',
    mesh: options => new Fish( options )
  },
  {
    name: 'Anemone',
    model: 'anemoneModel',
    texture: 'anemoneGradientTexture',
    preset: anemone,
    mesh: options => new AquaticPlantGroup( options )
  },
  {
    name: 'Seaweed',
    model: 'seaweedModel',
    texture: 'seaweedGradientTexture',
    preset: seaweed,
    mesh: options => new AquaticPlantGroup( options )
  },
  {
    name: 'Bubble emitter',
    texture: 'bubbleTexture',
    mesh: options => new BubbleParticleSystem( options )
  }
];