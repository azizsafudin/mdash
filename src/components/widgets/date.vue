<template>
  <div class="main is-unselectable">
    <span class="title" v-bind:class="theme">{{date}}</span>
  </div>
</template>

<script>
import moment from 'moment';
import storage from '../../helpers/storage';
import store from '../../store';

const widget_name = 'date';
const manifest =  {
                    name: widget_name,        //  Widget name
                    description: 'Simple date widget',
                    settings: {
                      format: {
                        name: 'Date format',
                        value: 'dddd, Do MMMM YYYY',
                        tooltip: 'More info: momentjs.com',
                        type: 'string'
                      },
                    },
                    layout: {             //  default layout
                      i: widget_name,         //  Must be the same name
                      x: 8,
                      y: 7,
                      w: 8,
                      h: 1,
                    },
                  };

export default {
  name: manifest.name,
  data: () => ({
    date: '',
  }),
  manifest: manifest,
  computed: {
    settings(){
      return store.getters.settings[manifest.name];
    },
    dark(){
      return store.getters.settings.mdash.dark.value;
    },
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      };
    },
  },
  mounted() {
    this.date = moment().format(this.settings.format.value);
  },
  watch:{
    'settings.format.value'() {
      this.date = moment().format(this.settings.format.value)
    }
  }
};
</script>

<style scoped>
  .main {
    text-align: center;
    /*border: solid black 2px;*/
    /*height:300px;*/
    font-family: 'Lato', sans-serif;
  }
</style>
