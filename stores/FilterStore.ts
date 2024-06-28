import {defineStore} from "pinia";
import type {Ref} from "vue";
import {type FilterModel, FilterTypeEnum} from "~/models/FilterModel";
import type {ProgramItem} from "~/models/ProgramItem";
import {useProgramStore} from "~/stores/ProgramStore";
import dayjs from "dayjs";

export const useFilterStore = defineStore('filter', () => {
    const programStore = useProgramStore()
    const filters: Ref<FilterModel[]> = ref([])

    function filter(): ProgramItem[] {
        const programs: ProgramItem[] = []
        if (filters.value.filter((f: FilterModel) => f.data.length > 0).length <= 0) {
            return programStore.programItems
        }

        filters.value.forEach((filter: FilterModel) => {
            if (filter.filter === FilterTypeEnum.day) {
                const data = filter.data.map((d) => dayjs(d))

                const f = programStore.programItems.filter((item: ProgramItem) => {
                    return data.find((d: dayjs.Dayjs) => d.isSame(dayjs(item.day), 'day'))
                })
                programs.push(...f)
            } else {
                const f = programStore.programItems.filter((item: ProgramItem) => filter.data.includes(item[filter.filter]))
                programs.push(...f)
            }
        })

        return programs
    }

    function getFilters(type: FilterTypeEnum): string[]|Date[] {
        const f = filters.value.find((f: FilterModel) => f.filter === type)
        return f ? f.data : []
    }

    function addFilter(type: FilterTypeEnum, newValue: string[]|Date[]) {
        const index = filters.value.findIndex((f: FilterModel) => f.filter === type)
        if (index > -1) {
            filters.value[index].data = newValue
        } else {
            filters.value.push({ filter: type, data: newValue })
        }
    }

    return { filters, filter, addFilter, getFilters }
}, {
    persist: true,
})