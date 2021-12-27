<template>
  <header>
    <img
      class="logo"
      src="@/assets/logo.png"
    >
    <nav id="nav">
      <img
        v-if="menuIsOpen"
        src="@/assets/close.png"
        class="menu-btn clickable"
        @click="toggleMenu"
      >
      <img
        v-else
        src="@/assets/menu.png"
        class="menu-btn clickable"
        @click="toggleMenu"
      >

      <ul :class="menuIsOpen ? '' : 'hide-menu'">
        <Link
          text="Login" 
          path="/login" 
          :open="true"
          @click="closeMenu"
        />
        <Link
          text="Register" 
          path="/register" 
          :open="true"
          @click="closeMenu"
        />
        <Link
          text="Home" 
          path="/home" 
          :auth="true"
          @click="closeMenu"
        />
        <Link
          text="About" 
          path="/about" 
          :auth="true"
          @click="closeMenu"
        />
        <Link
          text="Users" 
          path="/users" 
          :admin="true"
          @click="closeMenu"
        />
        <p
          v-if="loggedIn"
          class="clickable logout"
          @click="logout"
        >
          Logout
        </p>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Link from '@/components/Link.vue';
export default defineComponent({
  components: { Link },
  setup() {
    const store = useStore();
    return {
      loggedIn: computed(() => store.getters["auth/loggedIn"]),
      isAdmin: computed(() => store.getters["auth/isAdmin"]),
      menuIsOpen: computed(() => store.getters["ui/menuIsOpen"]),
      logout: async () => {
        if (store.getters["ui/menuIsOpen"]) {
          store.dispatch("ui/closeMenu");
        }
        await store.dispatch("auth/logout");
      },
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
  position: sticky;
	top: 0;
	width: 100%;
  .logout {
    margin: 0;
    color: $navFontColor;
  }
  .logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.5rem;
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
      background-color: $headerColor;
      &.hide-menu {
        margin: 0;
        padding: .5rem;
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
