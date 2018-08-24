/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://xiaodamp.cn'

var hostRoot = `${host}/asstbot`

export default {
  service: {
    hostRoot,
    // 登录地址，用于建立会话
    messageUrl: `${hostRoot}/chatbot`,
    openIdUrl: `${hostRoot}/openid`,
    userInfoUrl: `${hostRoot}/user/wechat`,
    imageUrl: `${hostRoot}/image`,
    videoPostUrl: `${hostRoot}/vedio`,
    imagePostUrl: `${hostRoot}/image?compress=true`,
    qrcodeUrl: `${hostRoot}/qrcode`
  }
}
