<template>
  <div id="nav">
    <div v-if="loggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <LogoutButton />
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';
import LogoutButton from '@/components/buttons/LogoutButton.vue';
export default defineComponent({
  components: { LogoutButton },
  setup() {
    const store = useStore();
    return {
      loggedIn: computed(() => store.getters['auth/loggedIn'])
    };
  },
});
</script>