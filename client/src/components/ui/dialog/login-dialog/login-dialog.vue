<template>
  <template-dialog
    :title="title"
    :show="dialog"
    @close="close">
    <div :class="$style.content">
      <v-text-field
        v-if="type === 'register'"
        v-model="email"
        dark
        outlined
        hide-details
        dense
        placeholder="Email Address (Not Required)" />

      <v-text-field
        v-if="type === 'register'"
        v-model="fullName"
        dark
        outlined
        hide-details
        dense
        placeholder="Full Name *" />

      <v-text-field
        v-model="username"
        dark
        outlined
        hide-details
        dense
        placeholder="Username *" />

      <v-text-field
        v-model="password"
        dark
        outlined
        hide-details
        dense
        type="password"
        placeholder="Password *" />

      <v-text-field
        v-if="type === 'register'"
        v-model="passwordAgain"
        dark
        outlined
        hide-details
        dense
        type="password"
        placeholder="Repeat Password*" />

      <span
        v-if="error"
        :class="$style.error">
        {{ error }}
      </span>

      <div :class="$style.actions">
        <v-btn
          dark
          color="rgb(38, 38, 38)"
          @click="switchLoginType">
          {{ switchLabel }}
        </v-btn>

        <v-btn
          :dark="disabled"
          color="white"
          :disabled="disabled"
          @click="submit">
          {{ submitLabel }}
        </v-btn>
      </div>
    </div>
  </template-dialog>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapState,
} from 'vuex';
import Vue from 'vue';

// Local Imports
import TemplateDialog from '../dialog/dialog.vue';

export default Vue.extend({
  name: 'login-dialog',

  components: {
    TemplateDialog,
  },

  data: () => ({
    /**
     * Error message.
     */
    error: '' as string,

    /**
     * Type of login.
     */
    type: 'login' as string,

    /**
     * User username.
     */
    username: 'andyruwruw' as string,

    /**
     * User password.
     */
    password: 'Password123!' as string,

    /**
     * User password again.
     */
    passwordAgain: 'Password123!' as string,

    /**
     * User full name.
     */
    fullName: 'Andrew Young' as string,

    /**
     * User email.
     */
    email: 'andrew@youngshome.com' as string,
  }),

  computed: {
    ...mapState('user', [
      'dialog',
    ]),

    /**
     * Text for other.
     */
    switchLabel(): string {
      if (this.type === 'login') {
        return 'Register Instead';
      }
      return 'Login Instead';
    },

    /**
     * Text for submit button.
     */
    submitLabel(): string {
      if (this.type === 'login') {
        return 'Login';
      }
      return 'Register';
    },

    /**
     * Whether the user can submit.
     */
    disabled(): boolean {
      if (this.type === 'login') {
        return !(this.username.length && this.password.length);
      }
      return !(this.username.length
        && this.password.length
        && this.fullName
        && this.passwordAgain.length
        && this.password === this.passwordAgain);
    },

    /**
     * Dialog title.
     */
    title(): string {
      if (this.type === 'login') {
        return 'Login to your account';
      }
      return 'Register a new account';
    },
  },

  methods: {
    ...mapActions('user', [
      'closeLoginDialog',
      'login',
      'register',
    ]),

    /**
     * Submit info.
     */
    submit(): void {
      if (this.type === 'login') {
        this.login({
          username: this.username,
          password: this.password,
        });
      } else {
        this.register({
          fullName: this.fullName,
          username: this.username,
          password: this.password,
          email: this.email,
        });
      }
    },

    /**
     * Closes the dialog.
     */
    close(): void {
      this.closeLoginDialog();
    },

    /**
     * Switch login mode.
     */
    switchLoginType(): void {
      this.type = this.type === 'login' ? 'register' : 'login';
    },
  },

  watch: {
    /**
     * Make sure that password works.
     */
    password() {
      if (!(this.password.length >= 8
        && /\d/.test(this.password)
        && /[A-Z]/.test(this.password)
        && /[!#$%&*+\-:;<=>?@^~|]/.test(this.password)
      ) && this.password.length) {
        this.error = 'Password must be 8 or more characters, and include a number, capital letters and a special character! I store irreversibly encrypted passwords for safety, but they gotta be strong.';
      } else if (this.error) {
        this.error = '';
      }
    },

    /**
     * Watcher for password.
     */
    passwordAgain() {
      if (this.passwordAgain !== this.password) {
        this.error = 'Passwords do not match!';
      } else if (this.error) {
        this.error = '';
      }
    },
  },
});
</script>

<style lang="scss" module>
.content {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 2rem - 48px);
  max-width: 500px;
  margin-top: 1.2rem;
  gap: 1.2rem;
}

.actions {
  justify-content: flex-end;
  display: flex;
  gap: 1rem;
  margin-top: .8rem;

  button {
    width: 33%;
    min-width: 80px;
  }
}

.error {
  font-size: .8rem;
  padding: .6rem;
  border-radius: .2rem;
  color: rgb(255, 136, 136);
  border: 1px solid rgba(255, 0, 0, 0.365);
  background: rgba(255, 81, 81, 0.061);
  line-height: 2;
}
</style>
