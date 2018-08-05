import Vue from 'vue';
import App from './App';
import storage from './helpers/storage'
import _ from 'lodash';
import config from './config';
import axios from 'axios';
import store from './store';

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
console.log('mdash: Settings loaded.');

//set default backgrounds
let bg = storage.get('mdash-background');
if(bg !== null) bg = _.merge(config.default_bg, bg);
else bg = config.default_bg;
storage.set('mdash-background', bg);
console.log('mdash: Background images loaded.');

storage.set('installed-0.1.1', true);
console.log('mdash: Current version: 0.1.1');



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  mounted() {
    //get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        let saved_pos = storage.get('mdash-location');
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}`;
        let obj = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        if(saved_pos === null || saved_pos !== null &&
          (saved_pos.latitude !== pos.coords.latitude  || saved_pos.longitude !== pos.coords.longitude || !saved_pos.city_long)){
          axios.get(url)
            .then(res => {
              let locality = res.data.results[0].address_components.filter(o => {
                return o.types.indexOf('locality') > -1;
              });
              let country = res.data.results[0].address_components.filter(o => {
                return o.types.indexOf('country') > -1;
              });
              if(locality.length > 0){
                obj.city_long = locality[0].long_name;
                obj.city_short = locality[0].short_name;
              }
              if(country.length > 0){
                obj.country_long = country[0].long_name;
                obj.country_short = country[0].short_name;
              }
              store.commit('SET_LOCATION', obj);
              console.log('mdash: Location updated successfully.');
            }).catch(e =>{
              store.commit('SET_LOCATION', obj);
              console.warn('mdash: API call failed. Stored coordinates without location name');
          });
        }
      });
    } else {
      console.warn("mdash: Geolocation is not supported by this browser.");
    }
  }
});
