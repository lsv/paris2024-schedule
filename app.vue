<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#ffc40d' },
    { name: 'theme-color', content: '#ffffff' },
  ],
})
useSeoMeta({
    title: 'Paris 2024 - Schedule',
    description: 'Olympic games schedule for Paris 2024',
    ogTitle: 'Paris 2024 - Schedule',
    ogDescription: 'Olympic games schedule for Paris 2024',
})
</script>