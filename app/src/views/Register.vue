<template>
  <RegistrationForm />
  <div>
    <span>Already have an account?</span>
    <router-link to="/login">Login!</router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
export default defineComponent({
  components: {
    RegistrationForm,
  }
});
</script>