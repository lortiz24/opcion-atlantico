import dayjs from "dayjs"
import { TFormat } from "../../interfaces/date-treatment-interfaces"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export class DateAdapter {
    private fecha: dayjs.Dayjs

    constructor(fecha?: string | Date) {
        if (fecha) {
            this.fecha = dayjs(fecha)
        } else {
            this.fecha = dayjs().hour(0).minute(0).second(0)
        }
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

    setHour(hour: number) {
        this.fecha.hour(hour)
        return this
    }
    setMinute(minute: number) {
        this.fecha.minute(minute)
        return this
    }
    setSeconds(seconds: number) {
        this.fecha.hour(seconds)
        return this
    }
    // toDate() {
    //     return new Date(this.toDayjs(this.fecha))
    // }
}