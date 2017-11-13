import Vue from 'vue'
import Router from 'vue-router'

import Judges from '@/components/Judges'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
import firebase from '../firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        specificPage: true
      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      meta: {
        specificPage: true
      }
    },
    {
      path: '/judges',
      name: 'Judges',
      component: Judges,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdminAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  var adminUser = false;
  if( currentUser && currentUser.email === "sumikio@gmail.com" ){
    adminUser = true
  }
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth )
  let requiresAdminAuth = to.matched.some( record => record.meta.requiresAdminAuth )
  let specificPage = to.matched.some( record => record.meta.specificPage )

  if ( requiresAuth && !currentUser ) next('login')
  else if( !requiresAdminAuth && adminUser ) next('admin')
  else if( !requiresAuth && currentUser  ) next('judges')
  else if( specificPage  ) next()
  else next()

})

export default router
