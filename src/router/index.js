import Vue from 'vue'
import Router from 'vue-router'
import plotdemo from '@/components/plotdemo'
import mapdemo from '@/components/mapdemo'
import concernedperioddemo from '@/components/concernedperioddemo'
import projectintroduction from '@/components/projectintro'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/aqstmap/mapdemo'
    },
    {
      path: '/aqstmap',
      redirect: '/aqstmap/mapdemo'
    },
    {
      path: '/aqstmap/mapdemo',
      name: 'mapdemo',
      component: mapdemo
    },
    {
      path: '/aqstmap/plotdemo',
      name: 'plotdemo',
      component: plotdemo
    },
    {
      path: '/aqstmap/concernedperioddemo',
      name: 'concernedperioddemo',
      component: concernedperioddemo
    },
    {
      path: '/aqstmap/projectintroduction',
      name: 'projectintroduction',
      component: projectintroduction
    }
  ]
})
