<template>
  <Header></Header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/layout/Header.vue';
@Options({ components: { Header } })
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;
}

form {
  display: flex;
  flex-direction: column;
  width: 400px;
  min-width: 100%;
  max-width: 100vw;
  input {
    margin-bottom: 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }
}
</style>
