<template>
  <dashboard-card>
    <span
      v-if="title.length"
      :class="$style.title">
      {{ title }}
    </span>

    <div
      :class="$style.component"
      :id="id" />
  </dashboard-card>
</template>

<script lang="ts">
// Packages
import * as Plot from '@observablehq/plot';
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import DashboardCard from '../../dashboard/dashboard-card/dashboard-card.vue';

/**
 * Wrapper around Observable plot.
 */
export default Vue.extend({
  name: 'observable-plot',

  components: {
    DashboardCard,
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
     * Observable plot options.
     */
    options: {
      type: Object,
      default: undefined,
    },

    /**
     * Graph title.
     */
    title: {
      type: String,
      default: '',
    },
  },

  /**
   * Runs when component is mounted.
   */
  mounted(): void {
    const container = document.getElementById(this.id);

    if (container) {
      if (container.children.length) {
        container.append(Plot.plot(this.options));
      } else {
        container.append(Plot.plot(this.options));
      }
    }
  },

  watch: {
    /**
     * Update on option changes.
     */
    options(): void {
      const container = document.getElementById(this.id);

      if (container) {
        container.append(Plot.plot(this.options));
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  color: white;
}

.title {
  color: white;
}
</style>
