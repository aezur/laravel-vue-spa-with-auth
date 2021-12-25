<template>
  <Header />
  <body>
    <main>
      <router-view />
    </main>
  </body>
  <FlashMessage
    v-if="$store.getters['ui/message'] || $store.getters['ui/error']"
    anchor="main"
    :message="$store.getters['ui/message']"
    :error="$store.getters['ui/error']"
  />
  <BaseModal v-if="showModal"></BaseModal>
  <Loader v-if="showLoader"></Loader>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/layout/Header.vue';
import FlashMessage from '@/components/layout/FlashMessage.vue';
import BaseModal from '@/components/layout/BaseModal.vue';
import Loader from '@/components/layout/Loader.vue';
export default defineComponent({
  components: { Header, FlashMessage, BaseModal, Loader },
  setup() {
    const store = useStore();
    return {
      showModal: computed(() => store.getters['ui/modalIsOpen']),
      showLoader: computed(() => store.getters['ui/loading']),
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/scss/vars';
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: $bgColor;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
}

main {
  display: flex;
  flex-direction: column;
  @media (max-width: $phonePortrait) {
    padding: 0 1rem;
  }
  @media (min-width: $phonePortrait) {
    padding: 0 5rem;
  }
  @media (min-width: $phoneLandscape) {
    input {
      min-width: min(400px, 80vw);
    }
    align-items: center;
  }
}

form {
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }
  button[type="submit"] {
    margin-bottom: 1rem;
  }
}

.clickable {
  cursor: pointer;
}
</style>
