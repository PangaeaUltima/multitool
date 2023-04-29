<template>
  <div class="d-flex align-center">
    <span class="mr-4" v-if="isGameActive"> Food eaten: {{ eatenFoodCounter }}</span>
    <v-btn
      color="transparent"
      class="ml-auto mr-4"
      flat
      icon
      size="36"
      @click="isGameActive = !isGameActive"
    >
      <v-icon color="primary" size="24">
        mdi-nintendo-game-boy
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { defineComponent, computed, watch } from 'vue'

export default defineComponent({
  name: 'AppCursorFollowerControl',
  setup() {
    const appStore = useAppStore()

    const isGameActive = computed({
      get() {
        return appStore.isGameActive
      },
      set(value) {
        appStore.setGameActive(value)
      }
    })

    const eatenFoodCounter = computed(() => appStore.eatenFoodCounter)

    watch(isGameActive, (val) => {
      if (!val) appStore.setEatenFoodCounter(0)
    })

    return {
      eatenFoodCounter,
      isGameActive,
    }
  }
})
</script>