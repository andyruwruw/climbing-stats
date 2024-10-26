<template>
  <td :class="$style.component">
    <span :class='$style.text'>
      {{ lazyLocation }}
    </span>
  </td>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'list-item-location',

  props: {
    /**
     * Value of the string.
     */
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    /**
     * Lazy value for location name.
     */
    lazyLocation: '',
  }),

  /**
   * Run when created.
   */
  async created() {
    if (this.value) {
      const location = await this.getLocation(this.value);

      if (!location) {
        this.lazyLocation = '';
      } else {
        this.lazyLocation = location.name;
      }
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
}

.text {
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    color: #7FC442;
    text-decoration: underline;
  }
}
</style>
