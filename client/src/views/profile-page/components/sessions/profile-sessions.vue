<template>
  <div :class="$style.component">
    <session-list
      :items="sessions"
      @end="onBottomReached" />
  </div>
</template>

<script lang="ts">
// Packages;
import Vue from 'vue';

// Local Imports
import SessionList from '../../../../components/ui/lists/session-list/session-list.vue';

export default Vue.extend({
  name: 'profile-sessions',

  components: {
    SessionList,
  },

  props: {
    /**
     * Tick stats.
     */
    sessions: {
      type: Array,
      default: () => ([]),
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
