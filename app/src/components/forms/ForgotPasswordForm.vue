<template>
  <form @submit.prevent="requestReset">
    <Input
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
import Input from '@/components/input/Input.vue';
import Button from '@/components/input/Button.vue';
import {defineComponent} from 'vue';
import {getError} from '@/utils/helpers';
export default defineComponent({
  components: {
    Input,
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