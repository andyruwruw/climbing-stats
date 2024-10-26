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
  --index: 0;

  border-radius: 6px;
  border: .8px solid #2c2927;
  background: #1B1918;
  height: 56px;
  border-spacing: 0px;
  transition: all .2s ease;

  &:hover {
    background: #201e1d;
  }

  span {
    font-size: 14px;
    padding: 8px 0;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.index {
  width: 16px;
  color: white;
  padding-right: 12px;
}
</style>
