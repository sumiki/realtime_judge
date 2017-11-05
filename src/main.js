// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router/index'
import firebase from './firebase'
import store from './store'

Vue.config.productionTip = false

Vue.use( VueFire )

let app;
firebase.auth().onAuthStateChanged(function(user){

  if( !app ){
    store.commit('setUser', user || false);
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
      store: store
    })
  }
})
/* eslint-disable no-new */
