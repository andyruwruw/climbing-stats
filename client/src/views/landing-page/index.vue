<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'landing-page',

  created() {
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
