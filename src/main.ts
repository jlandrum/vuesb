import Vue from 'vue';
import App from './App.vue';

import Icon from './features/icons';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
