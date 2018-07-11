
const state = {}

const getters = {
}

const mutations = {
  updateData (state, obj) {
    state.data = {...state.data, ...obj}
  }
}

const actions = {
}

export default{
  state,
  getters,
  mutations,
  actions
}
