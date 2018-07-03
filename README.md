# ﷽

# —mdash

A fully customisable dashboard for your browser.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# Copy `manifest.json` into the `/dist folder
# install in chrome by dragging and dropping the /dist folder in chrome://extensions
```
## Making your own widget
Go to [src/components/widgets/](src/components/widgets/) and make a `<your_widget_name>.vue` file. See `clock.vue` and `example.vue` for examples.

Your vue component needs to have a manifest parameter with the following structure:
```javascript
//  src/components/widgets/mywidget.vue
const widget_name = 'mywidget';
const manifest =  {
                    name: widget_name,       //  widget name same as file name
                    description: 'My amazing widget',
                    settings: {             //  optional settings
                      optionOne:{
                        name: 'First option',
                        value: true,
                        tooltip: 'An optional tooltip to explain more.',
                        type: 'boolean',
                      },
                      optionTwo:{
                        name: 'The second choice',
                        value: 'This is a string',
                        type: 'string',
                      }
                    },
                    layout: {               //  default layout
                      i: widget_name,        //  Must be the same name as above
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

Open [src/components/widgets/index.js](src/components/widgets/index.js) and add your widget there.
```javascript
//  src/components/widgets/index.js
export { default as mywidget } from './mywidget.vue' //  Add your widget here.
export { default as widget1 } from './widget1.vue'
export { default as widget2 } from './widget2.vue'
...
export { default as widgetN } from './widgetN.vue'
//                    ^                   ^
//  All names here MUST be the same as the name in the manifest.
//  This means that widgets can only have one word names.
//  Use underscores for names with spaces.
```

## Helpers

```javascript
import storage from 'src/helpers/storage';

//get dark mode flag from mdash settings. (Kind of important to make your widget react to user selecting dark mode)
let dark_mode = storage.getSettings('mdash').dark.value;

//save arbitrary data for your widget to localStorage
storage.set('my_widget', data);
```

## Settings
The `settings` key in the manifest allows you to let users change and set certain preferences for your widget.
These options will appear in the settings tab. This is different from normal getting and setting `storage`, since those data won't appear in the settings tab.

```javascript
//get settings (defined above in manifest) for your widget
let my_widget_settings = storage.getSettings('mywidget');

//save changes to my widget's settings
storage.setSettings('mywidget');
```
Use `storage.getSettings(widget_name).<setting>.value` to access saved settings for your own widget. 
Or `storage.getSettings('mdash').<setting>.value` for mdash settings.

```javascript
//manifest
settings: {             
            optionOne:{
              name: 'First option',             //  a human readable label for this setting    
              value: true,                      //  default value (this will be changed by the user)
              tooltip: 'This is a tooltip.',    //  tooltip to display more info about the setting
              type: 'boolean',                  //  type of setting: boolean or string (for now).
            }
``` 

## Other notes
For now you have to use `localStorage.clear()` every time you make a change to your widget's manifest for changes to take effect (basically resetting everything).

Widget names have to be unique, check `widgets/index.js` to make sure yours is unique.

## To do
- Add a way to select background image
- More widgets
    - Prayer time
    - Quotes
    - To do list
    - Suggest more! (Make a github issue)
