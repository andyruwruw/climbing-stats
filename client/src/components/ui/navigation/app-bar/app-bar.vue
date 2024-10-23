<template>
  <v-app-bar
    app
    dark
    flat
    clipped-left
    color="transparent">
    <div :class="$style['title-wrapper']">
      <v-icon>
        mdi-carabiner
      </v-icon>

      <span
        v-if="isHuge || isLarge || isMedium"
        :class="$style.title">
        Climbing Stats
      </span>
    </div>

    <v-spacer />

    <v-btn
      v-if="!getUser"
      text
      @click="openLoginDialog">
      Login
    </v-btn>

    <v-btn
      v-if="getUser"
      icon
      small>
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

    <v-btn
      v-if="getUser"
      text
      @click="goToMyProfile">
      {{ getUsername }}
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'app-bar',

  computed: {
    ...mapGetters('resize', [
      'isLarge',
      'isHuge',
      'isMedium',
    ]),

    ...mapGetters('user', [
      'getUser',
      'getUsername',
    ]),
  },

  methods: {
    ...mapActions('user', [
      'openLoginDialog',
    ]),

    ...mapActions('navigation', [
      'goToMyProfile',
    ]),
  },
});
</script>

<style lang="scss" module>
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

<style lang="scss">
.v-app-bar .v-toolbar__content {
  max-width: 1200px;
  width: calc(100% - 32px);
  margin: 0 auto;
  padding: 0;
}
</style>
