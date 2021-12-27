<template>
  <div class="users">
    <div
      v-for="user in $store.getters['admin/users']"
      :key="user"
      class="user"
    >
      <div>
        <label for="name">
          <b>Name: </b>
        </label>
        <p id="name">
          {{ user.name }}
        </p>
        <label for="email">
          <b>Email: </b>
        </label>
        <p id="email">
          {{ user.email }}
        </p>
      </div>
      <div>      
        <label for="name">
          <b>Verified: </b>
        </label>
        <p id="verified">
          {{ parseTimestamp(user.verified) }}
        </p>
        <label for="admin">
          <b>Admin: </b>
        </label>
        <p id="admin">
          {{ user.isAdmin }}
        </p>
      </div>
    </div>
    <Pagination
      v-if="$store.getters['admin/links']"
      path="/users"
      :meta="$store.getters['admin/meta']"
      :links="$store.getters['admin/links']"
      action="admin/paginateUsers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pagination from '@/components/input/Pagination.vue';
export default defineComponent({
  components: { Pagination },
  methods: {
    parseTimestamp(ts: string) {
      return new Date(ts).toLocaleString() || '-';
    },
  },
});
</script>

<style lang="scss">
@import '@/assets/scss/colors.scss';
.users {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user {
    padding: .5rem 1rem;
    display:grid;
    grid-template-columns: 200px 200px;
    grid-row: auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-bottom: 2rem;
    border: 1px solid $font;
    background-color: $ui;
    &:first-of-type {
      margin-top: 3rem;
    }
    p {
      margin: 0;
    }
  }
}
</style>