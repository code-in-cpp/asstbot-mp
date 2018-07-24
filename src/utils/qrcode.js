import config from '@/config.js'

function getQrcodeImageUrl (scene) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.service.qrcodeUrl + '?scene=' + scene,
      method: 'GET',
      success: (response) => {
        let imageUrl = config.service.hostRoot + response.data.url
        console.log('get qrcode image url: ' + imageUrl)
        resolve(imageUrl)
      },
      fail: (err) => {
        console.log('get qrcode failed : ' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}
function storeQrCodeImage (imageUrl) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: imageUrl,
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.statusCode === 200) {
          console.log(`save image (${imageUrl}) in path ${res.tempFilePath}`)
          resolve(res.tempFilePath)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        console.log('save image failed : ' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}
function saveImageToPhotosAlbum (imageFilePath) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath: imageFilePath,
      success: (res) => {
        console.log('save image to photo album : ' + imageFilePath)
        resolve(res)
      },
      fail: (err) => {
        console.log('save image to photo album failed : ' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}

function comfirmSaveImageToPhotosAlbum (image) {
  wx.hideLoading()
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '分享二维码已保存到系统相册',
      content: '快去分享给朋友，让更多的朋友来参与吧',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: (err) => {
        console.log('comfirm save image to photo album failed : ' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}

export function saveQrCodeToPhotosAlbum (scene) {
  getQrcodeImageUrl(scene)
  .then(storeQrCodeImage)
  .then(saveImageToPhotosAlbum)
  .then(comfirmSaveImageToPhotosAlbum)
  .catch((err) => {
    console.log('save qrcode image to photo album failed : ' + JSON.stringify(err))
  })
}

export default {
  getQrcodeImageUrl,
  saveQrCodeToPhotosAlbum
}
