<template>
  <form @submit.prevent="requestReset">
    <BaseInput
      id="email"
      v-model="email"
      type="email"
      label="Email"
      :errors="errors?.email"
    />
    <BaseButton type="submit">
      <span>Request Reset</span>
    </BaseButton>
  </form>
</template>
<script lang="ts">
import AuthService from '@/services/AuthService';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseButton from '@/components/input/BaseButton.vue';
import {defineComponent} from 'vue';
import {getError} from '@/utils/helpers';
export default defineComponent({
  components: {
    BaseInput,
    BaseButton,
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