import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import FileSaver from "file-saver"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(FileSaver)

new Vue({
  el: '#app',
  render: h => h(App)
})
