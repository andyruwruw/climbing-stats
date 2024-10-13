<template>
  <page-padding>
    <home-page-header />
  </page-padding>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

// Local Imports
import HomePageHeader from './components/home-page-header.vue';
import PagePadding from '../../components/ui/layout/page-padding.vue';

export default Vue.extend({
  name: 'home-page',

  components: {
    HomePageHeader,
    PagePadding,
  },

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
