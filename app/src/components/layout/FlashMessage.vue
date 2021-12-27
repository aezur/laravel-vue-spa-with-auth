<template>
  <teleport to="header">
    <div class="flash-msg">
      <p
        v-if="$attrs.message"
        key="message"
      >
        {{ $attrs.message }}
      </p>
      <p
        v-if="$attrs.error && getType($attrs.error) === 'string'"
        key="error"
      >
        {{ $attrs.error }}
      </p>
      <ul
        v-if="getType($attrs.error) === 'object'"
        key="error-list"
      >
        <li
          v-for="key in errorKeys"
          :key="key"
        >
          <b>{{ titleCase(key) }}</b>
          <ul>
            <li
              v-for="(item, index) in getErrors(key)" 
              :key="`${index}-error`"
            >
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    errorKeys() {
      if (!this.error || this.getType(this.error) === "string") {
        return null;
      }
      return Object.keys(this.error);
    },
  },
  methods: {
    getErrors(key) {
      return this.error[key];
    },
    getType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },
    titleCase(value) {
      return value.replace("_", " ");
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
@import '@/assets/scss/colors.scss';
.flash-msg {
  p { margin: 0; }
  border: 1px solid $danger;
  background-color: rgba($danger, 20%);
  color: $danger;
  text-align: center;
  margin: 1rem;
  padding: .5rem;
  @media (max-width: $phoneLandscape) {
    margin-right: 3.5rem;
    padding: .75rem;
  }
}
</style>