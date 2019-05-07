import Main from '@/components/main'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'dashboard',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/dashboard/home')
      }
    ] 
  },
  {
    path: '/securityLog',
    name: 'securityLog',
    meta: {
      icon: 'logo-buffer',
      title: '第三方安全日志'
    },
    component: Main,
    children: [
      {
        path: 'NEU',
        name: 'neu',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: 'NEU'
        },
        component: () => import('@/views/securityLog/NEU/neu.vue')
      },
      {
        path: 'USTC',
        name: 'ustc',
        meta: {
          icon: 'md-trending-up',
          title: 'USTC'
        },
        component: () => import('@/views/securityLog/USTC/ustc.vue')
      },
      {
        path: 'CNCert',
        name: 'cncert',
        meta: {
          icon: 'ios-infinite',
          title: 'CNCert'
        },
        component: () => import('@/views/securityLog/CNCert/cncert.vue')
      },
      {
        path: '360',
        name: '360',
        meta: {
          icon: 'md-list',
          title: '360'
        },
        component: () => import('@/views/securityLog/360/log360.vue')
      }
    ]
  },
  {
    path: '/statistics',
    // name: 'Static',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'static_analyse',
        name: 'statistics',
        meta: {
          icon: 'ios-document',
          title: '数据统计'
        },
        component: () => import('@/views/statistics/statistics.vue')
      }
    ]
  },
  {
    path: '/dataFilter',
    // name: 'Filter',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'filter_analyse',
        name: 'firstFilter',
        meta: {
          icon: 'ios-hammer',
          title: '初次筛选'
        },
        component: () => import('@/views/dataFilter/firstFilter.vue')
      }
    ]
  },  
  {
    path: '/abnormal',
    // name: 'Abnormal',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'abnormal_analyse',
        name: 'abnormal',
        meta: {
          icon: 'ios-bug',
          title: '异常检测'
        },
        component: () => import('@/views/abnormal/abnormal.vue')
      }
    ]
  }
]

