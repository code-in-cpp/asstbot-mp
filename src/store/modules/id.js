const state = {
  id: ''
}

const mutations = {
  saveId (state, id) {
    state.id = id
  }
}

const actions = {
  setId ({commit}, id) {
    commit('saveId', id)
  }
}

export default {
  state,
  mutations,
  actions
}
