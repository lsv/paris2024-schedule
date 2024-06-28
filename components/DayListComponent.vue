<template>
  <UFormGroup>
    <USelectMenu
      v-model="selected"
      searchable
      searchable-placeholder="Search for a day..."
      :options="options"
      multiple
      :loading="store.loading"
    >
      <template #label>
        <span v-if="selected.length" class="truncate">{{ selected.map(d => $dayjs(d).format(dateformat)).join(', ') }}</span>
        <span v-else>Select days</span>
      </template>
      <template #option="{ option: date }">
        <span class="truncate">{{ $dayjs(date).format(dateformat) }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
<script setup lang="ts">
import {FilterTypeEnum} from "~/models/FilterModel";

const dateformat = 'ddd, MMM D'
const store = useProgramStore()
const filterStore = useFilterStore()
const selected = ref<Date[]>([])
const options = computed(() => store.getDatesList().map((d) => d.date))

watch(selected, (newVal: Date[]) => {
  filterStore.addFilter(FilterTypeEnum.day, newVal)
})
</script>