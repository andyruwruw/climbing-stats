<template>
  <div :class="$style.component">
    <profile-page-boulder-pyramid :data="pyramid" />

    <!-- <profile-page-boulder-attempts-pyramid :ticks="tickSummations" /> -->
  </div>
</template>

<script lang="ts">
// Packages;
import Vue from 'vue';

// Local Imports
// import ProfilePageBoulderAttemptsPyramid from './profile-page-boulder-attempts-pyramid.vue';
import ProfilePageBoulderPyramid from './profile-page-boulder-pyramid.vue';

// Types
import { TickPyramidEntry } from '../../../../types/attempts';

/**
 * Basic overview for a user's profile.
 */
export default Vue.extend({
  name: 'profile-overview',

  components: {
    // ProfilePageBoulderAttemptsPyramid,
    ProfilePageBoulderPyramid,
  },

  props: {
    /**
     * User's tick list pyramid.
     */
    pyramid: {
      type: Array,
      default: () => ([] as TickPyramidEntry[]),
    },

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
