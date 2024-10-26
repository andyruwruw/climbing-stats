<template>
  <div :class="$style.component">
    <profile-page-boulder-pyramid :ticks="tickSummations" />

    <profile-page-boulder-attempts-pyramid :ticks="tickSummations" />
  </div>
</template>

<script lang="ts">
// Packages;
import Vue from 'vue';

// Local Imports
import ProfilePageBoulderAttemptsPyramid from './profile-page-boulder-attempts-pyramid.vue';
import ProfilePageBoulderPyramid from './profile-page-boulder-pyramid.vue';

export default Vue.extend({
  name: 'profile-overview',

  components: {
    ProfilePageBoulderAttemptsPyramid,
    ProfilePageBoulderPyramid,
  },

  props: {
    /**
     * Tick stats.
     */
    tickSummations: {
      type: Object,
      default: null,
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
