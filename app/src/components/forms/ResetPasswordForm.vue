<template>
<div>
  <form @submit.prevent="resetPassword">
    <BaseInput
      v-model="email"
      id="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <BaseInput
      v-model="password"
      id="password"
      type="password"
      label="New Password"
      :errors="errors?.password"
    />
    <BaseInput
      v-model="password_confirmation"
      id="password_confirmation"
      type="password"
      label="Confirm New Password"
      :errors="errors?.password_confirmation"
    />
    <button type="submit">
      Reset Password
    </button>
  </form>
</div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';

export default defineComponent({
  components: { BaseInput },
  data(): {
      password_confirmation: string,
      password: string,
      email: string,
      // eslint-disable-next-line
      errors: any
    } {
    return {
      password_confirmation: '',
      password: '',
      email: '',
      errors: null,
    }
  },
  methods: {
    async resetPassword() {
      this.errors = {};
      await AuthService.resetPassword({
        email: this.email,
        password: this.password,
        password_confirmation:
          this.password_confirmation,
        token: this.token,
      })
        .then(() => this.$router.push({ name: 'login' }))
        .catch(err => this.errors = getError(err));
    }
  },
  computed: {
    token(): string {
      const token = this.$route.params.token;
      return typeof token === 'string' ? token : token[0];
    }
  },
});
</script>