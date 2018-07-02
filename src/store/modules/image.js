
import config from '@/config.js'

const url = config.service.imageUrl
const hostRoot = config.service.hostRoot

const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  uploadImageWithIndicator ({dispatch, commit}, {filePath, indicator}) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name: 'file',
        success: function (res) {
          const url = `${hostRoot}/${JSON.parse(res.data).fileUrl}`
          dispatch('sendImage', {url, indicator}).then(() => resolve())
            .catch(err => reject(err))
        },
        fail: function (error) {
          reject(error)
        }
      })
    })
  },

  uploadImage ({commit}, filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name: 'file',
        success: (res) => {
          const remoteUrl = `${hostRoot}/${JSON.parse(res.data).fileUrl}`
          resolve(remoteUrl)
        },
        fial: (err) => {
          reject(err)
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
