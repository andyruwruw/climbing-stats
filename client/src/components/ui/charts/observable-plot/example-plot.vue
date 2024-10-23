<template>
  <div :class="$style.component">
    <observable-plot :options="options" />
  </div>
</template>

<script lang="ts">
// Packages
import * as Plot from '@observablehq/plot';
import Vue from 'vue';

// Local Imports
import ObservablePlot from './observable-plot.vue';

export default Vue.extend({
  name: 'example-plot',

  components: {
    ObservablePlot,
  },

  computed: {
    options() {
      const dots = (new Array(100).fill({})).map((value: any) => ({
        domain: Math.random(),
        range: Math.random(),
      }));

      return {
        marks: [
          Plot.dot(
            dots,
            {
              x: 'domain',
              y: 'range',
            },
          ),
        ],
      };
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
