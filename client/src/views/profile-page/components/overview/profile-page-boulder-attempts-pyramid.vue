<template>
  <div>
    <tick-list-plot
      :data="data"
      :height="data.length * 12"
      :id="id"
      title="Boulder Attempts by Grade" />
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import TickListPlot from '../../../../components/ui/charts/bar-plot/tick-list-plot.vue';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'profile-page-boulder-attempts-pyramid',

  components: {
    TickListPlot,
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
      return this.ticks;
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
