<template>
  <div>
    <FilterApp :items="items" />
  </div>
</template>

<script>
import items from '../data/ttanatori'
import FilterApp from '~/components/filter'

export default {
  name: 'Index',
  components: { FilterApp },
  data() {
    return {
      items,
    }
  },
  computed: {},
  mounted() {},
  destroyed() {},
  methods: {},
}
</script>
