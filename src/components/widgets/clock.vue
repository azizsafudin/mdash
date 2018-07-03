<template>
  <div class="main is-unselectable">
    <div class="clockface" v-bind:class="theme">{{clock.time}}<span class="small">{{clock.seconds}}</span>
      <span class="small">{{clock.label}}</span>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import storage from '../../helpers/storage';

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
      time: '',
      seconds: '',
      label: '',
    },
    dark: storage.getSettings('mdash').dark.value,
    settings: storage.getSettings(manifest.name),
  }),
  manifest: manifest,
  computed: {
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      };
    }
  },
  mounted() {
    this.load();
    setInterval(this.getTime, 60000); //  update time every minute.
    if(this.settings.showSeconds.value) setInterval(this.getSeconds, 1000); //  update seconds every second.
  },
  methods: {
    getTime() {
      let format = this.settings.show24h.value ? 'H:mm' : 'h:mm';
      this.clock.time = moment().format(format);
      this.getLabel();
    },
    getSeconds(){
      if(this.settings.showSeconds.value)this.clock.seconds = moment().format(':ss');
    },
    getLabel() {
      if(!this.settings.show24h.value)this.clock.label = moment().format('A');
    },
    load() {
      this.getTime();
      this.getSeconds();
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
    font-size: 4rem;
  }
</style>
