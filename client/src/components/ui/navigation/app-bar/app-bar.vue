<template>
  <v-app-bar
    app
    color="transparent"
    dark>
    <div class="d-flex align-center">
      <span :class="$style.title">
        Climbing Stats
      </span>
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

.title {
  font-size: 1rem;
}
</style>
