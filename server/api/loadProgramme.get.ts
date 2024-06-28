import xlsx from 'xlsx'
import type {ProgramItem} from "~/models/ProgramItem";
import * as path from 'node:path'
import * as fs from 'node:fs'

export type xlsxRow = {
    date: string,
    time?: string,
    venue?: string,
    start?: string,
    end?: string
} & ProgramItem

export default defineEventHandler(async (): Promise<xlsxRow[]> => {
    let filePath = path.join(process.cwd(), '.output', 'public')
    if (import.meta.dev) {
        filePath = path.join(process.cwd(), 'public')
    }

    const writePath = path.join(filePath, 'programme.json')
    try {
        const buffer = await fs.promises.readFile(writePath)
        return JSON.parse(buffer.toString())
    } catch (e) {
        const odsPath = path.join(filePath, 'programme.ods')
        const buffer = await fs.promises.readFile(odsPath)
        const workbook = xlsx.read(buffer, {type: 'buffer'});
        const sheet = workbook.Sheets['All events']
        const json = xlsx.utils.sheet_to_json(sheet) as xlsxRow[]
        await fs.promises.writeFile(writePath, JSON.stringify(json, null, 2))
        return json
    }
})
