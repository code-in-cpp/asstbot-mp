
const state = {
  items: []
}

const getters = {
}

const mutations = {
  updateCheckboxData (state, obj) {
    state.items = [...obj.items]
  },
  clearState (state) {
    delete state.items
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
