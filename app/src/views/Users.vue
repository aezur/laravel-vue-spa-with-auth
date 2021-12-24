<template>
  <p v-for="user in users" :key="user">{{ user }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminService from '@/services/AdminService.ts';
export default defineComponent({
  data() {
    return {
      users: null,
    };
  },
  async mounted() {
    await AdminService.getUsers()
      .then(({data}) => {
        this.users = data.data;
      })
      .catch(err => {
        console.log(err);
        this.$store.dispatch('auth/setError', err)
      });
  },
});
</script>
