<template>
  <div>
    <h2>History</h2>
    <v-list three-line>
      <v-divider></v-divider>

      <template v-for="(item, index) in items">
        <v-list-item :key="item.computedNickname">
          <v-list-item-avatar>
            <v-img
              :src="item.defaultImage"
              :lazy-src="item.defaultImage"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="text-capitalize"
              v-html="item.defaultNickname"
            ></v-list-item-title>
            <v-list-item-subtitle
              v-html="item.description"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" :inset="item.inset"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
  import { getHistory } from '~/services/history.service'

  export default {
    name: 'History',
    data() {
      return {
        items: []
      }
    },
    watch: {
      $route: {
        handler() {
          getHistory().then((h) => (this.items = h))
        },
        immediate: true
      }
    }
  }
</script>

<style scoped></style>
