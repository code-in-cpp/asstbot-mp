
const state = {
  items: [],
  event: null,
  globalShow: false,
  previewShow: true
}

const getters = {
}

const mutations = {
  updateCheckboxData (state, obj) {
    state.items = [...obj.items]
    state.event = obj.event
  },
  clearState (state) {
    state.items = []
  },
  setGlobalTrue (state) {
    state.globalShow = true
  },
  setGlobalFalse (state) {
    state.globalShow = false
  },
  setPreviewFalse (state) {
    state.previewShow = false
  },
  setPreviewTrue (state) {
    state.previewShow = true
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
