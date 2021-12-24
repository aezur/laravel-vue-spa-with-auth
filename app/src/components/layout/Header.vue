<template>
<header>
  <img class="logo" src="@/assets/logo.png" />
  <nav id="nav">
    <img v-if="menuIsOpen"
      class="menu-btn"
      @click="toggleMenu"
      src="@/assets/close.png" />
    <img v-else
      class="menu-btn"
      @click="toggleMenu"
      src="@/assets/menu.png" />

    <ul :class="menuIsOpen?'':'hide-menu'">
      <li v-if="!loggedIn">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!loggedIn">
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link to="/home">Home</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link to="/about">About</router-link>
      </li>
      <li v-if="loggedIn">
        <router-link to="/" @click="logout">Logout</router-link>
      </li>
    </ul>
  </nav>
</header>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';
export default defineComponent({
  data() {
    return {
      menuIsOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    }
  },
  setup() {
    const store = useStore();
    return {
      loggedIn: computed(() => store.getters['auth/loggedIn']),
      logout: async () => await store.dispatch('auth/logout')
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars';
header {
  height: 3.5rem;
  .router-link-active {
    font-weight: bold;
  }
  .logo {
    float: left;
    display: inline;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 .75rem;
    @media (max-width: 35em) {
      margin: 1rem;
    }
  }
  @media (max-width: 35em) {
    .hide-menu {
      transform: translateX(100%);
    }
  }
  .menu-btn {
    display: none;
    z-index: 9999;
    @media (max-width: 35em) {
      display: block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      aspect-ratio: 1;
      height: 1.5rem;
    }
  }

}
#nav {
  ul {
    transition: transform ease-in-out 350ms;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: end;
    overflow: hidden;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: $navFontColor;
      }
    }
    li:last-of-type {
      margin-right: 1rem;
    }
  }
  @media (max-width: 35em) {
      ul {
        border-left: 1px solid darkcyan;
        background: hsl(0 0% 70% / 0.1);
        backdrop-filter: blur(1rem);
        flex-direction: column;
        justify-content: start;
        position: fixed;
        inset: 0 0 0 30%;
        margin: 0;
        padding: 5rem 0 0 0;
        li:last-of-type {
          margin-right: 0;
        }
      }
  }
}
</style>