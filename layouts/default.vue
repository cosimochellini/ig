<template>
  <v-app id="app" class="overflow-hidden">
    <v-content>
      <v-container>
        <nuxt keep-alive />
      </v-container>
    </v-content>
    <v-bottom-navigation
      v-model="currentPath"
      grow
      absolute
      color="blue darken-2"
      @input="goTo"
    >
      <v-btn value="/">
        <span>Filer</span>
        <v-icon>mdi-face</v-icon>
      </v-btn>

      <v-btn value="/history">
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
  watch: {
    currentPath() {
      this.goTo()
    },
  },
  methods: {
    goTo() {
      this.$router.push(this.currentPath)
    },
  },
}
</script>
