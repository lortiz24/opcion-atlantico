import { Timestamp } from "firebase/firestore"
import { DateAdapter } from "../services/date-service/Daily"

export const getEventStatus = (start: Timestamp, end: Timestamp) => {
    if (!start || !end) return
    const dateStart = new DateAdapter(start.toDate())
    const dateEnd = new DateAdapter(end.toDate())
    if (dateStart.isBeforeNow() && dateEnd.isBeforeNow()) {
        return 'finished'
    }
    if (dateStart.isSameOrBeforeNow() && dateEnd.isAfterNow()) {
        return 'in-progress'
    }
    if (dateStart.isAfterNow() && dateEnd.isAfterNow()) {
        return 'before-starting'
    }
}