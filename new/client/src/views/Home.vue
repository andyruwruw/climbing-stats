<template>
  <div :class="$style.home">
    <h1 :class="$style.title">
      Welcome to Climbing Stats
    </h1>
    <p :class="$style.description">
      Track your climbing progress, analyze your stats, and connect with other climbers.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>

<style lang="scss" module>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
}
</style> 