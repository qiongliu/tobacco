import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login'
import Index from 'pages/index'
import Gis from 'pages/gis'
import BigGis from 'pages/big-gis'
import Farmland from 'pages/farmland'
import Subject from 'pages/subject'
import Management from 'pages/management'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/gis',
          name: 'Gis',
          component: Gis
        },{
          path: '/bigGis',
          name: 'BigGis',
          component: BigGis
        },{
          path: '/farmland',
          name: 'Farmland',
          component: Farmland
        },{
          path: '/subject',
          name: 'Subject',
          component: Subject
        },{
          path: '/management',
          name: 'Management',
          component: Management
        },
      ]
    }
  ]
})
