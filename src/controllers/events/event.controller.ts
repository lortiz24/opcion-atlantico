import { EventFirebaseService } from "../../firebase/eventos/event-firebase.service";
import { ICoditionsGetEvents, IEvent, ISelectedForeign } from "../../interfaces/events-interfaces";

export class EventController {
    constructor(
        private readonly eventService = new EventFirebaseService()
    ) { }

    async getEvents({ assistants, moderators }: ISelectedForeign, conditions?: ICoditionsGetEvents[]): Promise<IEvent[] | undefined> {
        const events = await this.eventService.getAll({ assistants, moderators }, conditions);

        return events

    }
    async getEventById(eventId: string): Promise<IEvent | undefined> {
        const event = await this.eventService.getOneById(eventId)
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
    listeningMenus(onSet: (events: IEvent[]) => void, conditions?: ICoditionsGetEvents[]) {
    const newMenuId = this.eventService.listeningEvents(onSet, conditions)
    return newMenuId
}

}

export const eventController = new EventController()