<template>
  <td
    :class="$style.component"
    @click="onClick">
    <span :style="{ color: state ? state.color : '' }">
      {{ state ? state.label : '' }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

// Local Imports
import { LIST_ITEM_CATEGORICAL_STATE_OPTIONS } from '../../../../config';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'list-item-location-state',

  props: {
    /**
     * Value of the boolean.
     */
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    lazyState: '',
  }),

  computed: {
    /**
     * State for categorical.
     */
    state(): Dictionary<string> | null {
      if (!this.lazyState) {
        return null;
      }

      for (let i = 0; i < LIST_ITEM_CATEGORICAL_STATE_OPTIONS.length; i += 1) {
        if (LIST_ITEM_CATEGORICAL_STATE_OPTIONS[i].value === this.lazyState) {
          return LIST_ITEM_CATEGORICAL_STATE_OPTIONS[i];
        }
      }

      return null;
    },
  },

  /**
   * Run when component is created.
   */
  async created() {
    if (!this.value) {
      return;
    }

    try {
      const location = await this.getLocation(this.value);

      console.log(this.value, location);

      if (location) {
        this.lazyState = location.state;
      }
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions(
      'locations',
      ['getLocation'],
    ),

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
