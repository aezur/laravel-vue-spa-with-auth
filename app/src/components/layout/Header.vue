<template>
  <header>
    <img class="logo" src="@/assets/logo.png" />
    <nav id="nav">
      <img
        v-if="menuIsOpen"
        class="menu-btn clickable"
        @click="toggleMenu"
        src="@/assets/close.png"
      />
      <img
        v-else
        class="menu-btn clickable"
        @click="toggleMenu"
        src="@/assets/menu.png"
      />

      <ul :class="menuIsOpen ? '' : 'hide-menu'">
        <li v-if="!loggedIn" @click="closeMenu">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!loggedIn" @click="closeMenu">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="loggedIn" @click="closeMenu">
          <router-link to="/home">Home</router-link>
        </li>
        <li v-if="loggedIn" @click="closeMenu">
          <router-link to="/about">About</router-link>
        </li>
        <li v-if="isAdmin" @click="closeMenu">
          <router-link to="/users">Users</router-link>
        </li>
        <li v-if="loggedIn" @click="closeMenu">
          <router-link to="/" @click="logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    return {
      loggedIn: computed(() => store.getters["auth/loggedIn"]),
      isAdmin: computed(() => store.getters["auth/isAdmin"]),
      menuIsOpen: computed(() => store.getters["ui/menuIsOpen"]),
      logout: () => store.dispatch("auth/logout"),
      closeMenu: () => {
        if (store.getters["ui/menuIsOpen"]) {
          store.dispatch("ui/closeMenu");
        }
      },
      toggleMenu: async () => await store.dispatch("ui/toggleMenu"),
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars';
header {
  height: 3rem;
  background-color: $bgColor;
  position: sticky;
	top: 0;
	width: 100%;
  .router-link-active {
    font-weight: bold;
    text-decoration: underline !important;
  }
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.75rem;
    @media (max-width: $phoneLandscape) {
      margin: 1rem;
    }
  }
  @media (max-width: $phoneLandscape) {
    .hide-menu {
      transform: translateX(100%);
    }
  }
  .menu-btn {
    display: none;
    z-index: 9999;
    @media (max-width: $phoneLandscape) {
      display: block;
      position: absolute;
      top: 1rem;
      right: 1rem;
      aspect-ratio: 1;
      height: 1.5rem;
    }
  }
  #nav {
  ul {
    transition: transform ease-in-out 350ms;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    gap: 2rem;
    background-color: $bgColor;
    &.hide-menu {
      margin: 0;
      padding: .5rem;
    }
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
  @media (max-width: $phoneLandscape) {
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
}
</style>
