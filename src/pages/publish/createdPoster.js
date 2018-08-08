export class CreatedPoster {
  title = ''
  intro = ''
  shareQrCode = ''

  do (title, intro, shareQrCode) {
    this.title = title
    this.intro = intro
    this.shareQrCode = shareQrCode
    // console.log('title:', this.title)
    // console.log('intro:', this.intro)
    // console.log('shareQrCode:', this.shareQrCode)
    return this._template()
  }
  _template () {
    return ({
      background: '../image/created-poster.png',
      width: '470rpx',
      height: '842rpx',
      views: [{
        type: 'image',
        url: this.shareQrCode,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '80rpx',
          top: '340rpx',
          width: '300rpx',
          height: '300rpx'
        }
      },
      {
        type: 'text',
        text: this.title,
        // text: '你是一个有趣的人吗？献给有趣的灵魂们。你是一个有趣的人吗？献给有趣的灵魂们。你是一个有趣的',
        css: {
          left: '30rpx',
          top: '180rpx',
          fontSize: '28rpx',
          lineHeight: '36rpx',
          align: 'left',
          maxLines: 3,
          width: '400rpx',
          color: '#4A4A4A'
        }
      },
      {
        type: 'text',
        text: this.intro,
        // text: '好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。',
        css: {
          left: '30rpx',
          top: '650rpx',
          fontSize: '22rpx',
          lineHeight: '30rpx',
          align: 'left',
          width: '400rpx',
          maxLines: 4,
          color: '#6A6A6A'
        }
      }
      ]
    })
  }
}

