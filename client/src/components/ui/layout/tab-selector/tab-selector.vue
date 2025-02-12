<template>
  <div :class="$style.component">
    <v-bottom-navigation>
      <v-btn
        v-for="(item, index) in items"
        :key="`tab-selector-${id}-button-${index}`"
        :active="active === index"
        dark
        @click="() => (onClick(index))">
        {{ parseLabel(item) }}
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'tab-selector',

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
     * Tab items.
     */
    items: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
    /**
     * Currently active tab.
     */
    active: 0,
  }),

  methods: {
    /**
     * Handles click event.
     */
    onClick(index: number) {
      if (index === this.active) {
        return;
      }

      this.active = index;
      this.$emit(
        'change',
        typeof this.items[index] === 'object' ? (this.items[index] as Dictionary<string>).value : this.items[index],
      );
    },

    /**
     * Parses the label from an item.
     *
     * @param {any} item Item either object or string.
     * @returns {string} The item's label.
     */
    parseLabel(item: any): string {
      if (typeof item === 'object') {
        if ('label' in item) {
          return item.label;
        }
        return item.value;
      }
      return item;
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>

<style>
.v-item-group.v-bottom-navigation {
  justify-content: left;
  border-radius: 6px;
  overflow: hidden;
}

.v-item-group.v-bottom-navigation .v-btn .v-btn__content {
  color: rgb(157, 157, 157) !important;
  border: none;
}

.v-item-group.v-bottom-navigation .v-btn.v-btn--active .v-btn__content {
  color: white !important;
}

.v-item-group.v-bottom-navigation .v-btn {
  border: none;
}

.theme--dark.v-bottom-navigation {
  border: .8px solid #2c2927;
  background: #1B1918 !important;
}
</style>
