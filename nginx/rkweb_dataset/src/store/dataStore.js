import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    data: {
      instruction: '',
      output: '',
      dataset: [],
    },
  }),

  // actions: {
  //   generateUuid() {
  //     if (!this.uuid) {
  //       this.uuid = uuidv4()
  //     }
  //     else{
  //     this.flag = false           
  //   }
  //   }
  // },
  persist: true
})