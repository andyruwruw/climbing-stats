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
import { dateStringSimple } from '../../../../helpers/format';

export default Vue.extend({
  name: 'list-item-date',

  props: {
    /**
     * Value of the string.
     */
    value: {
      type: Number,
      default: -1,
    },
  },

  computed: {
    /**
     * Formats the date value.
     */
    formatted(): string {
      if (this.value === -1) {
        return 'UNK';
      }
      return dateStringSimple(this.value);
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
