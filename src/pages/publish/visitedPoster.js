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
    this.conclusionUrl = conclusionUrl
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
          top: '686rpx',
          width: '140rpx',
          height: '140rpx'
        }
      }
      ]
    })
  }
}

