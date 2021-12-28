<template>
  <RegistrationForm />
  <div>
    <span>Already have an account? </span>
    <Link path="/login" text="Login!" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegistrationForm from '@/components/forms/RegistrationForm.vue';
import Link from '@/components/links/Link.vue';
export default defineComponent({
  components: {
    RegistrationForm,
    Link,
  }
});
</script>