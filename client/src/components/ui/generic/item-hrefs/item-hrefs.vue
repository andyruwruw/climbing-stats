<template>
  <div :class="$style.component">
    <div
      v-for="(item, index) in items"
      :key="`${id}-${index}`"
      :class="$style.link">
      <v-icon
        v-if="item.type === 'youtube'"
        color="inherit"
        small>
        mdi-youtube
      </v-icon>

      <v-icon
        v-if="item.type === 'instagram'"
        color="inherit"
        small>
        mdi-instagram
      </v-icon>

      <img
        v-if="item.type === 'moutainProject'"
        :class="$style.logo"
        src="../../../../assets/media/mountain-project.png"
        alt="mountain-project" />

      {{ typeLabel(item.type) }}

      <div
        v-if="index < items.length - 1"
        :class="$style.spacer" />
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';

// Types
import { Dictionary } from '../../../../types';

export default Vue.extend({
  name: 'item-hrefs',

  props: {
    /**
     * Image source URL.
     */
    hrefs: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Component ID.
     */
    id: {
      type: String,
      default: uuidv4(),
    },
  },

  computed: {
    /**
     * Array of hrefs.
     */
    items(): Dictionary<string>[] {
      const result = [] as Dictionary<string>[];
      const keys = Object.keys(this.hrefs);

      for (let i = 0; i < keys.length; i += 1) {
        result.push({
          type: keys[i],
          value: this.hrefs[keys[i]],
        });
      }

      return result;
    },
  },

  methods: {
    /**
     * Generates a string for type.
     *
     * @param {string} type HREF type.
     * @returns {string} Label for type.
     */
    typeLabel(type: string): string {
      switch (type) {
        case 'youtube':
          return 'Youtube';
        case 'moutainProject':
          return 'Mountain Project';
        case 'instagram':
          return 'Instagram';
        default:
          return 'Website';
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  align-items: center;

  color: white;

  .link {
    display: flex;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
      color: #7FC442;

      i {
        color: #7FC442;
      }
    }

    i,
    .logo {
      margin-right: 4px;
      transition: all .3s ease;
      color: white;
    }

    i {
      transform: translateY(-.8px);
    }

    .logo {
      width: 16px;
      transform: translateY(-.8px);
    }

    .spacer {
      display: block;
      border-radius: 50%;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.727);
      margin: 0 10px;
    }
  }
}
</style>
