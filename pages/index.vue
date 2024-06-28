<template>
  <section class="container mx-auto">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-400 sm:text-5xl md:text-6xl pt-6 text-right">Paris 2024</h1>
    <UDivider class="mt-5">
      <span class="text-xl">Timezone / Locale</span>
    </UDivider>
    <settings-component class="mt-5"/>
    <UDivider class="mt-5">
      <span class="text-xl">Filters</span>
    </UDivider>
    <day-list-component class="mt-5"/>
    <sport-list-component class="mt-5 mb-5"/>
    <UDivider>
      <span class="text-xl">Events</span>
    </UDivider>
    <event-list-component class="mt-5"/>
  </section>
</template>
<script setup lang="ts">
import SportListComponent from "~/components/SportListComponent.vue";
import EventListComponent from "~/components/EventListComponent.vue";
import SettingsComponent from "~/components/SettingsComponent.vue";

const store = useProgramStore()

onMounted(() => {
  store.loadProgram()
})
</script>