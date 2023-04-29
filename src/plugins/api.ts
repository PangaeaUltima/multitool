import { App, Plugin } from 'vue'
import createApi from '@/api/index'

const myPlugin: Plugin = {
  install: (app: App, options?: any) => {
    app.config.globalProperties.$api = createApi(options?.axios);
  },
};

export default myPlugin;