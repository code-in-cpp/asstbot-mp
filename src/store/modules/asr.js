import config from '@/config.js'

const hostRoot = config.service.hostRoot
const url = `${hostRoot}/asr`
// import Fly from 'flyio/dist/npm/wx'

// var fly = new Fly()

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  getAsrResult ({commit}, filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name: 'audio',
        // formData: {
        //   filename: filePath
        // },
        success: function (res) {
          console.log(res)
          resolve(res)
        },
        fail: function (error) {
          reject(error)
        }
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
