import { EventFirebaseService } from "../../firebase/eventos/event-firebase.service";
import { ICoditionsGetEvents, IEvent, IQrCode, ISelectedForeign } from "../../interfaces/events-interfaces";

export class EventController {
    constructor(
        private readonly eventService = new EventFirebaseService()
    ) { }

    async getEvents({ assistants, moderators }: ISelectedForeign, conditions?: ICoditionsGetEvents[]): Promise<IEvent[] | undefined> {
        const events = await this.eventService.getAll({ assistants, moderators }, conditions);

        return events

    }
    async getUsersAttendanceByEventId(eventId: string) {
        const events = await this.eventService.getUsersAttendanceByEventId(eventId);

        return events
    }
    async getUsersIdAttendanceByEventId(eventId: string) {
        const events = await this.eventService.getUsersIdAttendanceByEventId(eventId);
        return events
    }
    async getUsersInfoAttendanceByEventId(eventId: string) {
        const events = await this.eventService.getUsersInfoAttendanceByEventId(eventId);
        return events
    }
    async getEventById(eventId: string): Promise<IEvent | undefined> {
        const event = await this.eventService.getOneById(eventId)
        return event
    }
    async eventExist(eventId: string) {
        const event = await this.eventService.existEvent(eventId)
        return event
    }
    async createEvent(newEvent: Omit<IEvent, 'id'>) {
        const event = await this.eventService.create(newEvent)
        return event
    }
    async updateEvent(eventId: string, newEvent: Omit<IEvent, 'id'>) {
        const event = await this.eventService.update(eventId, newEvent)
        return event
    }
    async deleteEvent(eventId: string) {
        const event = await this.eventService.delete(eventId)
        return event
    }
    listeningEvents(onSet: (events: IEvent[]) => void, conditions?: ICoditionsGetEvents[], selectedForeing?: ISelectedForeign) {
        const newMenuId = this.eventService.listeningEvents(onSet, conditions, selectedForeing)
        return newMenuId
    }
    listeningQrCode(eventId: string, qrCode: string, onSet: (events: IQrCode) => void) {
        const newMenuId = this.eventService.listeningQrAttendanceFirebase(eventId, qrCode, onSet,)
        return newMenuId
    }

    async createToken(eventId: string, token: string) {
        const qrId = await this.eventService.createToken(eventId, token)
        return qrId
    }
    async getTokenByEventId(eventId: string) {
        const qrId = await this.eventService.getTokenByEventId(eventId)
        if (qrId)
            return qrId[0]
        else
            return undefined
    }
    async checkingToken(token: string, userId: string, eventId: string) {
        const validToken = await this.eventService.checkingToken(token, userId, eventId)
        if (validToken === undefined) return validToken
        return validToken
    }
    async alreadyCheck(userId: string, eventId: string) {
        const alreadycheck = await this.eventService.alreadyCheck(userId, eventId)
        if (alreadycheck === undefined) return alreadycheck
        return alreadycheck
    }

    async createCheck(userId: string, eventId: string) {
        const check = await this.eventService.createCheck(userId, eventId)
        return check
    }
    async deleteCheck(userId: string, eventId: string) {
        const check = await this.eventService.deleteCheck(userId, eventId)
        return check
    }
}

export const eventController = new EventController()