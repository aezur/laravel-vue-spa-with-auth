<template>
  <form @submit.prevent="register">
    <Input
      id="name"
      v-model="name"
      type="text"
      label="Name"
      :errors="errors?.name"
    />
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
      label="Password"
      :errors="errors?.password"
    />
    <Input
      id="password_confirmation"
      v-model="password_confirmation"
      type="password"
      label="Confirm Password"
      :errors="errors?.password_confirmation"
    />
    <Button type="submit">
      Submit
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