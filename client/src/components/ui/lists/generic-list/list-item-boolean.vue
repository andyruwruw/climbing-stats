<template>
  <td
    :class="$style.component"
    @click="onClick">
    <span :class="[
      $style.boolean,
      {
        [$style.active]: value,
      }
    ]">
      {{ `${value}` }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'list-item-boolean',

  props: {
    /**
     * Value of the boolean.
     */
    value: {
      type: Boolean,
      default: false,
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

.boolean {
  text-transform: capitalize;
  color: white;

  &.active {
    color: greenyellow;
  }
}
</style>
