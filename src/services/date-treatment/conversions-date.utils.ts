import { Timestamp } from "firebase/firestore";
import dayjs, { Dayjs } from 'dayjs';
import { TFormat } from "../../interfaces/date-treatment-interfaces";

export const timestampToString = (date: Timestamp, format: TFormat) => {
    return dayjs(date.toDate()).format(format);
}
export const dateLessThan = (date_first: Date | string, date_second: Date | string) => {
    return transforDateToDayjs(date_first).isBefore(transforDateToDayjs(date_second))
}

export const timestampBeforeThan = (date_first: Timestamp, date_second: Timestamp) => {
    return dayjs(date_first.toDate()).isBefore(dayjs(date_second.toDate()))
}
export const timestampAfterThan = (date_first: Timestamp, date_second: Timestamp) => {
    return dayjs(date_first.toDate()).isAfter(dayjs(date_second.toDate()))
}

export const timestampBeforeNow = (date_first: Timestamp) => {
    return dayjs(date_first.toDate()).isBefore(dayjs(new Date()))
}
export const timestampAfterNow = (date_first: Timestamp) => {
    return dayjs(date_first.toDate()).isAfter(dayjs(new Date())) && !dayjs(date_first.toDate()).isSame(dayjs(new Date()))
}

export const transforDateToDayjs = (date: Date | string) => {
    if (typeof date === 'string') return new Dayjs(date)
    return new Dayjs(date)
}

export const addTimeToDate = (date: Dayjs, cantAdd: number, manipulate: dayjs.ManipulateType) => {
    const fechaNueva = date.add(cantAdd, manipulate);
    return fechaNueva
}

