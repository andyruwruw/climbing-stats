<template>
  <img
    :class="[
      $style.component,
      {
        [$style['component__x-small']]: xSmall,
        [$style['component__small']]: small,
        [$style['component__large']]: large,
        [$style['component__x-large']]: xLarge,
      }
    ]"
    :src="src"
    :alt="alt" />
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'cover-image',

  props: {
    /**
     * Image source URL.
     */
    src: {
      type: String,
      default: '#',
    },

    /**
     * Alternate text for image.
     */
    alt: {
      type: String,
      default: '#',
    },

    xSmall: {
      type: Boolean,
      default: false,
    },

    small: {
      type: Boolean,
      default: false,
    },

    large: {
      type: Boolean,
      default: false,
    },

    xLarge: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module>
.component {
  --radius: 48px;

  border-radius: 50%;
  width: var(--radius);
  height: var(--radius);
  object-fit: cover;
}

.component__x-small {
  --radius: 24px;
}

.component__small {
  --radius: 32px;
}

.component__large {
  --radius: 72px;
}

.component__x-large {
  --radius: 120px;
}
</style>
