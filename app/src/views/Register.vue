<template>
  <RegistrationForm />
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