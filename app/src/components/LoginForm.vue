<template>
<div>
  <form @submit.prevent="login">

    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <div v-if="errors?.email">
      <small v-for="error in errors.email" :key="error">
        {{error}}
      </small>
    </div>


    <label for="password">Password</label>
    <input type="password" v-model="password" />
    <div v-if="errors?.password">
      <small v-for="error in errors.password" :key="error">
        {{error}}
      </small>
    </div>

    <button type="submit">
      Login
    </button>

    <div v-if="typeof errors === 'string'">
      <small>{{errors}}</small>
    </div>
  </form>
</div>
</template>
<script lang="ts">
import {getError} from '@/utils/helpers';
import {defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AuthService from '../services/AuthService';
export default defineComponent({
  data() {
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
        const authUser = await this.getUser();
        if (authUser) {
          this.setGuestStatus();
          this.navigateHome();
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
  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      setGuestStatus: () => store.dispatch('auth/setGuest', { value: "isNotGuest" }),
      getUser: async () => await store.dispatch('auth/getAuthUser'),
      navigateHome: () => router.push('/'),
    }
  },
});
</script>