<template>
  <div :class="$style.component">
    <div :class="$style.content">
      <span
        v-if="isLoggedIn && getDisplayName"
        :class="$style.title">
        Welcome back, {{ getDisplayName }}
      </span>

      <span>
        Here's your climbing overview
      </span>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'home-page-header',

  computed: {
    ...mapGetters(
      'user',
      [
        'getDisplayName',
        'isLoggedIn',
      ],
    ),
  },
});
</script>

<style lang="scss" module>
.component {
  padding: 32px 0;
  display: flex;

  .content {
    span {
      display: block;
      color: white;
      font-size: .8rem;
    }

    .title {
      font-weight: 500;
      font-size: 1.6rem;
      margin: 6px 0;
    }
  }
}
</style>
