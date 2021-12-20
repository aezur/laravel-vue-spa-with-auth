<template>
  <nav id="nav">
    <div v-if="loggedIn" class="nav-container">
      <router-link to="/home">
        <img alt="Logo" src="@/assets/logo.png">
      </router-link>
      <div>
        <router-link class="link" to="/home">Home</router-link> | 
        <router-link class="link" to="/about">About</router-link>
      </div>
      <LogoutButton />
    </div>
    <div v-else class="nav-container">
      <router-link to="/home">
        <img alt="Logo" src="@/assets/logo.png">
      </router-link>
      <div>
        <router-link class="link" to="/login">Login</router-link> | 
        <router-link class="link" to="/register">Register</router-link>
      </div>
      <div></div>
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
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
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
    }
    a:last-of-type {
      margin-right: 1rem;
    }
  }
}
</style>