<template>
  <UFormGroup>
    <USelectMenu
      v-model="selected"
      searchable
      searchable-placeholder="Search for a sport..."
      :options="options"
      multiple
      :loading="store.loading"
    >
      <template #label>
        <span v-if="selected.length" class="truncate">{{ selected.join(', ') }}</span>
        <span v-else>Select sports</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
<script setup lang="ts">
import {FilterTypeEnum} from "~/models/FilterModel";

const store = useProgramStore()
const filterStore = useFilterStore()
const selected = ref(filterStore.getFilters(FilterTypeEnum.sport))
const options = computed(() => store.getSportList().map((sport) => sport.type))

watch(selected, (newVal: string[]) => {
  filterStore.addFilter(FilterTypeEnum.sport, newVal)
})
</script>