<template>
  <div>
    <horizontal-bar-plot
      :data="data"
      :height="data.length * 12"
      :id="id"
      :sort="0"
      bin="status"
      domain="grade"
      domainLabel="Grade"
      range="attempts"
      rangeLabel="Unique Boulder Attempts"
      title="Boulder Attempts by Grade" />
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import { getSimplifiedBoulderAttemptsByGrade } from '../../../../helpers/ticks';
import HorizontalBarPlot from '../../../../components/ui/charts/bar-plot/horizontal-bar-plot.vue';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'profile-page-boulder-attempts-pyramid',

  components: {
    HorizontalBarPlot,
  },

  props: {
    /**
     * Component ID.
     *
     * @type {number | string}
     */
    id: {
      type: String,
      default: uuidv4(),
    },

    /**
     * Tick summation data.
     */
    ticks: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    /**
     * Data for the bar chart.
     */
    data(): Dictionary<any>[] {
      return getSimplifiedBoulderAttemptsByGrade(this.ticks);
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  gap: 12px;
}

.display-name {
  font-size: 24px;
  color: white;
}
</style>
