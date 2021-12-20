<template>
  <LoginForm />
  <div>
    <span>Forgot your password?</span>
    <router-link to="/forgot-password">Reset it here!</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import LoginForm from '@/components/forms/LoginForm.vue';
export default defineComponent({
  components: {
    LoginForm,
  }
});
</script>