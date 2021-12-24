<template>
<header>
  <img class="logo" src="@/assets/logo.png" />
  <nav id="nav">
    <ul>
      <li v-if="!loggedIn">
        <router-link class="link" to="/login">Login</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link class="link" to="/register">Register</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link class="link" to="/home">Home</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link class="link" to="/about">About</router-link>
      </li>
      <li v-if="loggedIn">
        <LogoutButton />
      </li>
    </ul>
  </nav>
</header>
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
.logo {
  float: left;
  display: inline;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 .75rem;
}
#nav {
  ul {
    list-style-type: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 2rem;
    li:last-of-type {
      margin-right: 1rem;
    }
  }
}
</style>