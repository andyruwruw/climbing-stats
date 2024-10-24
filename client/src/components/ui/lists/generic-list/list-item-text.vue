<template>
  <td :class="$style.component">
    <span :class='$style.text'>
      <slot></slot>

      <template v-if="value && value.length">
        {{ value }}
      </template>
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'list-item-text',

  props: {
    /**
     * Value of the string.
     */
    value: {
      type: String,
      default: '',
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
