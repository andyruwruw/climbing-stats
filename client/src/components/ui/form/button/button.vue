<template>
  <v-btn
    :active="active"
    :active-color="activeColor"
    :append-icon="appendIcon"
    :base-color="baseColor"
    :block="block"
    :border="border"
    :color="color"
    :dark="true"
    :density="density"
    :disabled="disabled"
    :elevation="elevation"
    :height="height"
    :href="href"
    :icon="icon"
    :loading="loading"
    :maxHeight="maxHeight"
    :maxWidth="maxWidth"
    :minHeight="minHeight"
    :minWidth="minWidth"
    :outlined="true"
    :position="position"
    :prependIcon="prependIcon"
    :readonly="readonly"
    :replace="replace"
    :ripple="ripple"
    :rounded="rounded"
    :size="size"
    :slim="slim"
    :stacked="stacked"
    :tile="tile"
    :value="value"
    :variant="variant"
    :width="width"
    @click="handleClick">
    <slot />
  </v-btn>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'c-button',

  props: {
    /**
     * Controls the active state of the item. This is typically used to highlight the component.
     */
    active: {
      type: Boolean,
      default: undefined,
    },

    /**
     * The applied color when the component is in an active state.
     */
    activeColor: {
      type: String,
      default: undefined,
    },

    /**
     * Creates an icon component after default content in the append slot.
     */
    appendIcon: {
      type: String,
      default: undefined,
    },

    /**
     * Sets the color of component when not focused.
     */
    baseColor: {
      type: String,
      default: undefined,
    },

    /**
     * Expands the button to 100% of available space.
     */
    block: {
      type: Boolean,
      default: false,
    },

    /**
     * Designates the border-radius applied to the component.
     *
     * This can be 'xs', 'sm', 'md', 'lg', 'xl'.
     */
    border: {
      type: Boolean,
      default: false,
    },

    /**
     * Applies specified color to the control - supports utility colors (for example success or purple) or css color (#033 or rgba(255, 0, 0, 0.5)).
     */
    color: {
      type: String,
      default: undefined,
    },

    /**
     * Adjusts the vertical height used by the component.
     *
     * This can be 'default', 'comfortable' or 'compact'
     */
    density: {
      type: String,
      default: 'default',
    },

    /**
     * Removes the ability to click or target the component.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Designates an elevation applied to the component between 0 and 24.
     */
    elevation: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets the height for the component.
     */
    height: {
      type: Number,
      default: undefined,
    },

    /**
     * Designates the component as anchor and applies the href attribute.
     */
    href: {
      type: String,
      default: undefined,
    },

    /**
     * Apply a specific icon using the icon component. The button will become round.
     */
    icon: {
      type: String,
      default: undefined,
    },

    /**
     * Displays linear progress bar. Can either be a String which specifies which color is applied to the progress bar (any material color or theme color - primary, secondary, success, info, warning, error) or a Boolean which uses the component color (set by color prop - if it’s supported by the component) or the primary color.
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets the maximum height for the component.
     */
    maxHeight: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets the maximum width for the component.
     */
    maxWidth: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets the minimum height for the component.
     */
    minHeight: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets the minimum width for the component.
     */
    minWidth: {
      type: Number,
      default: undefined,
    },

    /**
     * Sets the position for the component.
     *
     * This can be 'static', 'relative', 'fixed', 'absolute' or 'sticky'.
     */
    position: {
      type: String,
      default: undefined,
    },

    /**
     * Creates an icon component in the prepend slot before default content.
     */
    prependIcon: {
      type: String,
      default: undefined,
    },

    /**
     * Puts the button in a readonly state. Cannot be clicked or navigated to by keyboard.
     */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * Setting replace prop will call router.replace() instead of router.push() when clicked, so the navigation will not leave a history record. You can find more information about the replace prop on the vue-router documentation.
     */
    replace: {
      type: Boolean,
      default: false,
    },

    /**
     * Applies the v-ripple directive.
     */
    ripple: {
      type: Boolean,
      default: true,
    },

    /**
     * Designates the border-radius applied to the component.
     *
     * This can be '0', 'xs', 'sm', 'true', 'lg', 'xl', 'pill', 'circle', and 'shaped'.
     */
    rounded: {
      type: String,
      default: undefined,
    },

    /**
     * Sets the height and width of the component. Default unit is px.
     *
     * Can also use the following predefined sizes: 'x-small', 'small', 'default', 'large', and 'x-large'.
     */
    size: {
      type: String,
      default: 'default',
    },

    /**
     * Reduces padding to 0 8px.
     */
    slim: {
      type: Boolean,
      default: false,
    },

    /**
     * Displays the button as a flex-column.
     */
    stacked: {
      type: Boolean,
      default: false,
    },

    /**
     * Removes any applied border-radius from the component.
     */
    tile: {
      type: Boolean,
      default: false,
    },

    /**
     * The value used when the component is selected in a group. If not provided, a unique ID will be used.
     */
    value: {
      type: String,
      default: undefined,
    },

    /**
     * Applies a distinct style to the component.
     *
     * Can be 'flat', 'text', 'elevated', 'tonal', 'outlined', or 'plain'.
     */
    variant: {
      type: String,
      default: 'outlined',
    },

    /**
     * Sets the width for the component.
     */
    width: {
      type: Number,
      default: undefined,
    },
  },

  methods: {
    /**
     * Handles a click event.
     */
    handleClick(event: MouseEvent): void {
      this.$emit(
        'click',
        event,
      );
    },
  },
});
</script>

<style lang="scss">
.v-btn--outlined {
  background: #1b1918;
  border: .5px solid #44403e;
}

.v-btn.v-size--default {
  font-size: 0.7rem;
}
</style>
