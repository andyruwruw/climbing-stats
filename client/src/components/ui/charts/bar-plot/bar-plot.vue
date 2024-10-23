<template>
  <observable-plot
    :id="id"
    :options="options" />
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import * as Plot from '@observablehq/plot';
import Vue from 'vue';

// Local Imports
import ObservablePlot from '../observable-plot/observable-plot.vue';

/**
 * Vertical bar plot.
 */
export default Vue.extend({
  name: 'bar-plot',

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
      type: String,
      default: uuidv4(),
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

    /**
     * How to bin items.
     */
    bin: {
      type: String,
      default: '',
    },
  },

  computed: {
    /**
     * Color of the plot.
     */
    color(): Plot.ScaleOptions | undefined {
      return {
        domain: ['Sent', 'Flash'],
        range: ['yellow', 'blue'],
      };
    },

    /**
     * Generates plot marks.
     */
    marks(): Plot.Markish[] | undefined {
      if (this.bin) {
        const options = {
          x: this.domain,
          fill: this.bin,
        };

        const binOptions = { y: 'count' } as Plot.BinOutputs;

        const binned = Plot.binX(
          binOptions,
          options,
        );

        return [
          Plot.barY(
            this.data,
            binned,
          ),
        ];
      }

      return [
        Plot.barY(
          this.data,
          {
            x: this.domain,
            y: this.range,
            fill: '#7DBD43',
          },
        ),
      ];
    },

    /**
     * Generates plot options.
     */
    options(): Plot.PlotOptions | undefined {
      return {
        color: this.color,
        height: this.height,
        marks: this.marks,
        width: this.width,
      };
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
