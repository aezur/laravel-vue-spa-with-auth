<template>
  <li v-if="showLink">
    <router-link :to="path">
      {{ text }}
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
      default: () => '',
    },
    path: {
      type: String,
      required: true,
      default: () => '',
    },
    open: {
      type: Boolean,
      default: () => false,
    },
    auth: {
      type: Boolean,
      default: () => false,
    },
    admin: {
      type: Boolean,
      default: () => false,
    },
  },
  setup() {
    const store = useStore();
    return {
      loggedIn: computed(() => store.getters['auth/loggedIn']),
      isAdmin: computed(() => store.getters['auth/isAdmin']),
    }
  },
  computed: {
    showLink() {
      return (this.open && !this.loggedIn) ||
        (this.auth && this.loggedIn) ||
        (this.admin && this.loggedIn && this.isAdmin)
    }
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
.router-link-active {
  font-weight: bold;
  text-decoration: underline !important;
}
li {
  a {
    text-decoration: none;
    color: $navFontColor;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>