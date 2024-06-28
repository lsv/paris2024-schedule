export interface ListModel {
    type: string,
}

export type DayModel = ListModel & {
    date: Date
}

export type SportModel = ListModel