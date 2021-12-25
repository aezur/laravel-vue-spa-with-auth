<template>
  <form @submit.prevent="requestReset">
    <BaseInput
      v-model="email"
      id="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <button type="submit">
      <span>Request Reset</span>
    </button>
  </form>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import {defineComponent} from 'vue';
import {getError} from '@/utils/helpers';

export default defineComponent({
  components: {
    BaseInput,
  },
  data(): {
    email: string,
    // eslint-disable-next-line 
    errors: any,
  } {
    return {
      email: '',
      errors: {},
    }
  },
  methods: {
    async requestReset() {
      this.errors = {};
      await AuthService.forgotPassword({ email: this.email })
        .catch(err => this.errors = getError(err));
    }
  },
});
</script>