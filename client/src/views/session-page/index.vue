<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'session-page',

  data: () => ({
    id: '',
  }),

  created() {
    this.id = this.$route.params.id;

    this.handlePageLoad(this.$route);
  },

  methods: {
    ...mapActions(
      'navigation',
      ['handlePageLoad'],
    ),
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
