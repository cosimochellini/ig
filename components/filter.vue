<template>
  <div>
    <v-card
      v-show="process.running || process.ended"
      :style="cardStyle"
      elevation="24"
      :color="process.ended ? card.color : 'white'"
      class="mx-auto card"
    >
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-img :lazy-src="card.img" :src="card.img"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ card.text }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-show="process.ended">
          <v-btn icon @click="openDialog">
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <div class="ma-auto text-center py-4">
      <canvas></canvas>
      <v-btn color="green" min-width="200px" @click="startFilter(true)">
        {{ process.ended ? 'Again' : 'Start' }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import hub from '~/services/hubService'
import runCanvas from '~/services/runner'
import { angle, average, randomItem } from '~/services/math.service'

export default {
  name: 'FilterApp',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      face: {
        eyes: [],
        depth: 0,
      },
      process: {
        ended: false,
        endTime: null,
        running: false,
      },
      card: {
        text: '',
        color: 'white',
        img: '',
        fullProfile: null,
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
    this.$nextTick(() => runCanvas(false))
  },
  destroyed() {},
  methods: {
    startFilter(initial = false) {
      const now = new Date()

      if (initial) {
        const endTime = new Date()
        endTime.setSeconds(now.getSeconds() + 5)
        this.process.ended = false
        this.process.running = true
        this.process.endTime = endTime
      }

      if (now.getTime() > this.process.endTime.getTime()) {
        const finalItem = randomItem(this.items)
        this.card.fullProfile = finalItem
        this.card.text = finalItem.computedNickname
        this.card.img = finalItem.computedImage
        this.process.ended = true
        this.process.running = false
        return
      }

      const currentItem = randomItem(this.items)
      this.card.text = currentItem.computedNickname
      this.card.img = currentItem.defaultImage

      setTimeout(this.startFilter, 100)
    },
    openDialog() {
      this.process.ended = false
      this.$emit('info', this.card.fullProfile)
    },
  },
}
</script>

<style>
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
