import { Timestamp } from "firebase/firestore";
import dayjs from 'dayjs';
import { TFormat } from "../../interfaces/date-treatment-interfaces";

export const timestampToString = (date: Timestamp, format: TFormat) => {
    return dayjs(date.toDate()).format(format);
}


