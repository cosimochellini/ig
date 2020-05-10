<template>
  <v-dialog v-model="open">
    <v-card class="mx-auto" :color="profile.elite ? 'amber darken-2' : 'white'">
      <v-img height="250" :src="profile.computedImage"></v-img>

      <v-card-title>{{ profile.computedNickname }}</v-card-title>
      <v-card-subtitle v-if="profile.elite">
        <p class="mb-0">
          ttanatore elitario
          <v-icon>
            mdi-police-badge
          </v-icon>
        </p>
      </v-card-subtitle>

      <v-card-text>
        <div class="my-4 subtitle-1">
          magari una serie di proprietà
        </div>

        <div>
          {{ profile.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Weekly presences</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="p in profile.presences">{{p}}</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text>
          Bottone che potrebbe essere utile
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Profile',
  data: () => ({
    profile: {},
    open: false,
  }),
  methods: {
    openDialog(profile) {
      this.profile = profile
      this.open = true
    },
  },
}
</script>

<style scoped></style>
