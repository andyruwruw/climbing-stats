<template>
  <v-app-bar
    app
    dark
    flat
    border
    color="transparent"
    :class="$style.component">
    <div :class="$style['title-wrapper']">
      <v-icon>
        mdi-carabiner
      </v-icon>

      <span :class="$style.title">
        Climbing Stats
      </span>
    </div>

    <v-spacer />

    <v-btn
      v-if="!getUser"
      text
      append-icon="mdi-login-variant">
      <template v-slot:append>
        <v-icon color="white" />
      </template>

      Login
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import { mapGetters } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'app-bar',

  computed: {
    ...mapGetters('user', [
      'getUser',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
}

.title-wrapper {
  display: flex;
  cursor: pointer;
}

.title {
  font-size: 1rem;
  margin-left: .4rem;
  text-transform: uppercase;
  letter-spacing: .1rem;
}
</style>
