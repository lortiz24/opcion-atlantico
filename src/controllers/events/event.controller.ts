import { EventFirebaseService } from "../../firebase/eventos/event-firebase.service";
import { IEvent, ISelectedForeign } from "../../interfaces/events-interfaces";

export class EventController {
    constructor(
        private readonly eventService = new EventFirebaseService()
    ) { }

    async getEvents({ assistants, moderators }: ISelectedForeign): Promise<IEvent[] | undefined> {
        const events = await this.eventService.getAll({ assistants, moderators });

        return events

    }
    async getEvent(eventId: string): Promise<IEvent | undefined> {
        const event = await this.eventService.getOneById(eventId)
        return event
    }
    async createEvent(newEvent: Omit<IEvent, 'id'>) {
        const event = await this.eventService.create(newEvent)
        return event
    }
}

export const eventController = new EventController()