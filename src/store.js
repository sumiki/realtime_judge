import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    currentHeat: {}
  },
  mutations: {
    setUser (state, value) {
      state.user = value;
    },
    setCurrentHeat( state, heat ){
      state.currentHeat = heat;
    }
  },
});
