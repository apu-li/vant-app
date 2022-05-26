export default {
  namespaced: true,
  state: {
    isLogined: localStorage.getItem('app-data') ? true : false,
  },
  getters: {},
  mutations: {
    changeIsLogined(state, val) {
      state.isLogined = val;
    },
  },
};
