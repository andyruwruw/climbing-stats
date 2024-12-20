<template>
  <div :id="`chart-${id}`">
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import * as d3 from 'd3';
import Vue from 'vue';

/**
 * Vertical bar plot.
 */
export default Vue.extend({
  name: 'bar-plot',

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

  data: () => ({
    /**
     * Chart SVG element.
     */
    svg: null as (null | d3.Selection<SVGGElement, unknown, HTMLElement, any>),
  }),

  computed: {
  },

  mounted() {
    this._createSVG();
  },

  methods: {
    /**
     * Creates the SVG element.
     */
    _createSVG() {
      this.svg = d3.select(`chart-${this.id}`)
        .append('svg')
        .attr(
          'width',
          this.width,
        )
        .attr(
          'height',
          this.height,
        )
        .append('g')
        .attr(
          'transform',
          'translate(0,0)',
        );
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
