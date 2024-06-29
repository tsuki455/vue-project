import { createWebHistory, createRouter } from 'vue-router';

import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Computed from '@/views/computed.vue';
import Hello from '@/views/HelloWorld.vue';
import Form from '@/views/formModel.vue';
// import Life from '@/views/life.vue';

const routes = [
  { path: '/', redirect: '/base' },
  { path: '/base', component: Base },
  { path: '/list', component: List },
  { path: '/computed', component: Computed },
  { path: '/list', component: List },
  { path: '/hello', component: Hello },
  { path: '/form', component: Form },
  { path: '/life', component: () => import('@/views/life.vue') },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      title: '用户详情'
    },
    component: () => import('@/views/user.vue')
  },
  {
    path: '/fa',
    component: () => import('@/views/father.vue'),
    children: [
      {
        path: 'son',
        component: () => import('@/views/son.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;