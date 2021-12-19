<template>
<div>
  <form @submit.prevent="register">

    <label for="name">Name</label>
    <input id="name" type="text" v-model="name" />
    <div v-if="errors?.name">
      <small v-for="error in errors.name" :key="error">
        {{error}}
      </small>
    </div>

    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <div v-if="errors?.email">
      <small v-for="error in errors.email" :key="error">
        {{error}}
      </small>
    </div>

    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <div v-if="errors?.password">
      <small v-for="error in errors.password" :key="error">
        {{error}}
      </small>
    </div>

    <label for="name">Confirm Password</label>
    <input type="password" v-model="password_confirmation" />
    <div v-if="errors?.password_confirmation">
      <small v-for="error in errors.password_confirmation" :key="error">
        {{error}}
      </small>
    </div>

    <button type="submit">
      Submit
    </button>

  </form>
</div>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import {getError} from '@/utils/helpers';
import {defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  data(): RegistrationObject {
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
        const authUser = await this.getUser();
        if (authUser) {
          this.setGuestStatus();
          this.navigateHome();
        } else {
          const error = Error('Unable to fetch user after registration.');
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