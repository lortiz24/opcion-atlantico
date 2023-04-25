import { qrAttendanceCollectionRef, eventsCollectionRef } from "../providers";
import { query, where, addDoc, deleteDoc, doc, onSnapshot, orderBy, getDocs, getDoc, } from "firebase/firestore";
import { IEvent, IQrCode } from "../../interfaces/events-interfaces";


export const listeningQrAttendanceFirebase = (codeQrID: string, onSet: (modules: IQrCode) => void) => {
    const qrAttendanceDocRef = doc(qrAttendanceCollectionRef, codeQrID);
    const queryData = query<Omit<IQrCode, 'id'>>(qrAttendanceCollectionRef, where('codeQr', '==', codeQrID));
    return onSnapshot(qrAttendanceDocRef, (doc) => {
        console.log(doc.data());
    });
    /* return onSnapshot(queryData, (querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => modules.push({ id: doc.id, ...doc.data() }));
            onSet(modules)
        } else {
            onSet([])
        }
    }); */
}

export const createQrAttendanceFirebase = async (newQrAttendance: Omit<IQrCode, 'id'>) => {
    try {
        const querySnapshot = await addDoc(qrAttendanceCollectionRef, newQrAttendance);
        const newQrAttendanceId = querySnapshot.id;
        return newQrAttendanceId
    } catch (error) {
        console.error("Error al crear el codigo QR: ", error);
        throw error;
    }
}
export const deleteQrAttendanceFirebase = async (idQrAttendanceId: string) => {
    try {
        const moduleRef = doc(qrAttendanceCollectionRef, idQrAttendanceId);
        await deleteDoc(moduleRef);
    } catch (error) {
        console.error("Error al eliminar el codigo QR: ", error);
        throw error;
    }
}
export const createEventFirebase = async (newEvent: Omit<IEvent, 'id'>) => {
    try {
        const querySnapshot = await addDoc(eventsCollectionRef, newEvent);
        const newEventId = querySnapshot.id;
        return newEventId
    } catch (error) {
        console.error("Error al crear el evento: ", error);
        throw error;
    }
}

export class EventFirebaseService {

    constructor(
        private readonly eventsCollection = eventsCollectionRef
    ) { }

    async getAll() {
        try {

            let queryData = query<Omit<IEvent, 'id'>>(this.eventsCollection);

            const querySnapshot = await getDocs<Omit<IEvent, 'id'>>(queryData);
            let events: IEvent[] = []
            querySnapshot.forEach((doc) => {
                const data: Omit<IEvent, 'id'> = doc.data();
                events.push({ id: doc.id, ...data })
            });

            return events
        } catch (error) {
            console.log(error)
        }
    }
    async getOneById(eventId: string) {
        try {
            const moduleRef = doc(this.eventsCollection, eventId);

            const querySnapshot = await getDoc<Omit<IEvent, 'id'>>(moduleRef);

            return { id: querySnapshot.id, ...querySnapshot.data() } as IEvent
        } catch (error) {
            console.log(error)
        }
    }
    async create(newEvent: Omit<IEvent, 'id'>) {
        try {
            const querySnapshot = await addDoc(this.eventsCollection, newEvent);
            const newEventId = querySnapshot.id;
            return newEventId
        } catch (error) {
            console.error("Error al crear evento: ", error);
        }
    }


}