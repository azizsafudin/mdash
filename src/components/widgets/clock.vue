<template>
  <div class="main is-unselectable">
    <div class="clockface" v-bind:class="theme">
      <span v-if="!settings.show24h.value">{{clock.time12h}}</span>
      <span v-else>{{clock.time24h}}</span>
      <span class="small" v-if="settings.showSeconds.value">{{clock.seconds}}</span>
      <span class="small" v-if="!settings.show24h.value">{{clock.label}}</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import store from '../../store';

const widget_name = 'clock';
const manifest =  {
                    name: widget_name,        //  Widget name
                    description: 'Simple clock widget',
                    settings: {
                      show24h: {
                        name: 'Show 24 hours',
                        value: true,
                        type: 'boolean',
                      },
                      showSeconds: {
                        name: 'Show seconds',
                        value: false,
                        type: 'boolean',
                      },
                    },
                    layout: {             //  default layout
                      i: widget_name,         //  Must be the same name
                      x: 7,
                      y: 3,
                      w: 10,
                      h: 3,
                    },
                  };

export default {
  name: manifest.name,
  data: () => ({
    clock: {
      time12h: '',
      time24h: '',
      seconds: '',
      label: '',
    },
  }),
  manifest: manifest,
  computed: {
    settings(){
      return store.getters.settings[manifest.name];
    },
    dark(){
      return store.getters.settings.mdash.dark.value
    },
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      };
    },
  },
  mounted() {
    this.setTime();
    this.setSeconds();
    setInterval(this.setTime(), 60000);   //  update time every minute.
    setInterval(this.setSeconds, 1000); //  update seconds every second.
  },
  methods: {
    setTime() {
      this.clock.time12h = moment().format('h:mm');
      this.clock.time24h = moment().format('H:mm')
      this.setLabel();
    },
    setSeconds(){
      this.clock.seconds = moment().format(':ss');
    },
    setLabel() {
      this.clock.label = moment().format('A');
    },
  },
};
</script>

<style scoped>
  .main {
    text-align: center;
    font-family: 'Lato', sans-serif;
  }
  .clockface {
    font-size: 9rem;
  }
  .clockface .small {
    font-size: 3rem;
    margin-left:-0.5em;
  }
</style>
