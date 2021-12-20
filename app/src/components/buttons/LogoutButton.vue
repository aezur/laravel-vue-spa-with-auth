<template>
  <router-link to="/logout" @click="logout">Logout</router-link>
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

<style lang="scss" scoped>
a {
  padding: 0 1rem 0 1rem;
  font-weight: bold;
  color: #929699;
}
</style>