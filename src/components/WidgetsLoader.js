import * as components from './widgets' // taken from ./widgets/index.js
import storage from '../helpers/storage'
import _ from 'lodash'

let widget_list = [];
let layout = [];
let saved_layout = storage.get('mdash-layout');

for (let key in components) {
  let obj = components[key];
  if (!obj.manifest)
    console.error(`mdash: Missing manifest for ${obj.name ? obj.name : 'this'} widget.`);
  else if (obj.manifest.layout) {
    let item = _.find(saved_layout, function (o) {
      return o.i === obj.manifest.name
    });
    if (item)
      layout.push(item);
  }

  //  load user settings for this widget if exists.
  if (!storage.getSettings(key) && obj.manifest.settings) {
    storage.setSettings(key, obj.manifest.settings);
  }
  widget_list.push(obj.manifest);
}

if(saved_layout === null || saved_layout.length === 0) {
  layout.push(components.clock.manifest.layout);
  layout.push(components.welcome.manifest.layout);
}
storage.set('mdash-layout', layout);

export default {
  layout: layout,
  list: widget_list,
}
