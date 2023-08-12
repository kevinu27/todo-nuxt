<template>
  <div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup>
 useHead({
    title: "TO DO APP",
    
    link: [
      { 
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        
      },
      {
      style: 'stylesheet',
      href: '/Projects/Nuxt/todolist/.nuxt/fonts.css',
    }, 
    {
      style: 'stylesheet',
      href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
    }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
        crossorigin: "anonymous"
      },
      { src: 'https://code.jquery.com/jquery-3.6.0.min.js' },
    { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js' }
    ]
  })


</script>

<style >

</style>
