<template>
  <body>
  <hr>
  <section>
    <h3>Using pico.js and lploc.js for real-time localization of eye pupils</h3>
    <p>Click the button below and allow the page to access your webcam.</p>
    <p><b>All the processing is done on the client side, i.e., without sending images to a server.</b></p>
    <p>More information about the algotihm is available <a href="../">here</a>.</p>
  </section>
  <hr>
  <p>
    <input type="button" value="Start webcam feed" @click="callback">
  </p>
  <div>
    <v-card
      class="mx-auto card"
      max-width="344"
      :style="cardStyle"
      elevation="24"
    >
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary">
          be•nev•o•lent
        </p>
        <p>adjective</p>
        <div class="text--primary">
          well meaning and kindly.<br>
          "a benevolent smile"
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
    <canvas width=640 height=480></canvas>
  </div>
  </body>
</template>

<script>
  import callback from '../services/runner'
  import hub from '~/services/hubService'

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
          left: y + 'px',
          top: (x + -(this.face.depth)) + 'px',
          transform: `rotate(${angle(eye1, eye2)}deg)`
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    position: absolute;
  }
</style>
