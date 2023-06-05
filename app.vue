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
    title: "this is the title",
    link: [
      // {
      //   href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
      //   rel: "stylesheet",
      //   integrity: "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
      //   crossorigin: "anonymous"
      // },
      { 
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
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
