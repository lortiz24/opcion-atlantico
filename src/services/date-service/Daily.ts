import dayjs from "dayjs"
import { TFormat } from "../../interfaces/date-treatment-interfaces"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)



export class DateAdapter {
    private fecha: dayjs.Dayjs

    constructor(fecha: string | Date) {
        this.fecha = dayjs(fecha)
    }

    format(formato: TFormat): string {
        return this.fecha.format(formato)
    }


    isBefore(fecha: string): boolean {
        return this.fecha.isBefore(fecha)
    }

    isAfter(fecha: string): boolean {
        return this.fecha.isAfter(fecha)
    }

    getDiaSemana(): string {
        return this.fecha.format('dddd')
    }

    toDayjs() {
        return dayjs(this.fecha)
    }
    isAfterNow() {
        return this.fecha.isAfter(dayjs())
    }
    isSameOrAfterNow() {
        return this.fecha.isSameOrAfter(dayjs())
    }

    isBeforeNow() {
        return this.fecha.isBefore(dayjs())

    }
    isSameOrBeforeNow() {
        return this.fecha.isSameOrBefore(dayjs())

    }

    // toDate() {
    //     return new Date(this.toDayjs(this.fecha))
    // }
}