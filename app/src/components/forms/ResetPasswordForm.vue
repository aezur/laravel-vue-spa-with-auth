<template>
  <form @submit.prevent="resetPassword">
    <BaseInput
      id="email"
      v-model="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <BaseInput
      id="password"
      v-model="password"
      type="password"
      label="New Password"
      :errors="errors?.password"
    />
    <BaseInput
      id="password_confirmation"
      v-model="password_confirmation"
      type="password"
      label="Confirm New Password"
      :errors="errors?.password_confirmation"
    />
    <Button type="submit">
      Reset Password
    </Button>
  </form>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import Button from '@/components/input/Button.vue';
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';

export default defineComponent({
  components: { BaseInput, Button },
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
  computed: {
    token(): string {
      const token = this.$route.params.token;
      return typeof token === 'string' ? token : token[0];
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
});
</script>