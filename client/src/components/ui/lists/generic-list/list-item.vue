<template>
  <tr
    :class="$style.component"
    :stlye="{
      '--index': lazyIndex - 1,
    }">
    <td
      v-if="rank"
      :class="$style.index">
      <span>
        {{ lazyIndex > 9 ? lazyIndex : `0${lazyIndex}` }}
      </span>
    </td>

    <slot></slot>
  </tr>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'list-item',

  props: {
    /**
     * Row number.
     */
    row: {
      type: Number,
      default: Math.floor(Math.random() * 1000),
    },

    /**
     * Whether to display rank.
     */
    rank: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    /**
     * Lazy updating index.
     */
    lazyIndex: 0,
  }),

  /**
   * Run when component is created.
   */
  created() {
    this.lazyIndex = this.row + 1;
  },
});
</script>

<style lang="scss" module>
.component {
}

.index {
}
</style>
