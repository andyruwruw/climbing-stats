<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages;
import Vue from 'vue';

export default Vue.extend({
  name: 'profile-locations',

  props: {
    /**
     * Tick stats.
     */
    locations: {
      type: Array,
      default: () => ([]),
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
