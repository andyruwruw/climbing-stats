<template>
  <div :class="$style.component">
    <slot></slot>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'page-padding',
});
</script>

<style lang="scss" module>
.component {
  max-width: 1200px;
  width: calc(100% - 32px);
  margin: 0 auto;
}
</style>
