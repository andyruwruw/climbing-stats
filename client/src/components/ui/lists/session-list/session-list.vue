<template>
  <generic-list
    :id="id"
    :rank="rank"
    :schema="schema"
    @end="onBottomReached">
    <list-item
      v-for="(item, index) in items"
      :key="`list-${id}-item-${index}`"
      :rank="rank">
      <list-item-date :value="item.date || -1" />

      <list-item-duration
        :start="item.start || -1"
        :end="item.end || -1" key=""/>

      <list-item-location :value="item.location || ''" />

      <list-item-state :value="item.location || ''"/>

      <list-item-categorical
        :value="`${item.outdoors}`"
        :options="LIST_ITEM_CATEGORICAL_OUTDOORS_OPTIONS"/>
    </list-item>
  </generic-list>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Local Imports
import {
  LIST_ITEM_CATEGORICAL_OUTDOORS_OPTIONS,
  LIST_ITEM_CATEGORICAL_STATE_OPTIONS,
} from '../../../../config';
import ListItemState from '../generic-list/list-item-location-state.vue';
import ListItemCategorical from '../generic-list/list-item-categorical.vue';
import ListItemLocation from '../generic-list/list-item-location.vue';
import ListItemDuration from '../generic-list/list-item-duration.vue';
import ListItemDate from '../generic-list/list-item-date.vue';
import GenericList from '../generic-list/generic-list.vue';
import ListItem from '../generic-list/list-item.vue';

// Types
import { Session } from '../../../../types/sessions';

export default Vue.extend({
  name: 'session-list',

  components: {
    ListItemState,
    ListItemCategorical,
    ListItemLocation,
    GenericList,
    ListItem,
    ListItemDate,
    ListItemDuration,
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
     * @type {Session[]}
     */
    items: {
      type: Array,
      default: () => ([] as Session[]),
    },

    /**
     * Whether to display a rank.
     */
    rank: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    LIST_ITEM_CATEGORICAL_OUTDOORS_OPTIONS,

    LIST_ITEM_CATEGORICAL_STATE_OPTIONS,
  }),

  computed: {
    /**
     * List schema.
     */
    schema(): string[] {
      return [
        'Date',
        'Duration',
        'Location',
        'State',
        'Outdoors',
      ];
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
