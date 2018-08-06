export class VisitedPoster {
  name = ''
  title = ''
  conclusion = ''
  conclusionUrl = ''
  shareQrCode = ''

  do (name, title, conclusion, conclusionUrl, shareQrCode) {
    this.name = name
    this.title = title
    this.conclusion = conclusion
    // this.conclusionUrl = conclusionUrl
    this.shareQrCode = shareQrCode
    return this._template()
  }
  _template () {
    return ({
      background: '../image/visited-poster.png',
      width: '470rpx',
      height: '842rpx',
      views: [{
        type: 'image',
        url: this.shareQrCode,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '327rpx',
          top: '690rpx',
          width: '140rpx',
          height: '140rpx'
        }
      },
      {
        type: 'text',
        text: this.name,
        // url: 'https://xiaodamp.cn/asstbot/image?name=29995920955311e88601e133de4e1e2f.png',
        css: {
          left: '110rpx',
          top: '50rpx',
          fontSize: '48rpx',
          lineHeight: '60rpx',
          align: 'left',
          maxLines: 1,
          width: '340rpx',
          color: '#008289'
        }
      },
      {
        type: 'text',
        text: this.conclusion,
        // text: '好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。',
        css: {
          left: '20rpx',
          top: `${this.conclusionUrl === '' ? 250 : 520}rpx`,
          // top: '250rpx',
          fontSize: '24rpx',
          lineHeight: '32rpx',
          align: 'left',
          maxLines: 5,
          width: '430rpx',
          color: '#6A6A6A'
        }
      },
      {
        type: 'text',
        text: this.title,
        // text: '好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。好看的皮囊千篇一律，有趣的灵魂万里挑一。让你好看的皮囊见识你灵魂的有趣。',
        css: {
          left: '20rpx',
          top: '690rpx',
          fontSize: '24rpx',
          lineHeight: '32rpx',
          align: 'left',
          maxLines: 3,
          width: '300rpx',
          color: '#9A9A9A'
        }
      },
      {
        type: 'image',
        url: this.conclusionUrl,
        css: {
          left: '100rpx',
          top: '220rpx',
          width: '272rpx',
          height: '272rpx',
          mode: 'aspectFill'
        }
      }
      ]
    })
  }
}

