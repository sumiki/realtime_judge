// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyCWMeMFRZrbvv8QqsYghwPaf50WDxoqjPY',
  authDomain: 'hello-e207d.firebaseapp.com',
  databaseURL: 'https://hello-e207d.firebaseio.com',
  projectId: 'hello-e207d',
  storageBucket: '',
  messagingSenderId: "492607833085"
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
