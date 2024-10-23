<template>
  <dashboard-card>
    <div :class="$style.component">
      <cover-image
        :src="getImage"
        :alt="getId"
        x-large />

      <div :class="$style.content">
        <span :class="$style['display-name']">
          {{ getDisplayName }}
        </span>

        <item-hrefs :hrefs="user ? user.hrefs : {}"/>
      </div>
    </div>
  </dashboard-card>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import DashboardCard from '../../../components/ui/dashboard/card/dashboard-card.vue';
import ItemHrefs from '../../../components/ui/generic/item-hrefs/item-hrefs.vue';
import CoverImage from '../../../components/ui/generic/cover-image/cover-image.vue';

export default Vue.extend({
  name: 'profile-page-header',

  components: {
    DashboardCard,
    CoverImage,
    ItemHrefs,
  },

  props: {
    /**
     * User data.
     */
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    /**
     * Retrieves unique identifier from user object.
     */
    getId(): string {
      return this.user && 'id' in this.user ? this.user.id : '';
    },

    /**
     * Retrieves display name from user object.
     */
    getDisplayName(): string {
      return this.user && 'displayName' in this.user ? this.user.displayName : '';
    },

    /**
     * Retrieves image from user object.
     */
    getImage(): string {
      return this.user && 'image' in this.user ? this.user.image : '#';
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  gap: 12px;
}

.display-name {
  font-size: 24px;
  color: white;
}
</style>
