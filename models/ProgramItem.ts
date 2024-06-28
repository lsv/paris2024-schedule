export type ProgramItem = {
    day: Date,
    startDate: Date,
    endDate: Date,
    sport: string,
    event: string,
    eventList: string[],
    venue?: string,
    metro?: string,
    details?: string
}