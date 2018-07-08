const state = {
  is_iphonex: false
}

const mutations = {
  save_dev_info (state, flag) {
    state.is_iphonex = flag
  }
}

const actions = {
  update_device_info ({commit}, flag) {
    commit('save_dev_info', flag)
  }
}

export default {
  state,
  mutations,
  actions
}
