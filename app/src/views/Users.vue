<template>
  <div id="users"
    v-for="user in $store.getters['admin/users']"
    :key="user">
    <p>{{ user }}</p>
  </div>
  <BasePagination
    path="/users"
    :meta="$store.getters['admin/meta']"
    :links="$store.getters['admin/links']"
    action="admin/paginateUsers" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BasePagination from '@/components/input/BasePagination.vue';
export default defineComponent({
  components: { BasePagination },
});
</script>
