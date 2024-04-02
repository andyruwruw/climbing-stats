<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'route-page',

  data: () => ({
    id: '',
  }),

  created() {
    this.id = this.$route.params.id;
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
