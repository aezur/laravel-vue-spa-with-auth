<template>
<div>
  <form @submit.prevent="requestReset">

    <label for="email">Email</label>
    <input id="email" type="email" placeholder="username@provider.com" v-model="email" />
    <div v-if="errors?.email">
      <small v-for="error in errors.email" :key="error">
        {{error}}
      </small>
    </div>

    <button type="submit">
      Request Reset Email
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
import AuthService from '../services/AuthService';
export default defineComponent({
  data(): EmailWithErrors {
    return {
      email: '',
      errors: {},
    }
  },
  methods: {
    async requestReset() {
      this.errors = {};
      await AuthService.forgotPassword({ email: this.email })
        .then(res => console.log(res))
        .catch(err => this.errors = getError(err));
    }
  },
});
</script>