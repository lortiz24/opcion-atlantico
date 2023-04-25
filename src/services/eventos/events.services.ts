import { createEventFirebase } from "../../firebase/eventos/event-firebase.service";
import { IEvent } from "../../interfaces/events-interfaces";

export const createEvent = (newEvent: Omit<IEvent, 'id'>) => {
    const eventId = createEventFirebase(newEvent)
    return eventId
}