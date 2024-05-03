<template>
  <v-navigation-drawer
    v-model="lazyOpen"
    app
    permanent
    persistent
    clipped
    color="transparent">
    <div :class="$style.content">
      <h2>
        Climber
      </h2>

      <v-btn
        dark
        text
        prepend-icon="">
        <v-icon small>
          mdi-account-star-outline
        </v-icon>

        Overview
      </v-btn>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-chart-timeline-variant-shimmer
        </v-icon>

        Insights
      </v-btn>

      <h2>
        Sessions
      </h2>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-clipboard-clock-outline
        </v-icon>

        All Sessions
      </v-btn>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-calendar-today-outline
        </v-icon>

        Timeline
      </v-btn>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-image-filter-hdr-outline
        </v-icon>

        Locations
      </v-btn>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-crowd
        </v-icon>

        Climbing Partners
      </v-btn>

      <h2>
        Routes
      </h2>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-view-grid-plus-outline
        </v-icon>

        All Routes
      </v-btn>

      <v-btn
        dark
        text>
        <v-icon small>
          mdi-star-four-points-box-outline
        </v-icon>

        Tick List
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'navigation-drawer',

  data: () => ({
    lazyOpen: true,
  }),
});
</script>

<style lang="scss" module>
.content {
  display: flex;
  flex-direction: column;

  h2 {
    color: rgb(212, 212, 212);
    letter-spacing: -.025em;
    font-weight: normal;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    margin-bottom: .5rem;
    font-size: 14px;
  }

  button {
    justify-content: flex-start;
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.1rem;
    color: rgb(212, 212, 212) !important;

    i {
      margin-right: 8px;
    }
  }
}
</style>
