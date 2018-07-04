import Vue from 'vue';
import Vuex from 'vuex';
import storage from '../helpers/storage';

Vue.use(Vuex);

const SET_SETTINGS = 'SET_SETTINGS';
const REFRESH_SETTINGS = 'REFRESH_SETTINGS';
const SET_LOCATION = 'SET_LOCATION';
const SET_LAYOUT = 'SET_LAYOUT';

const store = new Vuex.Store({
  state: {
    settings: storage.get('mdash-settings'),
    location: storage.get('mdash-location'),
    layout: storage.get('mdash-layout'),
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
      storage.set('mdash-settings', payload);
    },
    [REFRESH_SETTINGS] (state) {
      state.settings = storage.get('mdash-settings');
    },
    [SET_LOCATION] (state, payload) {
      state.lang = payload;
      storage.set('mdash-location', payload);
    },
    [SET_LAYOUT] (state, payload){
      state.layout = payload;
      storage.set('mdash-layout', payload);
    }
  },
});
export default store;
