<template>
  <v-app>
    <app-bar />

    <navigation-drawer />

    <login-dialog />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import AppBar from './components/ui/navigation/app-bar/app-bar.vue';
import LoginDialog from './components/ui/dialog/login-dialog/login-dialog.vue';
import NavigationDrawer from './components/ui/navigation/navigation-drawer/navigation-drawer.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    LoginDialog,
    NavigationDrawer,
  },
});
</script>
