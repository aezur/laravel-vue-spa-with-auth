<template>
  <form @submit.prevent="register">
    <BaseInput
      v-model="name"
      id="name"
      type="name"
      label="Name"
      :errors="errors?.name"
    />
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
    <BaseInput
      v-model="password_confirmation"
      id="password_confirmation"
      type="password"
      label="Confirm Password"
      :errors="errors?.password_confirmation"
    />
    <button type="submit">
      Submit
    </button>
  </form>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';

export default defineComponent({
  components: { BaseInput },
  data(): {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    // eslint-disable-next-line 
    errors: any,
  } {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
    }
  },
  methods: {
    async register() {
      this.errors = {};
      try {
        await AuthService.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        const authUser = await this.$store.dispatch('auth/getAuthUser');
        if (authUser) {
          this.$store.dispatch('auth/setGuest', { value: "isNotGuest" });
          this.$router.push({ name: 'home' });
        } else {
          const error = Error('Unable to fetch user after registration.');
          error.name = 'Fetch User';
          this.$store.dispatch('ui/setError', error);
          throw error;
        }
      } catch (error) {
        this.errors = getError(error);
      }
    }
  },
});
</script>