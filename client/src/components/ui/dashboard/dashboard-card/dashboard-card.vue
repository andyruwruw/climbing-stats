<template>
  <div :class="$style.component">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'dashboard-card',
});
</script>

<style lang="scss" module>
.component {
  padding: 16px;
  border-radius: 6px;
  border: .8px solid #2c2927;
  background: #1B1918;
  display: flex;
  flex-direction: column;
}
</style>
