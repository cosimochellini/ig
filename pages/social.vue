<template>
  <div>
    <h2>Social</h2>
    <v-divider></v-divider>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Book your pano</v-card-title>

            <v-card-subtitle>Access and unlock a quantity of products to order online thanks to lattana.org
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text @click="redirect('https://lattana.org/')">Book now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline" v-text="item.title"></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src" :lazy-src="item.src"></v-img>
              </v-avatar>
            </div>
            <v-card-actions>
              <v-btn text @click="redirect(item.redirect)">{{item.text}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Social',
    data: () => ({
      items: [
        {
          color: '#1F7087',
          src: 'https://image.flaticon.com/icons/svg/174/174855.svg',
          title: 'Instagram',
          artist: 'Follow all the bullshit that is done at  gg\'s home and in the surrounding area',
          text: 'follow',
          redirect: 'https://www.instagram.com/lattana__/'
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Lattana plex',
          artist: 'Ellie Goulding'
        }
      ]
    }),
    methods: {
      redirect: url => window.open(url, '_blank')
    }
  }
</script>

<style scoped></style>
