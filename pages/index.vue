<template>
  <div>
    <FilterApp :items="tanators" @info="openModal" />
    <Profile ref="profile" />
  </div>
</template>

<script>
import items from '../data/ttanatori'
import Profile from '~/components/profile'
import FilterApp from '~/components/filter'
import { Tanator } from '~/types/classes/Tanator'
import bind from '~/services/jsonFactory.service'

export default {
  name: 'Index',
  components: { Profile, FilterApp },
  data() {
    return {
      tanators: [],
    }
  },
  computed: {},
  mounted() {
    this.tanators = bind(items, Tanator)
  },
  destroyed() {},
  methods: {
    openModal(user) {
      this.$refs.profile.openDialog(user)
    },
  },
}
</script>
