<template>
  <Header />
  <body>
    <main>
      <router-view />
    </main>
  </body>
  <FlashMessage
      v-if="$store.getters['auth/message'] || $store.getters['auth/error']"
      anchor="header"
      :message="$store.getters['auth/message']"
      :error="$store.getters['auth/error']"
    />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/layout/Header.vue";
import FlashMessage from "@/components/layout/FlashMessage.vue";
@Options({ components: { Header, FlashMessage } })
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
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
</style>
