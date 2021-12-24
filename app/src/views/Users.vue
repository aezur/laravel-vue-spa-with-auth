<template>
  <p id="users" v-for="user in $store.getters['admin/users']" :key="user">{{ user }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  async mounted() {
    await this.$store.dispatch('admin/getUsers');
  },
});
</script>
