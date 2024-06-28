<template>
  <div v-if="programStore.loading">
    <fullpage-loading />
  </div>
  <UTable v-else :columns="columns" :rows="store.filter()" :ui="{ td: {padding: 'px-2 py-2'}}">
    <template #day-data="{ row }">
      <span :title="row.day.toISOString()">{{ dd(row.day).format(dateFormat) }}</span>
    </template>
    <template #starting-data="{ row }">
      <span>{{ starting(row) }}</span>
    </template>
    <template #startDate-data="{ row }">
      <span :title="startDate(row).format(fullFormat)">{{ startDate(row).format(timeFormat) }}</span>
    </template>
    <template #endDate-data="{ row }">
      <span :title="endDate(row).format(fullFormat)">{{ endDate(row).format(timeFormat) }}</span>
    </template>
    <template #eventList-data="{ row }">
      <!-- eslint-disable vue/no-v-html -->
      <span v-html="row.eventList.join('<br />')"/>
      <!-- esline-enable -->
    </template>
    <template #progress-data="{ row }">
      <span v-if="startDate(row).isBefore(dayjs()) && endDate(row).isBefore(dayjs())"><UBadge size="xs" label="Finished" color="green" variant="solid" /></span>
      <span v-else-if="startDate(row).isAfter(dayjs())"><UBadge size="xs" label="Not started" color="cyan" variant="outline" /></span>
      <span v-else><UBadge size="xs" label="In progress" color="rose" variant="soft" /></span>
    </template>
  </UTable>
</template>
<script setup lang="ts">
import { useLocaleStore } from "#imports";
import type {ProgramItem} from "~/models/ProgramItem";
import type {Dayjs} from "dayjs";

const dayjs = useDayjs()
const programStore = useProgramStore()
const store = useFilterStore()
const localeStore = useLocaleStore()
const timezoneStore = useTimezoneStore()

const timeFormat = 'LT'
const dateFormat = 'ddd, MMM D'
const fullFormat = `${dateFormat} ${timeFormat}`

const startDate = (row: ProgramItem) => {
  return dd(row.startDate)
}

const endDate = (row: ProgramItem) => {
  return dd(row.endDate)
}

const starting = (row: ProgramItem) => {
  return dd().to(startDate(row))
}

const dd = (date: undefined | Date = undefined): Dayjs => {
  return dayjs(date).locale(localeStore.locale.key).tz(timezoneStore.timezone)
}

const columns = [
  {
    key: 'sport',
    label: 'Sport',
    sortable: true
  },
  {
    key: 'day',
    label: 'Day',
    sortable: true
  },
  {
    key: 'starting',
  },
  {
    key: 'startDate',
    label: 'Start',
    sortable: true
  },
  {
    key: 'endDate',
    label: 'End',
    sortable: true
  },
  {
    key: 'eventList',
    label: 'Event',
    sortable: true
  },
  {
    key: 'progress',
  }
]
</script>