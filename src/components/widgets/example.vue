<!--Remember to check ../widgets/index.js to import your widget-->

<!-- HTML goes here -->
<!--https://vuejs.org/v2/guide/syntax.html-->
<template>
  <div>
    <h3 class="title">Example Widget</h3>
    <h5 class="subtitle">{{settings.message}}</h5>
  </div>
</template>

<!-- Javascript goes here-->
<!--https://vuejs.org/v2/guide/components.html-->
<script>
import storage from '../../helpers/storage';    //  use this to access localStorage

const widget_name = 'example';                  //  make it same as file name for ease
const manifest =    {
                      name: widget_name,
                      settings: {
                        message: 'Hello world!',
                      },
                      layout: {                             //  this is the layout settings for vue-grid-layout (Not part of vue VM, just passing data)
                        /*  ---- Required parameters ---- */
                        i: widget_name,
                        x: 0,                               //  x position on load (starts at 0)
                        y: 0,                               //  y postion on load (starts at 0)
                        w: 3,                               //  how many columns wide is the widget
                        h: 1,                               //  how many rows tall is the widget
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
    settings: storage.getSettings(manifest.name),
  }),
  manifest: manifest, // REQUIRED
//  computed: { },
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
