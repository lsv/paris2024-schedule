import {defineStore} from "pinia";
import type {ProgramItem} from "~/models/ProgramItem";
import type {Ref} from "vue";
import type {DayModel, ListModel, SportModel} from "~/models/ListModels";
import dayjs from "dayjs";

export const useProgramStore = defineStore('program', () => {
    const loading: Ref<boolean> = ref(true)
    const programItems: Ref<ProgramItem[]> = ref([])


    function getDatesList(): DayModel[] {
        const items: DayModel[] = []

        programItems.value.forEach((item: ProgramItem) => {
            if (!items.find((d: DayModel) => dayjs(d.date).isSame(dayjs(item.day, 'day')))) {
                items.push({ type: '', date: item.day })
            }
        })

        return items.sort((a: DayModel, b: DayModel) => dayjs(a.date).diff(dayjs(b.date)))
    }

    function getSportList(): SportModel[] {
        const items: ListModel[] = []
        programItems.value.forEach((item: ProgramItem) => {
            if (!items.find((d: ListModel) => d.type === item.sport)) {
                items.push({ type: item.sport })
            }
        })

        return items.sort((a: ListModel, b: ListModel) => a.type.localeCompare(b.type))
    }

    async function loadProgram() {
        loading.value = true
        const data = await $fetch('/api/loadProgramme')
        data.forEach((row): void => {
            const startDateSet = dayjs.tz(row.date, 'Europe/Paris').add(3, 'hour')

            let start = startDateSet
            if (row.start) {
                start = start.hour(parseInt(row.start.split(':')[0]))
                start = start.minute(parseInt(row.start.split(':')[1]))
            }

            let end = startDateSet
            if (row.end) {
                end = end.hour(parseInt(row.end.split(':')[0]))
                end.minute(parseInt(row.end.split(':')[1]))
            }

            let day = startDateSet
            day = day.hour(15)
            day = day.minute(0)

            programItems.value.push({
                day: day.toDate(),
                startDate: start.toDate(),
                endDate: end.toDate(),
                sport: row["sport"],
                event: row["event"],
                eventList: row["event"].split(', ').map((e: string) => e.trim()),
                venue: row["venue"],
                metro: row["metro"],
                details: row["details"],
            });
        })
        
        loading.value = false
    }

    return { loading, programItems, loadProgram, getDatesList, getSportList }
})