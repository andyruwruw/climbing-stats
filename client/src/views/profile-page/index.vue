<template>
  <page-padding>
    <div :class="$style.component">
      <profile-page-header :user="user" />

      <profile-page-main-statistics
        :ticks="ticks"
        :sessions="sessions" />

      <profile-page-boulder-pyramid :ticks="ticks" />

      <profile-page-boulder-attempts-pyramid :ticks="ticks" />
    </div>
  </page-padding>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

// Local Imports
import ProfilePageMainStatistics from './components/profile-page-main-statistics.vue';
import ProfilePageBoulderAttemptsPyramid from './components/profile-page-boulder-attempts-pyramid.vue';
import ProfilePageBoulderPyramid from './components/profile-page-boulder-pyramid.vue';
import ProfilePageHeader from './components/profile-page-header.vue';
import PagePadding from '../../components/ui/layout/page-padding.vue';
import api from '../../api';

// Types
import {
  SessionSummations,
  TickSummations,
  User,
} from '../../types';

export default Vue.extend({
  name: 'profile-page',

  components: {
    PagePadding,
    ProfilePageHeader,
    ProfilePageMainStatistics,
    ProfilePageBoulderPyramid,
    ProfilePageBoulderAttemptsPyramid,
  },

  data: () => ({
    /**
     * User ID.
     */
    id: '',

    /**
     * User data.
     */
    user: null as User | null,

    /**
     * Tick stats.
     */
    ticks: null as TickSummations | null,

    /**
     * Session stats.
     */
    sessions: null as SessionSummations | null,
  }),

  computed: {
    ...mapGetters(
      'user',
      [
        'isLoggedIn',
        'getUser',
      ],
    ),

    ...mapGetters(
      'ticks',
      ['getTickSummations'],
    ),

    ...mapGetters(
      'sessions',
      ['getSessionSummations'],
    ),
  },

  created() {
    this.id = this.$route.params.id;

    this.handlePageLoad(this.$route);

    this.retrieveUserData();
    this.retrieveSessionData();
    this.retrieveTickData();
  },

  methods: {
    ...mapActions(
      'navigation',
      ['handlePageLoad'],
    ),

    /**
     * Retrieves user information.
     */
    async retrieveUserData(): Promise<void> {
      try {
        if (this.isLoggedIn
          && this.getUser
          && this.getUser.id === this.id) {
          this.user = this.getUser;
          return;
        }

        const response = await api.users.getUser(this.id);

        if (response.status === 200) {
          this.user = response.user as User;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Retrieves tick summations.
     */
    async retrieveTickData(): Promise<void> {
      try {
        if (this.isLoggedIn
          && this.getUser
          && this.getUser.id === this.id
          && this.getTickSummations
          && 'tickList' in this.getTickSummations
          && Object.keys(this.getTickSummations.tickList).length) {
          this.ticks = this.getTickSummations;
          return;
        }

        const response = await api.ticks.getTickSummations(this.id);

        if (response.status === 200) {
          this.ticks = response.summations as TickSummations;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Retrieves session summations.
     */
    async retrieveSessionData(): Promise<void> {
      try {
        if (this.isLoggedIn
          && this.getUser
          && this.getUser.id === this.id
          && this.getSessionSummations.start !== -1) {
          this.sessions = this.getSessionSummations;
          return;
        }

        const response = await api.sessions.getSessionSummations(this.id);

        if (response.status === 200) {
          this.sessions = response.summations as SessionSummations;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
