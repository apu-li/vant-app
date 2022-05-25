import Vue from 'vue';
import Vuex from 'vuex';
import showShadow from './showShadow';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    showShadow,
  },
});
