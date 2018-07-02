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
    name: 'Set default widgets',
    value: true,
    type: 'boolean',
  },
};

Vue.filter('truncate', function (string, value) {
  if (string && string.length > value - 3) return string.substring(0, value) + '...';
  else return string;
});

Vue.filter('underscore-space', function (string) {
    return string.replace(/_/g, ' ');
});

//set default mdash settings
let settings = storage.getSettings('mdash');
if(settings !== null) settings = Object.assign({}, default_settings, settings);
else settings = default_settings;
storage.setSettings('mdash', settings);
storage.set('installed-0.1.0', true);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
