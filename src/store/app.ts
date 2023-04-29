// Utilities
import { defineStore } from 'pinia'

export type RootState = {
  isDrawerVisible: boolean,
}

export const useAppStore = defineStore('app', {
  state: () => ({
    isDrawerVisible: false,
  } as RootState),
  actions: {
    setDrawer(data: boolean) {
      this.isDrawerVisible = data
    }
  }
})
