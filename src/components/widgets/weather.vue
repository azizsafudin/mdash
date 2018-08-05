<template>
  <div class="main">
    <div class="item is-unselectable" v-if="tempF !== ''">
      <span :class="theme" class="is-size-4" v-if="!settings.metric.value">{{tempF}}</span>
      <span :class="theme" class="is-size-4" v-else>{{tempC}}</span>
      <span :class="theme" class="is-size-4">°</span>
      <span :class="theme" class="is-size-6" v-if="!settings.metric.value">F</span>
      <span :class="theme" class="is-size-6" v-else>C</span>
      <span :class="theme" class="is-size-7">{{location.city_long}}, {{location.country_short}}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import storage from '../../helpers/storage';
import store from '../../store';
import keys from '../../secret';

const api_url = 'https://api.openweathermap.org/data/2.5/weather?';
const api_key = keys.weather_api_key;
const widget_name = 'weather';
const manifest =  {
                    name: widget_name,        //  Widget name
                    description: 'Simple weather widget',
                    settings: {
                      metric: {
                        name: 'Use Celcius',
                        value: true,
                        type: 'boolean',
                      }
                    },
                    layout: {             //  default layout
                      i: widget_name,         //  Must be the same name
                      x: 22,
                      y: 1,
                      w: 2,
                      h: 2,
                    },
                  };

export default {
  name: manifest.name,
  data: () => ({
    location: storage.get('mdash-location') ,
    tempF: '',
    tempC: '',
  }),
  manifest: manifest,
  computed: {
    dark(){
      return store.getters.settings.mdash.dark.value;
    },
    settings(){
      return store.getters.settings[manifest.name];
    },
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      };
    }
  },
  mounted() {
    let weather = storage.get('weather');
    if(weather !== null){
      this.tempC = weather.tempC;
      this.tempF = weather.tempF;
    }

    let loc = storage.get('mdash-location');
    let url = api_url + 'lat='+loc.latitude+'&lon='+loc.longitude+'&units=metric&appid='+api_key;
    let make_call = false;

    if(weather !== null) {
      let now = moment(new Date());
      let last_checked = moment(new Date(storage.get('weather').last_checked));
      make_call = now.diff(last_checked, 'hours') > 3;
    }

    if (weather === null || make_call) {
        axios.get(url)
          .then(res => {
            console.log('mdash (Weather): Loaded weather data.');
            this.tempC = Math.round(res.data.main.temp * 10) / 10;
            this.tempF = this.c2f(res.data.main.temp);

            storage.set('weather', {
              last_checked: moment(new Date()),
              tempC: this.tempC,
              tempF: this.tempF,
            });
          });
      }

  },
  watch:{
    'settings.metric.value'(){
      if(this.settings.metric.value){

      }
    }
  },
  methods:{
    c2f(temp){
      return Math.round(((temp * (9/5)) + 32) * 10) / 10;
    }
  }
};
</script>

<style scoped>
  .main {
    width: 100px;
    height: 100px;
    text-align: center;
    font-family: 'Lato', sans-serif;
  }
  .item {
    margin:auto;
  }
</style>
