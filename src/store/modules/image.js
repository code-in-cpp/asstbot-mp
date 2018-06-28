
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
  uploadImage ({dispatch, commit}, {filePath, indicator}) {
    console.log(filePath, indicator)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
