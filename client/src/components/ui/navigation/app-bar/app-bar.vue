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

    <c-button
      v-if="!getUser"
      :outlined="true"
      @click="openLoginDialog">
      Login
    </c-button>

    <c-button
      v-if="getUser"
      :outlined="true"
      @click="openLoginDialog">
      Log Tick
    </c-button>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

// Local Imports
import CButton from '../../form/button/button.vue';

export default Vue.extend({
  name: 'app-bar',

  components: {
    CButton,
  },

  computed: {
    ...mapGetters('resize', [
      'isLarge',
      'isHuge',
      'isMedium',
    ]),

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
