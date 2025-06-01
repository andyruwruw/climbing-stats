<template>
  <div :class="$style.container">
    <h1 :class="$style.title">
      404 - Page Not Found
    </h1>
    <p :class="$style.message">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <router-link
      to="/"
      :class="$style.link"
    >
      Return to Home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundView',
});
</script>

<style lang="scss" module>
.container {
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.link {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#42b983, 10%);
  }
}
</style> 