<template>
  <v-app v-resize="handleResize">
    <app-bar />

    <login-dialog />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

// Local Imports
import AppBar from './components/ui/navigation/app-bar/app-bar.vue';
import LoginDialog from './components/ui/dialog/login-dialog/login-dialog.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    LoginDialog,
  },

  created() {
    this.handleResize();
    this.checkSession();
  },

  methods: {
    ...mapActions('resize', [
      'resize',
    ]),

    ...mapActions(
      'user',
      ['checkSession'],
    ),

    /**
     * Handles the window resizing.
     */
    handleResize() {
      this.resize({
        width: window.innerWidth,
      });
    },
  },
});
</script>
