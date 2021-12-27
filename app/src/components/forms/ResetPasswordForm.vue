<template>
  <form @submit.prevent="resetPassword">
    <Input
      id="email"
      v-model="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <Input
      id="password"
      v-model="password"
      type="password"
      label="New Password"
      :errors="errors?.password"
    />
    <Input
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
import Input from '@/components/input/Input.vue';
import Button from '@/components/input/Button.vue';
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';

export default defineComponent({
  components: { Input, Button },
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