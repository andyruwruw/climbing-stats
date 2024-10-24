<template>
  <td :class="$style.component">
    <c-button @click="onClick" />
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'list-item-button',

  props: {
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
}

.active {
}
</style>
