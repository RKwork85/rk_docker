// store/uuidStore.js
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useUuidStore = defineStore('uuidStore', {
  state: () => ({
    uuid: '',
    flag: true,       //默认是新用户
    logined: false,
    showlogin:true,
    access_token: null,

  }),
  // 不使用持久化插件实现
  // actions: {
  //   generateUuid() {
  //     // 先从 localStorage 读取 UUID
  //     this.uuid = localStorage.getItem('uuid') || ''
  //     if (!this.uuid) {
  //       // 如果 localStorage 中没有,则生成一个新的 UUID
  //       this.uuid = uuidv4()
  //       localStorage.setItem('uuid', this.uuid)
  //     }
  //   }
  // }


  // persist: true // 启用持久化
  actions: {
    generateUuid() {
      if (!this.uuid) {
        this.uuid = uuidv4()
      }
      else{
      this.flag = false           // 改变应该在发送数据请求时发生
    }
    }
  },
  persist: true
})