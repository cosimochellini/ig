<template>
  <div>
    <v-card
      v-if="filter.running"
      :style="cardStyle"
      elevation="24"
      max-width="600"
      :color="filter.ended ? 'green' : 'white'"
      class="mx-auto card"
    >
      <v-card-text>
        <p class="display-1 text--primary">
          {{ filter.currentSelection }}
        </p>
      </v-card-text>
    </v-card>
    <div class="ma-auto text-center py-4">
      <canvas></canvas>
      <v-btn color="green" min-width="200px" @click="startFilter(true)">
        {{ filter.ended ? 'Again' : 'Start' }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import hub from '~/services/hubService'
import runCanvas from '~/services/runner'

const persons = ['tocchino', 'entità', 'dieghino', 'gg maciproci']

const randomItem = (items = []) =>
  items[Math.floor(Math.random() * items.length)]

const angle = ([cy, cx] = [], [ey, ex] = []) => {
  const dy = ey - cy
  const dx = ex - cx
  let theta = Math.atan2(dy, dx) // range (-PI, PI]
  theta *= 180 / Math.PI // rads to degs, range (-180, 180]
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta
}

const average = ([cy, cx] = [], [ey, ex] = []) => [(cy + ey) / 2, (cx + ex) / 2]

export default {
  name: 'Face',
  data() {
    return {
      face: {
        eyes: [],
        depth: 0,
      },
      filter: {
        ended: false,
        endTime: null,
        running: false,
        currentSelection: '',
      },
    }
  },
  computed: {
    cardStyle() {
      const [eye1, eye2] = this.face.eyes
      if (!eye1) return {}
      const [x, y] = average(eye1, eye2)

      return {
        left: window.innerWidth / 2 + (100 - y) + 'px',
        top: x + -this.face.depth * 2 + 'px',
        transform: `rotate(${-angle(eye1, eye2)}deg)`,
      }
    },
  },
  mounted() {
    hub.$on('update-face', (face) => (this.face = face))
    this.$nextTick(runCanvas)
  },
  methods: {
    startFilter(initial = false) {
      this.filter.running = true
      const now = new Date()
      if (initial) {
        const endTime = new Date()
        endTime.setSeconds(now.getSeconds() + 5)

        this.filter.endTime = endTime
        this.filter.ended = false
      }

      if (now.getTime() > this.filter.endTime.getTime()) {
        this.filter.ended = true
        return
      }

      this.filter.currentSelection = randomItem(persons)
      setTimeout(this.startFilter, 80)
    },
  },
}
</script>

<style scoped>
.card {
  position: absolute;
  z-index: 999;
}

canvas {
  z-index: 1;
  border-radius: 15px;
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
}
</style>
