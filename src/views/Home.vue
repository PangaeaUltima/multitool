<template>
  <div>
    <h1 class="mb-4">
      Welcome to my small project! Glad to see you here.
    </h1>
    <p class="mb-4">
      You can choose something interesting in the menu list...
    </p>
    <v-btn color="primary" variant="outlined" @click="appStore.setDrawer(true)">
      Click here to toggle menu
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'

export default defineComponent({
  name: 'PageHome',
  setup() {
    const appStore = useAppStore()

    return {
      appStore,
    }
  }
})
</script>
