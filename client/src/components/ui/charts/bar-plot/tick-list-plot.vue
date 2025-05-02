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
  },

  methods: {

  },
});
</script>

<style lang="scss" module>
</style>
