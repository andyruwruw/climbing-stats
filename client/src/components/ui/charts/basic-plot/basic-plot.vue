<template>
  <observable-plot
    :id="id"
    :options="options" />
</template>

<script lang="ts">
// Packages
import * as Plot from '@observablehq/plot';
import Vue from 'vue';

// Local Imports
import ObservablePlot from '../observable-plot/observable-plot.vue';

/**
 * Vertical bar chart type component.
 */
export default Vue.extend({
  name: 'basic-plot',

  components: {
    ObservablePlot,
  },

  props: {
    /**
     * Data to be displayed.
     */
    data: {
      type: Array,
      default: (): any[] => ([] as any[]),
    },

    /**
     * Key of the domain in each record.
     */
    domain: {
      type: String,
      default: '',
    },

    /**
     * Height of the graph.
     *
     * @type {number}
     */
    height: {
      type: Number,
      default: 500,
    },

    /**
     * Component ID.
     *
     * @type {number | string}
     */
    id: {
      type: [Number, String],
      default: undefined,
    },

    /**
     * Key of the range in each record.
     */
    range: {
      type: String,
      default: '',
    },

    /**
     * Type of plot.
     */
    type: {
      type: String,
      default: '',
    },

    /**
     * Width of the graph.
     *
     * @type {number}
     */
    width: {
      type: Number,
      default: 800,
    },
  },

  computed: {
    /**
     * Generates plot marks.
     */
    marks(): Plot.Markish[] | undefined {
      return undefined;
    },

    /**
     * Generates plot options.
     */
    options(): Plot.PlotOptions | undefined {
      return {
        width: this.width,
        height: this.height,
        marks: this.marks,
      };
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
