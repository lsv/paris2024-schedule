import {defineStore} from "pinia";
import type {Ref} from "vue";

export type LocaleModel = {
    key: string
    name: string
}

export const useLocaleStore = defineStore('locale', () => {
    const dayjs = useDayjs()
    const locale: Ref<LocaleModel> = ref({ key: 'en-gb', name: 'English (United Kingdom)' })
    dayjs.locale(locale.value.key)
    function setLocale(loc: LocaleModel) {
        dayjs.locale(loc.key)
        locale.value = loc
    }
    return { locale, setLocale }
}, {persist: true})