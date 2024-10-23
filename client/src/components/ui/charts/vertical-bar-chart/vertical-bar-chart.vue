<template>
  <div :class="$style.component">
    <svg>
    </svg>
  </div>
</template>

<script lang="ts">
// Packages
import { Dictionary } from '@/types';
import { BaseType } from 'd3';
import * as d3 from 'd3';
import Vue from 'vue';

// https://observablehq.com/@d3/stacked-horizontal-bar-chart/2

// https://blog.logrocket.com/data-visualization-vue-js-d3/

// https://observablehq.com/@d3/calendar/2
// https://observablehq.com/@d3/multi-line-chart/2
// https://observablehq.com/@d3/hexbin-map

// https://observablehq.observablehq.cloud/framework-example-us-dams/

/**
 * Vertical bar chart type component.
 */
export default Vue.extend({
  name: 'vertical-bar-chart',

  props: {
    /**
     * Key of the domain in each record.
     */
    domain: {
      type: String,
      default: '',
    },

    /**
     * Type of data of domain.
     */
    domainType: {
      type: String,
      default: 'number',
    },

    /**
     * Data to be displayed.
     *
     * @type {Dictionary<any>[]}
     */
    data: {
      type: Array,
      default: () => ([] as Dictionary<any>[]),
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
     * Type of data of range.
     */
    rangeType: {
      type: String,
      default: 'number',
    },

    stack: {
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

  data: () => ({
    /**
     * SVG component.
     */
    svg: null as d3.Selection<BaseType, unknown, HTMLElement, any> | null,

    /**
     * G component.
     */
    g: null as d3.Selection<SVGGElement, unknown, HTMLElement, any> | null,
  }),

  computed: {
  },

  /**
   * Run when component is mounted.
   */
  mounted() {
    this._renderChart();
  },

  methods: {
    // /**
    //  * Formats a given value.
    //  *
    //  * @param {any} value Value to be formatted.
    //  * @returns {string} Value formatted.
    //  */
    // _formatValue(value: any): string {
    //   return Number.isNaN(value) ? 'N/A' : value.toLocaleString('en');
    // },

    // /**
    //  * Generates chart colors.
    //  *
    //  * @param {d3.Stack<any, Dictionary<number>, string>} series Chart series.
    //  */
    // _genColors(series: d3.Stack<any, Dictionary<number>, string>): d3.ScaleOrdinal<string, unknown, string> {
    //   return d3.scaleOrdinal()
    //     .domain(d3.union(this.data.map((item: unknown): string => (typeof item === 'object' ? `${(item as Dictionary<any>)[this.stack]}` : 'default'))))
    //     .range(d3.schemeSpectral[series.length])
    //     .unknown('#ccc');
    // },

    // /**
    //  * Generates the domain the chart.
    //  */
    // _genDomain(): d3.ScaleTime<number, number, never> | d3.ScaleLinear<number, number, never> {
    //   if (this.domainType === 'date') {
    //     const parseTime = d3.timeParse('%d-%b-%y');

    //     return d3.scaleTime()
    //       .domain(d3.extent(
    //         this.data as Dictionary<any>[],
    //         (data: Dictionary<any>): Date => (parseTime(data[this.domain] as string) as Date),
    //       ) as [Date, Date])
    //       .rangeRound([
    //         this.height,
    //         0,
    //       ]);
    //   }

    //   return d3.scaleLinear()
    //     .domain(d3.extent(
    //       this.data as Dictionary<any>[],
    //       (data: Dictionary<any>): number => ((data[this.domain] as number)),
    //     ) as [number, number])
    //     .rangeRound([
    //       this.height,
    //       0,
    //     ]);
    // },

    // /**
    //  * Generates the g component of an svg.
    //  *
    //  * @param {d3.Selection<BaseType, unknown, HTMLElement, any>} svg SVG component.
    //  */
    // _genG(svg: d3.Selection<BaseType, unknown, HTMLElement, any>): d3.Selection<SVGGElement, unknown, HTMLElement, any> {
    //   return svg.append('g');
    // },

    // /**
    //  * Generates the range the chart.
    //  */
    // _genRange() {
    //   if (this.rangeType === 'date') {
    //     const parseTime = d3.timeParse('%d-%b-%y');

    //     return d3.scaleTime()
    //       .domain(d3.extent(
    //         this.data as Dictionary<any>[],
    //         (data: Dictionary<any>): Date => (parseTime(data[this.range] as string) as Date),
    //       ) as [Date, Date])
    //       .rangeRound([
    //         0,
    //         this.width,
    //       ]);
    //   }

    //   return d3.scaleLinear()
    //     .domain(d3.extent(
    //       this.data as Dictionary<any>[],
    //       (data: Dictionary<any>): number => ((data[this.range] as number)),
    //     ) as [number, number])
    //     .rangeRound([
    //       0,
    //       this.width,
    //     ]);
    // },

    // /**
    //  * Generates item series.
    //  */
    // _genSeries(): d3.Stack<any, Dictionary<number>, string> {
    //   const series = d3.stack()
    //     .keys(d3.union(this.data.map((item: unknown): string => (typeof item === 'object' ? `${(item as Dictionary<any>)[this.stack]}` : 'default'))))
    //     .value((data, key) => (data[this.range]));

    //   (d3.index(
    //     this.data,
    //     (data: unknown): string => (typeof data === 'object' ? (data as Dictionary<any>)[this.range] : data),
    //     (data: unknown): string => (typeof data === 'object' ? (data as Dictionary<any>)[this.stack] : data),
    //   ));

    //   return series;
    // },

    // /**
    //  * Generates the SVG component of the chart.
    //  */
    // _genSVG(): d3.Selection<BaseType, unknown, HTMLElement, any> {
    //   return d3.select('svg')
    //     .attr(
    //       'width',
    //       this.width,
    //     )
    //     .attr(
    //       'height',
    //       this.height,
    //     )
    //     .attr(
    //       'viewBox',
    //       [
    //         0,
    //         0,
    //         this.width,
    //         this.height,
    //       ],
    //     )
    //     .attr(
    //       'style',
    //       'max-width: 100%; height: auto;',
    //     );
    // },

    /**
     * Render the chart.
     */
    _renderChart(): void {
      // this.svg = this._genSVG()
      //   .append('g')
      //   .selectAll()
      //   .data(this._genSeries())
      //   .join('g');
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
