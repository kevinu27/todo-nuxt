<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup>
// const Router = useRouter();


// Router.beforeEach((to, from, next) => {
//     console.log('to', to)
//     next()
// })

// const routes = [

//   {
//     path: '/protected',
//     name: 'protected',
//     component: () => import('pages/protected.vue'),
//     meta: { meta: {auth: true} }, // Add customObject to the meta object
//   },
//   Add more routes with custom properties as needed
// ];

// Middleware function
// const authMiddleware = ({ from, redirect, route }) => {
//   const authRequired = route.meta?.auth; // Access custom property from route.meta

//   if (authRequired && !authStore.token) {
//     return redirect('/auth');
//   }
// };

// Apply the middleware
// export default {
//   middleware: authMiddleware,
// };



</script>

<style >

</style>
