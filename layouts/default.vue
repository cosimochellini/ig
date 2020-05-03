<template>
  <v-app id="app" class="overflow-hidden">
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation
      v-model="currentPath"
      grow
      absolute
      color="blue darken-2"
      @input="goTo"
    >
      <v-btn value="recent">
        <span>Filer</span>
        <v-icon>mdi-face</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn value="/social">
        <span>Social</span>
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentPath: null,
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    },
  },
}
</script>
