<template>
  <td :class="$style.component">
    <span :class='$style.text'>
      {{ formatted }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { durationString } from '../../../../helpers/format';

export default Vue.extend({
  name: 'list-item-duration',

  props: {
    /**
     * Value of the string.
     */
    start: {
      type: Number,
      default: -1,
    },

    /**
     * Value of the string.
     */
    end: {
      type: Number,
      default: -1,
    },
  },

  computed: {
    /**
     * Formats the date value.
     */
    formatted(): string {
      if (this.start === -1 || this.end === -1) {
        return 'UNK';
      }
      return durationString(
        this.start,
        this.end,
      );
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

.text {
}
</style>
