<template>
  <div :class="$style.component">
    <numerical-statistic
      label="Started"
      :value="sessions ? sessions.start : 0"
      type="date"
      :alt-value="sessions ? sessions.start : 0"
      alt-value-type="days-since"/>

    <numerical-statistic
      label="Hours"
      :value="sessions ? Math.floor(sessions.hours) : 0"
      type="number"/>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import NumericalStatistic from '../../../components/ui/dashboard/statistics/numerical-statistic.vue';

export default Vue.extend({
  name: 'profile-page-main-statistics',

  components: {
    NumericalStatistic,
  },

  props: {
    /**
     * Session summations.
     */
    sessions: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Tick summations.
     */
    ticks: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {

  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  gap: 16px;
}
</style>
