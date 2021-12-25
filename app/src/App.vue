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
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/layout/Header.vue';
import FlashMessage from '@/components/layout/FlashMessage.vue';
@Options({ components: { Header, FlashMessage } })
export default class App extends Vue {}
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
  overflow: hidden;
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
