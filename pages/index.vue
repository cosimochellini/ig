<template>
  <div>
    <FilterApp :items="items" @info="openModal" />
    <Profile ref="profile" />
  </div>
</template>

<script>
import items from '../data/ttanatori'
import Profile from '~/components/profile'
import FilterApp from '~/components/filter'

export default {
  name: 'Index',
  components: { Profile, FilterApp },
  data() {
    return {
      items,
    }
  },
  computed: {},
  mounted() {},
  destroyed() {},
  methods: {
    openModal(user) {
      this.$refs.profile.openDialog(user)
    },
  },
}
</script>
