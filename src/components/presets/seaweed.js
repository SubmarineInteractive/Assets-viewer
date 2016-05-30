export default {
  group: {
    numberSmallPlants: 60,
    numberBigPlants: 25
  },
  mesh: {
    randomPosition: {
      min: -200,
      max: 200
    },
    smallPlants: {
      scale: {
        min: 0.4,
        max: 0.7
      }
    },
    bigPlants: {
      scale: {
        min: 0.7,
        max: 1
      }
    }
  },
  material: {
    uniforms: {
      luminanceSteps: {
        type: 'i',
        value: 2.0
      },
    },
    smallPlants: {
      uniforms: {
        waveBendAmount: {
          type: 'f',
          value: 6.0,
          range: [ 0, 100 ]
        }
      }
    }
  }
};