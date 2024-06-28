<template>
    <USelectMenu
      v-model="selected"
      searchable
      searchable-placeholder="Search a locale..."
      placeholder="Select a locale..."
      option-attribute="name"
      :options="locales" />
</template>

<script setup lang="ts">
import localeData from "dayjs/locale.json";
const store = useLocaleStore()
const selected = ref(store.locale)

const locales = localeData.filter((l) => !l.key.includes('-'))

watch(selected, (newVal) => {
  store.setLocale(newVal)
})
</script>