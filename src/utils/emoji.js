/* eslint-disable */

function emojiParse (text) {
  const emojiMap = {
    '微笑': 'qqface0',
    '撇嘴': 'qqface1',
    '色': 'qqface2',
    '发呆': 'qqface3',
    '得意': 'qqface4',
    '流泪': 'qqface5',
    '害羞': 'qqface6',
    '闭嘴': 'qqface7',
    '睡': 'qqface8',
    '大哭': 'qqface9',
    '尴尬': 'qqface10',
    '发怒': 'qqface11',
    '调皮': 'qqface12',
    '呲牙': 'qqface13',
    '惊讶': 'qqface14',
    '难过': 'qqface15',
    '酷': 'qqface16',
    '冷汗': 'qqface17',
    '抓狂': 'qqface18',
    '吐': 'qqface19',
    '偷笑': 'qqface20',
    '愉快': 'qqface21',
    '白眼': 'qqface22',
    '傲慢': 'qqface23',
    '饥饿': 'qqface24',
    '困': 'qqface25',
    '惊恐': 'qqface26',
    '流汗': 'qqface27',
    '憨笑': 'qqface28',
    '悠闲': 'qqface29',
    '奋斗': 'qqface30',
    '咒骂': 'qqface31',
    '疑问': 'qqface32',
    '嘘': 'qqface33',
    '晕': 'qqface34',
    '疯了': 'qqface35',
    '衰': 'qqface36',
    '骷髅': 'qqface37',
    '敲打': 'qqface38',
    '再见': 'qqface39',
    '擦汗': 'qqface40',
    '抠鼻': 'qqface41',
    '鼓掌': 'qqface42',
    '糗大了': 'qqface43',
    '坏笑': 'qqface44',
    '左哼哼': 'qqface45',
    '右哼哼': 'qqface46',
    '哈欠': 'qqface47',
    '鄙视': 'qqface48',
    '委屈': 'qqface49',
    '快哭了': 'qqface50',
    '阴险': 'qqface51',
    '亲亲': 'qqface52',
    '吓': 'qqface53',
    '可怜': 'qqface54',
    '菜刀': 'qqface55',
    '西瓜': 'qqface56',
    '啤酒': 'qqface57',
    '篮球': 'qqface58',
    '乒乓': 'qqface59',
    '咖啡': 'qqface60',
    '饭': 'qqface61',
    '猪头': 'qqface62',
    '玫瑰': 'qqface63',
    '凋谢': 'qqface64',
    '嘴唇': 'qqface65',
    '爱心': 'qqface66',
    '心碎': 'qqface67',
    '蛋糕': 'qqface68',
    '闪电': 'qqface69',
    '炸弹': 'qqface70',
    '刀': 'qqface71',
    '足球': 'qqface72',
    '瓢虫': 'qqface73',
    '便便': 'qqface74',
    '月亮': 'qqface75',
    '太阳': 'qqface76',
    '礼物': 'qqface77',
    '拥抱': 'qqface78',
    '强': 'qqface79',
    '弱': 'qqface80',
    '握手': 'qqface81',
    '胜利': 'qqface82',
    '抱拳': 'qqface83',
    '勾引': 'qqface84',
    '拳头': 'qqface85',
    '差劲': 'qqface86',
    '爱你': 'qqface87',
    'NO': 'qqface88',
    'OK': 'qqface89',
    '爱情': 'qqface90',
    '飞吻': 'qqface91',
    '跳跳': 'qqface92',
    '发抖': 'qqface93',
    '怄火': 'qqface94',
    '转圈': 'qqface95',
    '磕头': 'qqface96',
    '回头': 'qqface97',
    '跳绳': 'qqface98',
    '投降': 'qqface99',
    '激动': 'qqface100',
    '乱舞': 'qqface101',
    '献吻': 'qqface102',
    '左太极': 'qqface103',
    '右太极': 'qqface104'
  }

  var reg = new RegExp(/[\'\[]?([^\[\[\]\]]*)[\'\]]?/i)
  var arr = text.split(reg)
  var node
  var nodeList = []
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i]
    node = {}
    if (str === '') continue
    if (emojiMap[str]) {
      node.node = 'emoji'
      node.txt = emojiMap[str]
    } else {
      node.node = 'text'
      node.txt = str
    }
    nodeList.push(node)
  }
  return nodeList
}

module.exports = {
  parseText: emojiParse
}
