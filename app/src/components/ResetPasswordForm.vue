<template>
<div>
  <form @submit.prevent="resetPassword">
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <div v-if="errors?.email">
      <small v-for="error in errors.email" :key="error">
        {{error}}
      </small>
    </div>

    <label for="password">New Password</label>
    <input id="password" type="password" v-model="password" />
    <div v-if="errors?.password">
      <small v-for="error in errors.password" :key="error">
        {{error}}
      </small>
    </div>

    <label for="password_confirmation">Confirm New Password</label>
    <input id="password_confirmation" type="password" v-model="password_confirmation" />
    <div v-if="errors?.password_confirmation">
      <small v-for="error in errors.password_confirmation" :key="error">
        {{error}}
      </small>
    </div>

    <button type="submit">
      Reset Password
    </button>

    <div v-if="typeof errors === 'string'">
      <small>{{errors}}</small>
    </div>
  </form>
</div>
</template>

<script lang="ts">
import { getError } from '@/utils/helpers';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

export default defineComponent({
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
        .then(() => this.navigateToLogin())
        .catch(err => this.errors = getError(err));
    }
  },
  computed: {
    token(): string {
      const token = this.$route.params.token;
      return typeof token === 'string' ? token : token[0];
    }
  },
  setup() {
    const router = useRouter();
    return {
      navigateToLogin: () => router.push({ name: 'login' }),
    }
  }
});
</script>