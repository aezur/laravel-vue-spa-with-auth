<template>
  <nav id="nav">
    <div v-if="loggedIn" class="nav-container">
      <img alt="Logo" src="@/assets/logo.png">
      <router-link class="link" to="/home">Home</router-link>
      <router-link class="link" to="/about">About</router-link>
      <LogoutButton />
    </div>
    <div v-else class="nav-container">
      <router-link to="/home">
        <img alt="Logo" src="@/assets/logo.png">
      </router-link>
      <router-link class="link" to="/login">Login</router-link>
      <router-link class="link" to="/register">Register</router-link>
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
#nav {
  min-width: 100vw;
  margin-bottom: 2rem;
  a {
    font-weight: bold;
    color: #929699;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img {
      width: 2rem;
      height: 2rem;
      margin: 0 1rem;
      border-radius: 50%;
      border: 1px solid black;
    }
    a:last-of-type {
      margin-right: 1rem;
    }
  }
}
</style>