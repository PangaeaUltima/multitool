import { AxiosInstance } from "axios"

export default ($axios: AxiosInstance) => ({
  currencies: {
    convert: (params: object) => $axios.get('https://api.exchangerate.host/convert', { params }),
    symbols: () => $axios.get('https://api.exchangerate.host/symbols'),
    timeseries: (params: object) => $axios.get('https://api.exchangerate.host/timeseries', { params }),
  },
})
