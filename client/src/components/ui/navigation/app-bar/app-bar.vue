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

      <span :class="$style.title">
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
      text>
      Log Tick
    </v-btn>

    <v-btn
      v-if="getUser"
      text>
      Log Session
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
    ...mapGetters('user', [
      'getUser',
    ]),
  },

  methods: {
    ...mapActions('user', [
      'openLoginDialog',
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
