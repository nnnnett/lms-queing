const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'studentInfo', component: () => import('pages/studentInfo.vue') },
      { path: 'studentInfoInput', component: () => import('pages/studentInfoInput.vue') },
    ],
  },
  {
    path: '/new',
    component: () => import('src/layouts/newLayout.vue'),
    children: [],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
