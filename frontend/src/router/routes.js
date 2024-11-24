import Events from '@/views/events/index.vue'
import Login from '@/views/Login.vue'


export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'events' },
    children: [
      {
        path: 'events',
        name: 'events',
        component: Events,
        meta: {
          icon: 'mdi-calendar'
        }
      },
    ]
  },
  { path: '/login', name: 'login', component: Login },
]
