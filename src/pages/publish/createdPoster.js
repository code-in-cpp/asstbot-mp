export class CreatedPoster {
  title = ''
  intro = ''
  shareQrCode = ''
  avatar = '../image/avatar.png'
  botFontSize = 26
  botLetterSpaceing = 2
  botWidth = 390
  botLineHeight = 32
  botDivider = 20
  botPadding = 10
  greetingTop = 180
  greeting = '你好，我是你朋友的助手机器人，他有个测验邀请你回答'
  do (title, intro, shareQrCode, avatar) {
    this.title = title
    this.intro = intro
    this.shareQrCode = shareQrCode
    this.avatar = avatar
    return this._template()
  }
  getLineCount (info) {
    let words = parseInt(this.botWidth / (this.botFontSize + this.botLetterSpaceing))
    let count = parseInt(info.length / words)
    // console.log('words:', words, 'count:', count)
    if ((info.length % words) !== 0) {
      // console.log('need count++')
      count++
    }
    return count
  }
  getRectHeight (info) {
    let count = this.getLineCount(info)
    return count * this.botLineHeight + this.botPadding * 2
  }
  _template () {
    // let botTitle = '主题是：好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。'
    let botTitle = '主题是：' + this.title
    let greetingHeight = this.getRectHeight(this.greeting)
    let titleHeight = this.getRectHeight(botTitle)
    let titleTop = this.greetingTop + greetingHeight + this.botDivider
    let items = ({
      background: '../image/created-poster.png',
      width: '600rpx',
      height: '1068rpx',
      views: [{
        type: 'image',
        url: this.shareQrCode,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '210rpx',
          top: '800rpx',
          width: '180rpx',
          height: '180rpx'
        }
      },
      {
        type: 'image',
        url: this.avatar,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '446rpx',
          top: '78rpx',
          width: '80rpx',
          height: '80rpx',
          borderRadius: '40rpx'
        }
      },
      {
        type: 'image',
        url: this.avatar,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '20rpx',
          top: `${this.greetingTop}rpx`,
          width: '60rpx',
          height: '60rpx',
          borderRadius: '30rpx'
        }
      },
      {
        type: 'rect',
        css: {
          left: '100rpx',
          top: `${this.greetingTop}rpx`,
          width: '410rpx',
          height: `${greetingHeight}rpx`,
          color: '#ffffff',
          borderRadius: '10rpx'
        }
      },
      {
        type: 'text',
        text: this.greeting,
        css: {
          left: '117rpx',
          top: '190rpx',
          fontSize: `${this.botFontSize}rpx`,
          lineHeight: `${this.botLineHeight}rpx`,
          align: 'left',
          width: `${this.botWidth}rpx`,
          color: '#2b313d'
        }
      },
      {
        type: 'rect',
        css: {
          left: '100rpx',
          top: `${titleTop}rpx`,
          width: '410rpx',
          height: `${titleHeight}rpx`,
          color: '#ffffff',
          borderRadius: '10rpx'
        }
      },
      {
        type: 'text',
        text: botTitle,
        css: {
          left: '117rpx',
          top: `${this.botPadding + titleTop}rpx`,
          fontSize: `${this.botFontSize}rpx`,
          lineHeight: `${this.botLineHeight}rpx`,
          align: 'left',
          width: `${this.botWidth}rpx`,
          color: '#2b313d'
        }
      }
      ]
    })
    if (this.intro) {
      let botIntro = '内容是：' + this.intro
      let introTop = titleTop + titleHeight + this.botDivider
      let introHeight = this.getRectHeight(botIntro)
      let introText = {
        type: 'text',
        text: botIntro,
        css: {
          left: '117rpx',
          top: `${this.botPadding + introTop}rpx`,
          fontSize: `${this.botFontSize}rpx`,
          lineHeight: `${this.botLineHeight}rpx`,
          align: 'left',
          width: `${this.botWidth}rpx`,
          color: '#2b313d'
        }
      }
      let introRect = {
        type: 'rect',
        css: {
          left: '100rpx',
          top: `${introTop}rpx`,
          width: '410rpx',
          height: `${introHeight}rpx`,
          color: '#ffffff',
          borderRadius: '10rpx'
        }
      }
      items.views.push(introRect)
      items.views.push(introText)
    }
    return items
  }
}

