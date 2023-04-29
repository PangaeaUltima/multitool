<template>
<app-layout>
  <app-header />
  <v-main>
    <v-container class="fill-height">
      <router-view />
    </v-container>
  </v-main>
</app-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/app/AppHeader.vue'
import AppLayout from '@/components/app/AppLayout.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppLayout,
  },
})
</script>