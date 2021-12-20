<template>
  <ForgotPasswordForm />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm.vue';
export default defineComponent({
  components: {
    ForgotPasswordForm,
  }
});
</script>