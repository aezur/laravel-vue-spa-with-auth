<template>
  <header>
    <nav id="nav">
      <fa-icon
        v-if="menuIsOpen"
        icon="times"
        class="menu-btn clickable"
        @click="toggleMenu"
      />
      <fa-icon
        v-else
        icon="bars"
        class="menu-btn clickable"
        @click="toggleMenu"
      />

      <ul :class="menuIsOpen ? '' : 'hide-menu'">
        <div class="branding">
          <fa-icon
            icon="city"
            class="logo"
          />
          <p v-if="title">
            {{ title }}
          </p>
        </div>
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
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
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
@import '@/assets/scss/colors';
header {
  position: sticky;
	top: 0;
	width: 100%;
  .branding {
    position: absolute;
    left: 0;
    display: flex;
    flex-basis: 1;
    align-items: center;
    p {
      margin: 0;
      color: $link;
      font-weight: bold;
    }
    .logo {
      width: 1.5rem;
      height: 1.5rem;
      margin: 0.5rem;
      @media (max-width: $phoneLandscape) {
        margin: 1rem;
      }
    }
  }
  @media (max-width: $phoneLandscape) {
    .branding {
      position: relative;
      flex-direction: column;
      p {
        font-size: 1.5rem;
      }
      .logo {
        margin: 1rem 0 0 0;
      }
    }
  }
  .logout {
    margin: 0;
    color: $link;
    &:hover {
      text-decoration: underline;
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
    color: $link;
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
      background-color: $primary;
      &.hide-menu {
        margin: 0;
        padding: .5rem;
      }
    }
    @media (max-width: $phoneLandscape) {
      ul {
        border-left: 1px solid $primary;
        background: rgba($secondary, 35%);
        backdrop-filter: blur(1rem);
        flex-direction: column;
        justify-content: start;
        position: fixed;
        inset: 0 0 0 30%;
        margin: 0;
        font-weight: bold;
        padding: 0;
        li:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
