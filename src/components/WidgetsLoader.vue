<template>
  <div>
    <component :is="widgetName"></component>
  </div>
</template>

<script>
  import * as components from './widgets'
  import storage from '../helpers/storage'

  let layout = [];

  if(storage.get('mdash-layout') === null) {
    for (let key in components) {
      let obj = components[key];
      if (!obj.manifest)
        console.log('mdash: Missing manifest for "' + obj.name + '" widget.');
      else if (obj.manifest.layout)
        layout.push(obj.manifest.layout);
      else console.log('mdash: Missing layout for "' + obj.name + '" widget.');
    }
    storage.set('mdash-layout', layout);
  }else layout = storage.get('mdash-layout');

  //Loading default widget settings
  for (let key in components) {
    let obj = components[key];
    if (!storage.getSettings(key) && obj.manifest.settings) {
      storage.setSettings(key, obj.manifest.settings);
    }
  }

  export default {
    name: "WidgetsLoader",
    components,
    props: {
      widgetName: { type: String, required: true }
    },
    layout: layout,
  }
</script>
