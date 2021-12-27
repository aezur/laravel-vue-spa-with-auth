<template>
  <form @submit.prevent="requestReset">
    <BaseInput
      id="email"
      v-model="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <Button type="submit">
      <span>Request Reset</span>
    </Button>
  </form>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import Button from '@/components/input/Button.vue';
import {defineComponent} from 'vue';
import {getError} from '@/utils/helpers';
export default defineComponent({
  components: {
    BaseInput,
    Button,
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