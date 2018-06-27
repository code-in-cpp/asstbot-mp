const state = {
  avatar: '/static/image/avatar.png',
  name: '小哒'
}

const getters = {
}

const mutations = {
  setAvatar (state, url) {
    state.avatar = url
  },
  setName (state, name) {
    state.name = name
  }
}

const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
