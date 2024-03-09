<template>
  <v-app-bar
    app
    color="primary"
    dark>
    <div class="d-flex align-center">
    </div>

    <v-spacer></v-spacer>

    <v-btn text>
      <span class="mr-2">Create Account</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app-bar',
});
</script>

<style lang="scss" module>
.component {
}
</style>
