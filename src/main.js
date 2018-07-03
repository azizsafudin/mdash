import Vue from 'vue';
import App from './App';
import storage from './helpers/storage'
import _ from 'lodash'
import config from './config'
Vue.config.productionTip = false;


Vue.filter('truncate', function (string, value) {
  if (string && string.length > value - 3) return string.substring(0, value) + '...';
  else return string;
});

Vue.filter('underscore-space', function (string) {
    return string.replace(/_/g, ' ');
});

//set default mdash settings
let settings = storage.getSettings('mdash');
if(settings !== null) settings = Object.assign({}, config.default_settings, settings);
else settings = config.default_settings;
storage.setSettings('mdash', settings);

//set default backgrounds
let bg = storage.get('mdash-background');
if(bg !== null) bg = _.merge(config.default_bg, bg);
else bg = config.default_bg;
storage.set('mdash-background', bg);

storage.set('installed-0.1.0', true);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
