// Utilities
import { defineStore } from 'pinia'

export type RootState = {
  eatenFoodCounter: number,
  isDrawerVisible: boolean,
  isGameActive: boolean,
}

export const useAppStore = defineStore('app', {
  state: () => ({
    eatenFoodCounter: 0,
    isDrawerVisible: false,
    isGameActive: false,
  } as RootState),
  actions: {
    setDrawer(data: boolean) {
      this.isDrawerVisible = data
    },
    setEatenFoodCounter(data: number) {
      this.eatenFoodCounter = data
    },
    setGameActive(data: boolean) {
      this.isGameActive = data
    }
  }
})
