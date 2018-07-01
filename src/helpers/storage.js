export default {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      throw e;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      throw e;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      throw e;
    }
  },
  getSettings(widget){
    try {
      let settings = JSON.parse(localStorage.getItem('mdash-settings'));
      if(settings === null) return false;
      if(settings[widget]) return settings[widget];
      else return false;
    } catch (e) {
      throw e;
    }
  },
  setSettings(widget, val){
    try {
      let settings = JSON.parse(localStorage.getItem('mdash-settings'));
      if(settings === null) settings = {};
      settings[widget] = val;
      localStorage.setItem('mdash-settings', JSON.stringify(settings));
    } catch (e) {
      throw e;
    }
  },
  getLayout(){
    try {
      return JSON.parse(localStorage.getItem('mdash-layout'));
    } catch (e) {
      throw e;
    }
  },
  setLayout(val){
    try {
      localStorage.setItem('mdash-layout', JSON.stringify(val));
    } catch (e) {
      throw e;
    }
  }
};
