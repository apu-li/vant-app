export default {
  namespaced: true,
  state: {
    isShowShadow: false,
  },
  getters: {},
  mutations: {
    hdIsShowShadow(state, val) {
      state.isShowShadow = val;
    },
  },
};
