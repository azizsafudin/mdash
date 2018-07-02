<!--Remember to check ../widgets/index.js to import your widget-->

<!-- HTML goes here -->
<!--https://vuejs.org/v2/guide/syntax.html-->
<template>
  <div>
    <h3 class="is-size-5 is-unselectable" v-bind:class="theme">Example Widget</h3>
    <h5 class="is-size-7 is-unselectable" v-bind:class="theme">Hello World!</h5>
  </div>
</template>

<!-- Javascript goes here-->
<!--https://vuejs.org/v2/guide/components.html-->
<script>
import storage from '../../helpers/storage';    //  use this to access localStorage

const widget_name = 'example';                  //  make it same as file name for ease
const manifest =    {
                      name: widget_name,
                      description: 'Example widget',
//                      settings: {
//                        message: 'Hello world!',            //  Items in here will appear in the settings page. Use normal storage otherwise.
//                      },
                      layout: {                             //  this is the layout settings for vue-grid-layout (Not part of vue VM, just passing data)
                        /*  ---- Required parameters ---- */
                        i: widget_name,
                        x: 0,                               //  x position on load (starts at 0)
                        y: 0,                               //  y postion on load (starts at 0)
                        w: 2,                               //  how many columns wide is the widget
                        h: 2,                               //  how many rows tall is the widget
                        /*  ---- The rest of the params are optional (comment out if not using)---- */
//                        minW: 1,                            //  min width of widget
//                        minH: 1,                            //  min height of widget
//                        maxW: null,                         //  max width
//                        maxH: null,                         //  max height
//                        isResizable: false,                 //  is widget resizable?
//                        isDraggable: true,                  //  can widget be dragged?
//                        dragIgnoreFrom: 'a, button',        //  which elements should be ignored when trying to drag widget
//                        dragAllowFrom: null,                //  which elements should be used to drag widget
//                        resizeIgnoreFrom: 'a, button',      //  which elements should be ignored when resizing widget
                      },
                    };
export default {
  name: manifest.name,
  data: () => ({
//    settings: storage.getSettings(manifest.name),
    dark: storage.getSettings('mdash'),
  }),
  manifest: manifest, // REQUIRED
  computed: {
    theme(){
      return{
        'has-text-white': this.dark,
        'has-text-black': !this.dark,
      }
    }
  },
//  mounted() { },
//  methods: { },
//  watch: { },
};
// Check https://vuejs.org/v2/guide/components.html for more info

</script>

<!-- CSS goes here -->
<style scoped>
  /*Bulma.io classes are available*/
</style>
