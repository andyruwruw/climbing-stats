<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages;
import Vue from 'vue';

export default Vue.extend({
  name: 'profile-ticks',

  props: {
    /**
     * Tick stats.
     */
    ticks: {
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
