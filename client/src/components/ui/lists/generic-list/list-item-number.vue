<template>
  <td
    :class="$style.component"
    @click="onClick">
    <span :class="$style.number">
      {{ formattedValue }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { numberWithCommas } from '../../../../helpers/format';

export default Vue.extend({
  name: 'list-item-number',

  props: {
    /**
     * Value of the boolean.
     */
    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    /**
     * Value formatted.
     */
    formattedValue(): string {
      return numberWithCommas(this.value);
    },
  },

  methods: {
    /**
     * Handles click event.
     */
    onClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss" module>
.component {
}

.number {
}
</style>
