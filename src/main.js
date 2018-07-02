import Vue from 'vue';
import App from './App';
import storage from './helpers/storage'

Vue.config.productionTip = false;

const default_settings = {
  dark: {
    name: 'Dark mode',
    value: true,
    type: 'boolean',
  },
  setDefault: {
    name: 'Always set default widgets when dash is empty',
    value: true,
    type: 'boolean',
  },
};

//set default mdash settings
let settings = storage.getSettings('mdash');
if(settings !== null) settings = Object.assign({}, default_settings, settings);
else settings = default_settings;
storage.setSettings('mdash', settings);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
