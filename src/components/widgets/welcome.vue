
<template>
  <div>
    <div v-if="!isNameSet" class="main">
      <h3 class="title has-text-centered is-unselectable" v-bind:class="theme">{{msg.first_greeting}}</h3>
      <input
        v-model="newName" class="input myinput is-medium has-text-centered"
        type="text"
        @keyup.enter="submit"
        v-bind:class="theme"
      >
    </div>
    <div v-else>
      <h5 class="title has-text-centered is-unselectable" v-if="!editMode" v-bind:class="theme">
        {{greeting}} <span v-on:dblclick="editMode = true;" class="name">{{name}}</span>.
      </h5>
      <input
        v-model="newName" class="input myinput is-medium has-text-centered"
        type="text"
        @keyup.enter="submit"
        @keyup.esc="editMode = false"
        v-bind:class="theme"
        v-if="editMode"
        autofocus>
    </div>
  </div>
</template>

<script>
import storage from '../../helpers/storage';    //  use this to access localStorage
import moment from 'moment';

const widget_name = 'welcome';                  //  make it same as file name for ease
const manifest =    {
                      name: widget_name,
                      description: 'Welcome message widget',
                      layout: {
                        i: widget_name,
                        x: 8,
                        y: 7,
                        w: 8,
                        h: 1,
                      }
                    };
export default {
  name: manifest.name,
  data: () => ({
    name: storage.get(manifest.name),
    newName: storage.get(manifest.name),
    dark: storage.getSettings('mdash').dark.value,
    editMode: false,
    msg: {
      first_greeting: 'Hello there, what\'s your name?',
    }
  }),
  manifest: manifest, // REQUIRED
  methods:{
    submit(){
      storage.set(manifest.name, this.newName);
      this.name = this.newName;
      this.editMode = false;
    },
    getGreetingTime (m) {
      let g = null; //return g

      if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      let split_afternoon = 12 //24hr time to split the afternoon
      let split_evening = 17 //24hr time to split the evening
      let currentHour = parseFloat(m.format("HH"));

      if(currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "afternoon";
      } else if(currentHour >= split_evening) {
        g = "evening";
      } else {
        g = "morning";
      }
      return g;
    }
  },
  computed: {
    greeting(){
      return 'Good ' + this.getGreetingTime(moment()) +',';
    },
    isNameSet() {
      return this.name === null ? null: this.name.length > 0;
    },
    theme(){
      return {
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
        'dark' : this.dark,
      }
    }
  }
};

</script>

<style scoped>
  /*Bulma.io classes are available*/
  .title{
    font-family: 'Lato', sans-serif;
  }
  .myinput {
    background: transparent;
    border: none;
    box-shadow: none;
    border-bottom: rgba(0,0,0,0.2) solid 2px;
  }
  .myinput.dark {
    border-bottom: rgba(255,255,255,0.2) solid 2px;
  }
  .myinput.active{
    border-bottom: rgba(0,0,0,0.7) solid 2px;
  }
  .name{
    cursor: pointer;
  }
</style>
