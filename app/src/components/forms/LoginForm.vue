<template>
  <form @submit.prevent="login">
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
      label="Password"
      :errors="errors?.password"
    />
    <BaseButton type="submit">
      Login
    </BaseButton>
  </form>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseButton from '@/components/input/BaseButton.vue';
import { defineComponent } from 'vue';
import { getError } from '@/utils/helpers';

export default defineComponent({
  components: { BaseInput, BaseButton },
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