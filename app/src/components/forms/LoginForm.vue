<template>
  <form @submit.prevent="login">
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
    <Button type="submit">
      Login
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