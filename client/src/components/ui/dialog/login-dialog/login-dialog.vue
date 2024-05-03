<template>
  <template-dialog
    title="Login to your account"
    :show="dialog"
    @close="close">
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

  computed: {
    ...mapState('user', [
      'dialog',
    ]),
  },

  methods: {
    ...mapActions('user', [
      'closeLoginDialog',
    ]),

    /**
     * Closes the dialog.
     */
    close() {
      this.closeLoginDialog();
    },
  },
});
</script>

<style lang="scss" module>
.component {
}
</style>
