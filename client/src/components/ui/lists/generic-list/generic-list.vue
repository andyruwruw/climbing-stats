<template>
  <div :class="$style.component">
    <table :class="$style.table">
      <tbody>
        <tr>
          <th v-if="rank" />

          <th
            v-for="(label, index) in lazySchema"
            :key="`table-${id}-header-${index}`">
            {{ label }}
          </th>
        </tr>

        <slot></slot>
      </tbody>

      <tfoot v-intersect="onBottomReached" />
    </table>
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

export default Vue.extend({
  name: 'generic-list',

  props: {
    /**
     * Component ID.
     *
     * @type {number | string}
     */
    id: {
      type: String,
      default: uuidv4(),
    },

    /**
     * Whether to display a rank.
     */
    rank: {
      type: Boolean,
      default: true,
    },

    /**
     * Table schema.
     */
    schema: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
    /**
     * Schema lazy updated.
     */
    lazySchema: [] as string[],
  }),

  /**
   * Run when component is created.
   */
  created() {
    this.lazySchema = this.schema as string[];
  },

  methods: {
    /**
     * When the bottom of the list is reached.
     */
    onBottomReached(): void {
      this.$emit('end');
    },
  },
});
</script>

<style lang="scss" module>
.component {
  max-width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

.table {
  color: white;
  width: 100%;
  border-spacing: 0 12px;
  border-collapse: separate;

  th {
    font-size: 12px;
    color: white;
    opacity: .8;
    font-weight: 300;
    text-align: left;
  }

  td {
    border: 0;
    padding: 8px 32px 8px 0;
  }

  td:first-of-type {
    padding-left: 18px;
  }
}
</style>
