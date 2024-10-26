<template>
  <page-padding>
    <div :class="$style.component">
      <profile-page-header :user="user" />

      <tab-selector
        :items="tabs"
        @change="handleTabChange" />

      <profile-overview
        v-if="tab === 'overview'"
        :tick-summations="tickSummations" />

      <profile-ticks
        v-if="tab === 'ticks'"
        :ticks="ticks" />

      <profile-sessions
        v-if="tab === 'sessions'"
        :sessions="sessions"
        @end="() => (retrieveSessions(sessions.length))" />

      <profile-locations
        v-if="tab === 'locations'" />

      <profile-partners
        v-if="tab === 'partners'" />
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
import {
  PAGE_SIZE,
  PROFILE_PAGE_TABS,
} from '../../config';
import ProfileOverview from './components/overview/profile-overview.vue';
import ProfileTicks from './components/ticks/profile-ticks.vue';
import ProfileSessions from './components/sessions/profile-sessions.vue';
import ProfileLocations from './components/locations/profile-locations.vue';
import ProfilePartners from './components/partners/profile-partners.vue';
import ProfilePageHeader from './components/profile-page-header.vue';
import TabSelector from '../../components/ui/layout/tab-selector/tab-selector.vue';
import PagePadding from '../../components/ui/layout/page-padding/page-padding.vue';
import api from '../../api';

// Types
import {
  Session,
  SessionSummations,
  Tick,
  TickSummations,
  User,
} from '../../types';

export default Vue.extend({
  name: 'profile-page',

  components: {
    TabSelector,
    PagePadding,
    ProfilePageHeader,
    ProfileOverview,
    ProfileLocations,
    ProfileTicks,
    ProfileSessions,
    ProfilePartners,
  },

  data: () => ({
    /**
     * User ID.
     */
    id: '',

    /**
     * User's sessions.
     */
    sessions: [] as Session[],

    /**
     * Session stats.
     */
    sessionSummations: null as SessionSummations | null,

    /**
     * Profile page tab options.
     */
    tabs: PROFILE_PAGE_TABS,

    /**
     * Currently active tab.
     */
    tab: 'overview',

    /**
     * User's ticks.
     */
    ticks: [] as Tick[],

    /**
     * Tick stats.
     */
    tickSummations: null as TickSummations | null,

    /**
     * User data.
     */
    user: null as User | null,
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
      [
        'getTicks',
        'getTickSummations',
      ],
    ),

    ...mapGetters(
      'sessions',
      [
        'getSessions',
        'getSessionSummations',
      ],
    ),
  },

  created() {
    this.id = this.$route.params.id;

    this.handlePageLoad(this.$route);

    this.retrieveUserData();
    this.retrieveSessionData();
    this.retrieveSessions();
    this.retrieveTickData();
    this.retrieveTicks();
  },

  methods: {
    ...mapActions(
      'navigation',
      ['handlePageLoad'],
    ),

    ...mapActions(
      'locations',
      ['getLocations'],
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
          this.tickSummations = this.getTickSummations;
          return;
        }

        const response = await api.ticks.getTickSummations(this.id);

        if (response.status === 200) {
          this.tickSummations = response.summations as TickSummations;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Retrieves list of ticks.
     */
    async retrieveTicks(offset = 0): Promise<void> {
      try {
        if (this.isLoggedIn
          && this.getUser
          && this.getUser.id === this.id
          && this.getTicks) {
          this.ticks = this.getTicks;
          return;
        }

        const response = await api.ticks.getTicks(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          offset,
          PAGE_SIZE,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.id,
        );

        if (response.status === 200) {
          if (this.ticks.length) {
            this.ticks.push(...response.ticks as Tick[]);
          } else {
            this.ticks = response.ticks as Tick[];
          }
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
          this.sessionSummations = this.getSessionSummations;
          return;
        }

        const response = await api.sessions.getSessionSummations(this.id);

        if (response.status === 200) {
          this.sessionSummations = response.summations as SessionSummations;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Retrieves list of sessions.
     */
    async retrieveSessions(offset = 0): Promise<void> {
      try {
        if (this.isLoggedIn
          && this.getUser
          && this.getUser.id === this.id
          && this.getSessions) {
          if (this.sessions.length) {
            this.sessions.push(...this.getSessions.slice(
              offset,
              offset + PAGE_SIZE,
            ));
          } else {
            this.sessions = this.getSessions.slice(
              offset,
              offset + PAGE_SIZE,
            );
          }
          return;
        }

        const response = await api.sessions.getSessions(
          undefined,
          undefined,
          offset,
          PAGE_SIZE,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.id,
        );

        if (response.status === 200) {
          const locations = (response.sessions as Session[]).map((session: Session) => (session.location));

          if (locations.length) {
            this.getLocations({ ids: locations });
          }

          if (this.sessions.length) {
            this.sessions.push(...response.sessions as Session[]);
          } else {
            this.sessions = response.sessions as Session[];
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Handles a new tab change.
     *
     * @param {string} value New tab value.
     */
    handleTabChange(value: string): void {
      if (value === this.tab) {
        return;
      }

      this.tab = value;
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
