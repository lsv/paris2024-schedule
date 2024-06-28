export enum FilterTypeEnum {
    sport = 'sport',
    venue = 'venue',
    event = 'event',
    day = 'day',
}

export type FilterModel = {
    filter: FilterTypeEnum,
    data: string[]|Date[]
}