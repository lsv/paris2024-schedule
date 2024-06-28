import {defineStore} from "pinia";

export const useTimezoneStore = defineStore('timezone', () => {
    const dayjs = useDayjs()
    const timezone = ref(dayjs.tz.guess())
    dayjs.tz.setDefault(timezone.value)

    function setTimezone(tz: string) {
        dayjs.tz.setDefault(tz)
        timezone.value = tz
    }
    return { timezone, setTimezone }
}, {persist: true})