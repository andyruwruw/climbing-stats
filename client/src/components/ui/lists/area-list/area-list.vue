<template>
  <generic-list
    :id="id"
    :rank="rank"
    :schema="schema"
    @end="onBottomReached">
    <list-item
      v-for="(item, index) in items"
      :key="`list-${id}-item-${index}`">
    </list-item>
  </generic-list>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import GenericList from '../generic-list/generic-list.vue';
import ListItem from '../generic-list/list-item.vue';

export default Vue.extend({
  name: 'area-list',

  components: {
    GenericList,
    ListItem,
  },

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
     * Items to display.
     *
     * @type {Area[]}
     */
    items: {
      type: Array,
      default: () => ([]),
    },

    /**
     * Whether to display a rank.
     */
    rank: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    /**
     * List schema.
     */
    schema(): string[] {
      return [];
    },
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
}
</style>
