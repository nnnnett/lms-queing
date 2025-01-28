const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'studentInfo', component: () => import('pages/studentInfo.vue') },
      { path: 'studentInfoInput', component: () => import('pages/studentInfoInput.vue') },
      { path: 'courseInfo', component: () => import('pages/courseInfo.vue') },
      { path: 'reviewInfo', component: () => import('pages/reviewInfo.vue') },
      { path: 'queuingPage', component: () => import('src/pages/queuingPage.vue') },
      { path: 'adminLogin', component: () => import('src/pages/adminLogin.vue') },
    ],
  },
  {
    path: '/new',
    component: () => import('src/layouts/newLayout.vue'),
    children: [
      { path: 'dashboardPage', component: () => import('pages/dashboardPage.vue') },
      { path: 'addStudent', component: () => import('src/pages/addStudent.vue') },
      { path: 'addProgram', component: () => import('src/pages/addProgram.vue') },
      { path: 'queueAll', component: () => import('src/pages/queueAll.vue') },
      { path: 'adminSettings', component: () => import('src/pages/adminSettings.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
