<template>
  <div :class="{
    [$style.component]: true,
    [$style.show]: show,
  }">
    <div
      role="dialog"
      :class="$style.window"
      v-click-outside="close">
      <div :class="$style.header">
        <h2>
          {{ title }}
        </h2>

        <v-btn
          color="white"
          density="compact"
          :class="$style['close-button']"
          :dark="true"
          icon="mdi-close"
          @click="close">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'template-dialog',

  props: {
    /**
     * Whether to show the dialog.
     */
    show: {
      type: Boolean,
      default: false,
    },

    /**
     * Dialog title.
     */
    title: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    /**
     * When the dialog was last opened.
     */
    opened: 0,
  }),

  methods: {
    /**
     * Closes the dialog.
     */
    close() {
      if (Date.now() > this.opened + 500) {
        this.$emit('close');
      }
    },
  },

  watch: {
    /**
     * Show watcher.
     */
    show() {
      if (this.show) {
        this.opened = Date.now();
      } else {
        this.opened = 0;
      }
    },
  },
});
</script>

<style lang="scss" module>
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.component {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 50;
  animation: fade-in .3s ease;

  &.show {
    display: flex;
    background: rgba(0,0,0,.8);

    .window {
      animation: fade-in .3s ease;
      display: flex;
    }
  }

  .window {
    display: none;
    background: rgb(10 10 10);
    border: 1px solid rgb(38 38 38);
    padding: 1.5rem;
    max-width: calc(100vw - 1rem);
    border-radius: 0.5rem;

    .header {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 18px;
        color: white;
        letter-spacing: -.025em;
        line-height: 1;
        font-weight: 600;
        margin: 0;
      }

      .close-button {
        transform: translate(12px, -8px);
      }
    }
  }
}
</style>
