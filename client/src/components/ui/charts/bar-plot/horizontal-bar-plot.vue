<template>
  <observable-plot
    :id="id"
    :options="options"
    :title="title" />
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import * as Plot from '@observablehq/plot';
import Vue from 'vue';

// Local Imports
import { SIMULAR_CATEGORY_COLORS } from '../../../helpers/colors';
import ObservablePlot from '../observable-plot/observable-plot.vue';

/**
 * Vertical bar plot.
 */
export default Vue.extend({
  name: 'horizontal-bar-plot',

  components: {
    ObservablePlot,
  },

  props: {
    /**
     * How to bin items.
     */
    bin: {
      type: String,
      default: '',
    },

    /**
     * Color domain.
     */
    colorDomain: {
      type: Array,
      default: () => ([]),
    },

    /**
     * Color range.
     */
    colorRange: {
      type: Array,
      default: SIMULAR_CATEGORY_COLORS,
    },

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
     * Label of the domain.
     */
    domainLabel: {
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
     * Whether to show a legend.
     *
     * @type {boolean}
     */
    legend: {
      type: Boolean,
      default: true,
    },

    /**
     * Key of the range in each record.
     *
     * @type {string}
     */
    range: {
      type: String,
      default: '',
    },

    /**
     * Label of the range.
     */
    rangeLabel: {
      type: String,
      default: '',
    },

    /**
     * Sort method.
     *
     * @type {number}
     */
    sort: {
      type: Number,
      default: 0,
    },

    /**
     * Whether to show tooltips.
     *
     * @type {boolean}
     */
    tips: {
      type: Boolean,
      default: true,
    },

    /**
     * Graph title.
     *
     * @type {string}
     */
    title: {
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
     * Color of the plot.
     */
    colorOptions(): Plot.ScaleOptions | undefined {
      const options = { legend: this.legend } as Plot.ScaleOptions;

      if (this.colorRange) {
        options.range = this.colorRange;
      }
      if (this.colorDomain && this.colorDomain.length) {
        options.domain = this.colorDomain;
      }

      return options;
    },

    /**
     * Sorting parsing.
     */
    sortOptions(): Plot.SortOrder | Plot.ChannelDomainSort | undefined {
      if (this.sort === 1) {
        return { y: 'x' };
      }
      if (this.sort === -1) {
        return { y: '-x' };
      }
      return undefined;
    },

    /**
     * Generates plot marks.
     */
    marks(): Plot.Markish[] | undefined {
      if (this.bin) {
        const options = {
          y: this.domain,
          x: this.range,
          fill: this.bin,
          sort: this.sortOptions,
          tip: this.tips,
        } as Plot.BarXOptions | undefined;

        return [
          Plot.barX(
            this.data,
            options,
          ),
        ];
      }

      const options = {
        x: this.range,
        y: this.domain,
        fill: '#7DBD43',
        tip: this.tips,
      } as Plot.BarXOptions | undefined;

      return [
        Plot.barX(
          this.data,
          options,
        ),
      ];
    },

    /**
     * Generates plot options.
     */
    options(): Plot.PlotOptions | undefined {
      return {
        color: this.colorOptions,
        height: this.height,
        marks: this.marks,
        width: this.width,
        x: this.x,
        y: this.y,
      };
    },

    /**
     * X axis options.
     */
    x(): Plot.ScaleOptions | undefined {
      return {
        axis: 'top',
        label: this.rangeLabel ? this.rangeLabel : this.range,
      };
    },

    /**
     * Y axis options.
     */
    y(): Plot.ScaleOptions | undefined {
      return {
        label: this.domainLabel ? this.domainLabel : this.domain,
      };
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
