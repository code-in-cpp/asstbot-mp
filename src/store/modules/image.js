
import config from '@/config.js'

const url = config.service.imagePostUrl
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
      console.log('uploadStart')
      wx.uploadFile({
        url,
        filePath,
        name: 'image',
        success: function (res) {
          console.log('成功完成了上传任务')
          const url = `${hostRoot}/${JSON.parse(res.data).fileUrl}`
          dispatch('sendImage', {url, indicator}).then(() => resolve())
            .catch(err => reject(err))
        },
        fail: function (error) {
          console.log('上传任务失败')
          reject(error)
        },
        complete: function () {
          console.log('完成了上传任务')
        }
      })
    })
  },

  uploadImage ({commit}, filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name: 'image',
        success: (res) => {
          const remoteUrl = `${hostRoot}/${JSON.parse(res.data).fileUrl}`
          resolve(remoteUrl)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  selectImageToUpload ({dispatch}) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          dispatch('uploadImage', res.tempFilePaths[0]).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        },
        fail: (err) => {
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
