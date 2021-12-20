<template>
<div>
  <form @submit.prevent="login">
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
      label="Password"
      :errors="errors?.password"
    />
    <button type="submit">
      Login
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
    email: string,
    password: string,
    // eslint-disable-next-line 
    errors: any,
  } {
    return {
      email: '',
      password: '',
      errors: {},
    }
  },
  methods: {
    async login() {
      this.errors = {};
      try {
        await AuthService.login({
          email: this.email,
          password: this.password,
        });
        const authUser = await this.$store.dispatch('auth/getAuthUser');
        if (authUser) {
          this.$store.dispatch('auth/setGuest', { value: "isNotGuest" })
          this.$router.push({ name: 'home' });
        } else {
          const error = Error('Unable to fetch user after login.');
          error.name = 'Fetch User';
          throw error;
        }
      } catch (error) {
        this.errors = getError(error);
      }
    }
  },
});
</script>