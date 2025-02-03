const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '', component: () => import('pages/loginPage.vue') },
      { path: 'studentInfo', component: () => import('pages/studentInfo.vue') },
      { path: 'studentRegister', component: () => import('pages/studentRegister.vue') },
      { path: 'studentInfoInput', component: () => import('pages/studentInfoInput.vue') },
      { path: 'courseInfo', component: () => import('pages/courseInfo.vue') },
      { path: 'registerCourse/:userId', component: () => import('pages/registerCourse.vue') },
      { path: 'reviewInfo', component: () => import('pages/reviewInfo.vue') },
      { path: 'queuingPage/:queueId', component: () => import('src/pages/queuingPage.vue') },
      { path: 'adminLogin', component: () => import('src/pages/adminLogin.vue') },
      { path: 'publicMonitor', component: () => import('src/pages/publicMonitor.vue') },
      { path: 'queueCourse', component: () => import('src/pages/queueCourse.vue') },
      { path: 'queueSummary/:queueId', component: () => import('src/pages/queueSummary.vue') },
    ],
  },
  {
    path: '/new',
    component: () => import('src/layouts/newLayout.vue'),
    children: [
      { path: 'dashboardPage', component: () => import('pages/dashboardPage.vue') },
      { path: 'addStudent', component: () => import('src/pages/addStudent.vue') },
      { path: 'addProgram', component: () => import('src/pages/addProgram.vue') },
      { path: 'queueAll', component: () => import('src/pages/backup/queueAll.vue') },
      { path: 'adminSettings', component: () => import('src/pages/adminSettings.vue') },
      { path: 'adminCreateAccount', component: () => import('src/pages/adminCreateAccount.vue') },
      { path: 'adminQueuePage', component: () => import('src/pages/adminQueuePage.vue') },
      { path: 'queueList', component: () => import('src/pages/queueList.vue') },

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
