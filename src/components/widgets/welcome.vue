
<template>
  <div>
    <div v-if="!isNameSet">
      <h3 class="title has-text-centered">Hello there, what's your name? </h3>
      <input
        v-model="newName" class="input myinput is-medium has-text-centered"
        type="text"
        @keyup.enter="submit"
        @focus="focus = true"
        @blur="focus = false"
        v-bind:class="{active: focus}">
    </div>
    <div v-else>
      <h5 class="title has-text-centered" v-if="!editMode">
        Welcome back, <span v-on:dblclick="editMode = true;" class="name">{{name}}</span>!
      </h5>
      <input
        v-model="newName" class="input myinput is-medium has-text-centered"
        type="text"
        @keyup.enter="submit"
        @keyup.esc="editMode = false"
        @focus="focus = true"
        @blur="focus = false"
        v-bind:class="{active: focus}"
        v-if="editMode"
        autofocus>
    </div>
  </div>
</template>

<script>
import storage from '../../helpers/storage';    //  use this to access localStorage

const widget_name = 'welcome';                  //  make it same as file name for ease
const manifest =    {
                      name: widget_name,
                      settings: {
                        name: '',
                      },
                      layout: {                             //  this is the layout settings for vue-grid-layout (Not part of vue VM, just passing data)
                        /*  ---- Required parameters ---- */
                        i: widget_name,
                        x: 8,                               //  x position on load (starts at 0)
                        y: 6,                               //  y postion on load (starts at 0)
                        w: 8,                               //  how many columns wide is the widget
                        h: 2,                               //  how many rows tall is the widget
                      }
                    };
export default {
  name: manifest.name,
  data: () => ({
    name: storage.getSettings(manifest.name).name,
    newName: storage.getSettings(manifest.name).name,
    focus: false,
    editMode: false,
  }),
  manifest: manifest, // REQUIRED
  methods:{
    submit(){
      storage.setSettings(manifest.name, {name: this.newName});
      this.name = this.newName;
      this.editMode = false;
    },
  },
  computed: {
    isNameSet() {
      return this.name.length > 0;
    }
  }
};

</script>

<style scoped>
  /*Bulma.io classes are available*/
  .myinput {
    background: transparent;
    border: none;
    box-shadow: none;
    border-bottom: rgba(0,0,0,0.2) solid 1px;
  }
  .active{
    border-bottom: rgba(0,0,0,0.7) solid 1px;
  }
  .name{
    cursor: pointer;
  }
</style>
