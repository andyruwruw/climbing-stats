<template>
  <div :id="`plot-${id}`">
    <p
      v-for="(entry, index) in simplifiedData"
      :key="`${id}-${index}`">
      {{ entry }}
    </p>
  </div>
</template>

<script lang="ts">
// Packages
import {
  NumberValue,
  Series,
  SeriesPoint,
  ValueFn,
} from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex';
import * as d3 from 'd3';
import Vue from 'vue';

// Local Imports
import { simplifyTickList } from '../../../../helpers/grades';

// Types
import {
  ClimbingActivities,
  GradingSystem,
} from '../../../../types/climbs';
import { TickPyramidEntry } from '../../../../types/attempts';
import { TickPlotEntry } from '../../../../types/charts';

/**
 * Displays a user's tick list as a bar pyramid.
 */
export default Vue.extend({
  name: 'tick-list-plot',

  props: {
    /**
     * Activities to display.
     *
     * @type {ClimbingActivities[]}
     */
    activities: {
      type: Array,
      default: (): ClimbingActivities[] => ([]),
    },

    /**
     * Grading system to use.
     *
     * @type {GradingSystem}
     */
    gradingSystem: {
      type: String,
      default: 'v-scale',
    },

    /**
     * Component height.
     *
     * @type {number}
     */
    height: {
      type: Number,
      default: 100,
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
     * Component margin across the bottom in pixels.
     *
     * @type {number}
     */
    marginBottom: {
      type: Number,
      default: 0,
    },

    /**
     * Component margin across the left in pixels.
     *
     * @type {number}
     */
    marginLeft: {
      type: Number,
      default: 30,
    },

    /**
     * Component margin across the right in pixels.
     *
     * @type {number}
     */
    marginRight: {
      type: Number,
      default: 10,
    },

    /**
     * Component margin across the top in pixels.
     *
     * @type {number}
     */
    marginTop: {
      type: Number,
      default: 30,
    },

    /**
     * List of ticks in order.
     *
     * @type {TickPyramidEntry[]}
     */
    data: {
      type: Array,
      default: () => [],
    },

    /**
     * Component width.
     *
     * @type {number}
     */
    width: {
      type: Number,
      default: 500,
    },
  },

  data: () => ({
    /**
     * SVG element.
     */
    svg: null as d3.Selection<SVGSVGElement, unknown, HTMLElement, any> | null,
  }),

  computed: {
    ...mapGetters('settings', [
      'boulderGrades',
      'routeGrades',
    ]),

    /**
     * Tick list simplified by grade.
     */
    simplifiedData(): TickPlotEntry[] {
      return simplifyTickList(
        this.data as TickPyramidEntry[],
        (this.gradingSystem || this.boulderGrades) as GradingSystem,
        (this.activities || []) as ClimbingActivities[],
      );
    },

    subgroups(): string[] {
      return this.simplifiedData.map((entry) => (entry.grade)) as string[];
    },

    groups(): string[] {
      return [
        'send',
        'flash',
      ];
    },
  },

  mounted() {
    this.svg = d3.select(`#plot-${this.id}`)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    console.log(this.subgroups);

    const x = d3.scaleBand()
      .domain(this.subgroups) // descending frequency
      .range([this.marginLeft, this.width - this.marginRight])
      .padding(0.1);

    const color = d3.scaleOrdinal()
      .domain(this.groups)
      .range(['#e41a1c', '#377eb8', '#4daf4a']);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.simplifiedData, (d) => d.send)] as Iterable<NumberValue>)
      .range([this.height - this.marginBottom, this.marginTop]);

    const stackedData = d3.stack()
      .keys(this.groups)(this.simplifiedData as Iterable<{ [key: string]: number; }>);

    this.svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', ((d) => color(d.key)) as string | number | boolean | readonly (string | number)[] | ValueFn<SVGGElement, Series<{ [key: string]: number; }, string>, string | number | boolean | readonly (string | number)[] | null> | null)
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', ((d) => x(d.send)) as string | number | boolean | readonly (string | number)[] | ValueFn<SVGRectElement, SeriesPoint<{ [key: string]: number; }>, string | number | boolean | readonly (string | number)[] | null> | null)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
  },

  methods: {

  },
});
</script>

<style lang="scss" module>
</style>
