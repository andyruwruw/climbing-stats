<template>
  <td
    :class="$style.component"
    @click="onClick">
    <span :style="{ color }">
      {{ label }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import { Dictionary } from '@/types';
import Vue from 'vue';

export default Vue.extend({
  name: 'list-item-categorical',

  props: {
    /**
     * Value of the boolean.
     */
    value: {
      type: String,
      default: '',
    },

    /**
     * Value options.
     */
    options: {
      type: Array,
      default: () => ([]),
    },
  },

  computed: {
    /**
     * Label for categorical.
     */
    label(): string {
      if (this.options.length) {
        for (let i = 0; i < this.options.length; i += 1) {
          if (this.options[i]
            && typeof this.options[i] === 'object'
            && (this.options[i] as Dictionary<string>).value === this.value
            && ('label' in (this.options[i] as Dictionary<string>))) {
            return (this.options[i] as Dictionary<string>).label;
          } if (this.options[i]
            && typeof this.options[i] === 'string'
            && this.options[i] === this.value) {
            return this.value;
          }
        }
      }
      return '';
    },

    /**
     * Color of the categorical.
     */
    color(): string {
      if (this.options.length) {
        for (let i = 0; i < this.options.length; i += 1) {
          if (this.options[i]
            && typeof this.options[i] === 'object'
            && (this.options[i] as Dictionary<string>).value === this.value
            && ('color' in (this.options[i] as Dictionary<string>))) {
            return (this.options[i] as Dictionary<string>).color;
          }
        }
      }
      return 'white';
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
  span {
  }
}
</style>
