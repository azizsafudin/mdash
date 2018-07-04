import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SET_SETTINGS = 'SET_SETTINGS';
const REFRESH_SETTINGS = 'REFRESH_SETTINGS';
const SET_LOCATION = 'SET_LOCATION';
const SET_LAYOUT = 'SET_LAYOUT';

const store = new Vuex.Store({
  state: {
    settings: JSON.parse(localStorage.getItem('mdash-settings')),
    location: JSON.parse(localStorage.getItem('mdash-location')),
    layout: JSON.parse(localStorage.getItem('mdash-layout')),
  },
  getters: {
    location: state => {
      return state.location;
    },
    settings: state => {
      return state.settings;
    },
    layout: state => {
      return state.layout;
    }
  },
  mutations: {
    [SET_SETTINGS] (state, payload) {
      state.settings = payload;
      localStorage.setItem('mdash-settings', JSON.stringify(payload));
    },
    [REFRESH_SETTINGS] (state) {
      state.settings = JSON.parse(localStorage.getItem('mdash-settings'));
    },
    [SET_LOCATION] (state, payload) {
      state.lang = payload;
      localStorage.setItem('mdash-location', JSON.stringify(payload));
    },
    [SET_LAYOUT] (state, payload){
      state.layout = payload;
      localStorage.setItem('mdash-layout', JSON.stringify(payload));
    }
  },
});
export default store;
