<template>
  <LoginForm />
  <div>
    <span>Forgot your password? </span>
    <Link
      path="/forgot-password"
      text="Reset it here!"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Link from '@/components/links/Link.vue';
import LoginForm from '@/components/forms/LoginForm.vue';
export default defineComponent({
  components: {
    LoginForm,
    Link,
  }
});
</script>