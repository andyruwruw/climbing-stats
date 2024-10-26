<template>
  <div>
    <horizontal-bar-plot
      :data="data"
      :height="data.length * 12"
      :id="id"
      :sortOrder="V_SCALE_SIMPLE_GRADES"
      bin="status"
      domain="grade"
      domainLabel="Grade"
      range="ticks"
      rangeLabel="Unique Boulder Sends"
      sort="grade"
      title="Boulder Sends by Grade" />
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import { getSimplifiedBoulderTicksByGrade } from '../../../../helpers/ticks';
import { V_SCALE_SIMPLE_GRADES } from '../../../../config/grades';
import HorizontalBarPlot from '../../../../components/ui/charts/bar-plot/horizontal-bar-plot.vue';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'profile-page-boulder-pyramid',

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

  data: () => ({
    V_SCALE_SIMPLE_GRADES,
  }),

  computed: {
    /**
     * Data for the bar chart.
     */
    data(): Dictionary<any>[] {
      return getSimplifiedBoulderTicksByGrade(this.ticks);
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
