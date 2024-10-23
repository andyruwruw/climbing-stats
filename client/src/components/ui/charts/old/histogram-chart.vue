<template>
  <div :class="$style.component">
    <canvas
      class="histogram__canvas"
      :id="canvasId" />
  </div>
</template>

<script lang="ts">
// Packages
import { Chart } from 'chart.js/auto';
import Vue from 'vue';

// Local Imports
import { ChartConfig } from '../../../helpers/charts/config';
import { ChartData } from '../../../helpers/charts/data';
import { ChartOptions } from '../../../helpers/charts/options';
import { ChartDataset } from '../../../helpers/charts/dataset';

// Types
import {
  DataLabelType,
  RawDataset,
} from '../../../../types/charts';
import { RGBA } from '../../../../types/css';

/**
 * Histogram chart type component.
 */
export default Vue.extend({
  name: 'histogram-chart',

  props: {
    /**
     * Applies specified color to the control.
     * It can be the name of material color (for example `success` or `purple`)
     * or css color (`#033` or `rgba(255, 0, 0, 0.5)`).
     *
     * @type {string[]}
     */
    color: {
      type: Object,
      default: null,
    },

    /**
     * Applies specified color to the control.
     * It can be the name of material color (for example `success` or `purple`)
     * or css color (`#033` or `rgba(255, 0, 0, 0.5)`).
     *
     * @type {string[]}
     */
    colors: {
      type: Array,
      default: () => [],
    },

    /**
     * Data to be displayed.
     *
     * @type {RawDataset[]}
     */
    datasets: {
      type: Array,
      default: () => ([] as RawDataset[]),
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
     * Label type.
     *
     * @type {DataLabelType}
     */
    labels: {
      type: String,
      default: 'percents',
    },
  },

  data: () => ({
    /**
     * HTML canvas element.
     */
    canvas: null as HTMLCanvasElement | null,

    /**
     * Canvas rendering context.
     */
    context: null as CanvasRenderingContext2D | null,

    /**
     * Chart.js chart.
     */
    chart: null as Chart | null,

    /**
     * Provided ID.
     */
    providedId: '' as string,
  }),

  computed: {
    /**
     * Canvas element ID.
     *
     * @returns {string} Element ID.
     */
    canvasId(): string {
      return `histogram-${this._resolveId()}`;
    },
  },

  /**
   * Run when component is mounted.
   */
  mounted() {
    this._renderChart();
  },

  methods: {
    /**
     * Creates datasets.
     *
     * @returns {ChartDataset[]} Datasets.
     */
    _createDatasets(): ChartDataset[] {
      const datasets = [] as ChartDataset[];

      if (!this.canvas) {
        return datasets;
      }

      for (let i = 0; i < this.datasets.length; i += 1) {
        const dataset = new ChartDataset(
          this.canvas as HTMLCanvasElement,
          this.datasets[i] as RawDataset,
        );

        if (this.colors && this.colors.length) {
          dataset.setColor(this.colors[this.colors.length > i ? i : 0] as RGBA);
        }
        if (this.color) {
          dataset.setColor(this.color as RGBA);
        }

        datasets.push(dataset);
      }

      return datasets;
    },

    /**
     * Creates options.
     *
     * @param {ChartData} data Chart data.
     * @returns {ChartOptions} Options.
     */
    _createOptions(data: ChartData): ChartOptions {
      const options = new ChartOptions();

      if (this.labels === 'percents') {
        options.setMaxX(100);
        options.setMinX(0);
        options.setTickXMaxLimit(11);
      }

      return options;
    },

    /**
     * Render the chart.
     */
    _renderChart(): void {
      this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;

      const datasets = this._createDatasets();
      const data = new ChartData(
        datasets,
        this.labels as DataLabelType,
      );
      const options = this._createOptions(data);
      const config = new ChartConfig(
        'line',
        data,
        options,
      );

      console.log(config.export());

      this.chart = new Chart(
        this.context,
        config.export(),
      );
    },

    /**
     * Provides ID or makes an ID.
     *
     * @returns {string} Component ID.
     */
    _resolveId(): string {
      if (!this.providedId) {
        if (this.id && this.id === 0) {
          this.providedId = `${this.id}`;
        } else {
          this.providedId = Math.random().toString(36).substring(7);
        }
      }
      return `${this.providedId}`;
    },

    // /**
    //  * Generates the canvas used for the chart.
    //  *
    //  * @returns {VNode[]}
    //  */
    // _genChartCanvas(): VNode[] {
    //   const data = {
    //     class: 'histogram__canvas',
    //     attrs: {
    //       id: this.canvasId,
    //     },
    //   } as VNodeData;

    //   return [this.$createElement(
    //     'canvas',
    //     data,
    //   )];
    // },
  },

  // /**
  //  * Renders component and returns VNode.
  //  *
  //  * @param {CreateElement} createElement Vue createElement function
  //  * @returns {VNode} VNode of component
  //  */
  // render(createElement: CreateElement): VNode {
  //   const data = {
  //     class: 'histogram',
  //   } as VNodeData;

  //   return createElement(
  //     'div',
  //     data,
  //     this._genChartCanvas(),
  //   );
  // },
});
</script>

<style lang="scss" module>
.component {
}

.histogram__canvas {
}

</style>
