
const state = {
  items: [],
  globalShow: false
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
  },
  setGlobalTrue (state) {
    state.globalShow = true
  },
  setGlobalFalse (state) {
    state.globalShow = false
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
