<template>
  <v-container fluid>
    <v-btn @click="callback" color="green" block text> GO</v-btn>
    <v-card
      v-if="face.depth>0"
      :style="cardStyle"
      elevation="24"
      max-width="600"
      class="mx-auto card"
    >
      <v-card-text>
        <p class="display-1 text--primary">
          TESTO
        </p>
      </v-card-text>
    </v-card>
    <canvas width=640 height=480></canvas>
  </v-container>
</template>

<script>
  import hub from '~/services/hubService'
  import callback from '~/services/runner'

  const angle = ([cy, cx] = [], [ey, ex] = []) => {
    const dy = ey - cy
    const dx = ex - cx
    let theta = Math.atan2(dy, dx) // range (-PI, PI]
    theta *= 180 / Math.PI // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta
  }

  const average = ([cy, cx] = [], [ey, ex] = []) => [(cy + ey) / 2, (cx + ex) / 2]

  export default {
    name: 'face',
    data() {
      return {
        face: {
          eyes: [],
          depth: 0
        }
      }
    },
    mounted() {
      hub.$on('update-face', face => this.face = face)
    },
    methods: {
      callback
    },
    computed: {
      cardStyle() {
        const [eye1, eye2] = this.face.eyes
        if (!eye1) return {}
        const [x, y] = average(eye1, eye2)

        return {
          left: (window.innerWidth / 2) - y + 'px',
          top: (x + -(this.face.depth)) + 'px',
          transform: `rotate(${-angle(eye1, eye2)}deg)`
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    position: absolute;
    z-index: 999;
  }

  canvas {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    z-index: 1;
  }
</style>
