<template>
    <USelectMenu
      v-model="selected"
      searchable
      searchable-placeholder="Search a timezone..."
      placeholder="Select a timezone..."
      :options="timezones" />
</template>

<script setup lang="ts">
import {useTimezoneStore} from "~/stores/timezoneStore";

const store = useTimezoneStore()
const selected = ref(store.timezone)
const timezones = Intl.supportedValuesOf('timeZone')

watch(selected, (newVal: string) => {
  store.setTimezone(newVal)
})
</script>