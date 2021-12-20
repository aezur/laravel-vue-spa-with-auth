<template>
  <router-link to="/" @click="logout">Logout</router-link>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {useStore} from 'vuex';
export default defineComponent({
  setup() {
    const store = useStore();
    return {
      logout: async () => await store.dispatch('auth/logout')
    }
  },
});
</script>