<template>
  <nav id="nav">
    <div v-if="loggedIn" class="navbar">
      <router-link to="/home">
        <img alt="Logo" src="@/assets/logo.png">
      </router-link>
      <div>
        <router-link to="/home">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <LogoutButton />
    </div>
    <div v-else class="navbar">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
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

<style lang="scss" scoped>
nav {
  min-width: 100vw;
  a {
    font-weight: bold;
    color: #929699;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }
  }
}
</style>