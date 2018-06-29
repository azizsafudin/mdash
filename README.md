# ﷽

# mdash

> A dashboard for chrome browser

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# install in chrome by dragging and dropping the /dist folder in chrome://extensions
```

## Making your own widget
Go to `src/components/widgets/` and make a `<your_widget_name>.vue` file. See `clock.vue` and `example.vue` for examples.

Your vue component needs to have a manifest parameter with the following structure:
```javascript
//  src/components/widgets/mywidget.vue
const manifest =  {
                    name: 'mywidget',       //  widget name same as file name
                    settings: {             //  optional settings
                    },
                    layout: {               //  default layout
                      i: 'mywidget',        //  Must be the same name as above
                      x: 3,
                      y: 1,
                      w: 6,
                      h: 3,
                    },
                  };
```
+ More info on `layout` [here](https://github.com/jbaysolutions/vue-grid-layout#griditem).
+ `layout` determines the initial position and size of your widget on the dashboard.

Don't forget to add `manifest` to your component.
```javascript
//  src/components/widgets/mywidget.vue
export default {
  name: manifest.name,
  ...
  manifest: manifest,
  ...
}
```

Open `src/components/widgets/index.js` and add your widget there.
```javascript
//  src/components/widgets/index.js
export { default as mywidget } from './mywidget.vue' //  Add your widget here.
export { default as widget1 } from './widget1.vue'
export { default as widget2 } from './widget2.vue'
...
export { default as widgetN } from './widgetN.vue'
```

For now you have to use `localStorage.clear()` every time you make a change to your widget's manifest for changes to take effect (basically resetting everything).

Widget names have to be unique, check `widgets/index.js` to make sure yours is unique, if not one will override the other.