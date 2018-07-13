
const state = {
  items: []
}

const getters = {
}

const mutations = {
  updateCheckboxData (state, obj) {
    state.items = [...obj.items]
    console.log('items数组的长度' + state.items.length)
  },
  clearState (state) {
    state.items = []
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
