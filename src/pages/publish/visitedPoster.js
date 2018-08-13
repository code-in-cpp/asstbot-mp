export class VisitedPoster {
  name = ''
  title = ''
  conclusion = ''
  conclusionUrl = ''
  shareQrCode = ''
  topPadding = 0
  titleLeftPadding = 0
  titleFontSize = 24
  titleLetterSpacing = 2
  do (name, title, conclusion, conclusionUrl, shareQrCode) {
    this.name = name
    this.title = title
    this.conclusion = conclusion
    this.conclusionUrl = conclusionUrl
    this.shareQrCode = shareQrCode
    return this._template()
  }
  getLineCount (info) {
    let words = parseInt(300 / (this.titleFontSize + this.titleLetterSpacing))
    let count = parseInt(info.length / words)
    // console.log('words:', words, 'count:', count)
    if ((info.length % words) !== 0) {
      // console.log('need count++')
      count++
    }
    return count
  }
  getLeftPadding (info) {
    if (this.getLineCount(info) > 1) {
      return 0
    }
    let words = parseInt(300 / (this.titleFontSize + this.titleLetterSpacing))
    let count = info.length
    if (words > count) {
      let padding = (words - count) * (this.titleFontSize + this.titleLetterSpacing)
      console.log('left padding', padding)
      return padding
    }
    return 0
  }
  getTopPadding (info) {
    if (this.getLineCount(info) <= 2) {
      return 32
    }
    return 0
  }
  _template () {
    this.topPadding = this.getTopPadding(this.title)
    this.titleLeftPadding = this.getLeftPadding(this.title)
    console.log('topPadding:', this.topPadding)
    console.log('titleAlign:', this.titleAlign)
    return ({
      background: '../image/visited-poster.png',
      width: '470rpx',
      height: '842rpx',
      views: [{
        type: 'image',
        url: this.shareQrCode,
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
        css: {
          left: '110rpx',
          top: '40rpx',
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
        text: this.title,
        css: {
          left: `${this.titleLeftPadding + 30}rpx`,
          top: `${690 + this.topPadding}rpx`,
          fontSize: `${this.titleFontSize}rpx`,
          lineHeight: '32rpx',
          letterSpacing: `${this.titleLetterSpacing}rpx`,
          align: 'left',
          maxLines: 3,
          width: '300rpx',
          color: '#9A9A9A'
        }
      },
      {
        type: 'text',
        text: this.conclusion,
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
        type: 'image',
        url: this.conclusionUrl,
        css: {
          left: '100rpx',
          top: '220rpx',
          width: '272rpx',
          height: '272rpx'
          // mode: 'aspectFill'
        }
      }
      ]
    })
  }
}

