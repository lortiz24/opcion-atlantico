import { qrAttendanceCollectionRef, eventsCollectionRef } from "../providers";
import { query, where, addDoc, deleteDoc, doc, onSnapshot, getDocs, getDoc, QueryFieldFilterConstraint, updateDoc, orderBy, collection, CollectionReference, } from "firebase/firestore";
import { IAttendanceByEvent, ICoditionsGetEvents, IEvent, IQrCode, ISelectedForeign } from "../../interfaces/events-interfaces";
import { UserServiceFirebase } from "../user/user-firebase.service";
import { IUserInfo } from "../../interfaces/user-interfaces";


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
        private readonly eventsCollection = eventsCollectionRef,
        private readonly qrColecction = qrAttendanceCollectionRef,
        private readonly userService = new UserServiceFirebase()
    ) { }

    async getAll({ assistants, moderators, }: ISelectedForeign, conditions?: ICoditionsGetEvents[]) {
        try {
            const queryList: QueryFieldFilterConstraint[] = []
            conditions?.map(condition => {
                queryList.push(where('anfitrion', condition.operation, condition.value))
            })

            let queryData = query<Omit<IEvent, 'id'>>(this.eventsCollection, ...queryList);

            const querySnapshot = await getDocs<Omit<IEvent, 'id'>>(queryData);
            let events: IEvent[] = []
            let promises: Promise<IUserInfo[]>[] = [] // array para almacenar las promesas

            querySnapshot.forEach(async (doc) => {
                const data: Omit<IEvent, 'id'> = doc.data();
                const moderatorsData = Promise.all(data.moderators.map(async (moderatorId) => await this.userService.getUserInfo(moderatorId) as IUserInfo));
                promises.push(moderatorsData);

                const moderators: IUserInfo[] = await moderatorsData;
                events.push({ id: doc.id, ...data, forengData: { moderators: moderators } })
            });

            await Promise.all(promises); // esperamos a que todas las promesas se completen

            return events;
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
    async update(eventId: string, newEvent: Omit<IEvent, 'id'>) {
        try {
            console.log('eventId', eventId)
            console.log('newEvent', newEvent)
            const eventRef = doc(this.eventsCollection, eventId);
            await updateDoc(eventRef, newEvent);
            return { ok: true }
        } catch (error) {
            console.error("Error al actualizar el evento: ", error);
            return { ok: false }
        }
    }
    async delete(eventId: string) {
        try {
            const eventRef = doc(this.eventsCollection, eventId);
            await deleteDoc(eventRef);
            return { ok: true }
        } catch (error) {
            console.error("Error al eliminar el evento: ", error);
            return { ok: false }
        }
    }


    listeningEvents(onSet: (events: IEvent[]) => void, conditions?: ICoditionsGetEvents[]) {
        const queryList: QueryFieldFilterConstraint[] = []
        conditions?.map(condition => {
            queryList.push(where('anfitrion', condition.operation, condition.value))
        })

        let queryData = query<Omit<IEvent, 'id'>>(this.eventsCollection, orderBy("dateStart", "asc"), ...queryList);

        return onSnapshot(queryData, (querySnapshot) => {
            if (!querySnapshot.empty) {
                const events: IEvent[] = []
                querySnapshot.forEach((doc) => events.push({ id: doc.id, ...doc.data() }));
                onSet(events)
            } else {
                onSet([])
            }
        });
    }

    listeningQrAttendanceFirebase(eventId: string, qrCodeId: string, onSet: (qrCode: IQrCode) => void) {
        const qrCodeRef = doc(this.qrColecction, qrCodeId);
        return onSnapshot(qrCodeRef, (doc) => {
            const data = doc.data()
            onSet({ id: doc.id, ...data } as IQrCode)
        });
    }


    async createToken(eventId: string, token: string) {
        try {
            const querySnapshot = await addDoc(this.qrColecction, { eventId, token });
            const newTokenId = querySnapshot.id;
            return newTokenId
        } catch (error) {
            console.error("Error al crear evento: ", error);
        }
    }

    async getTokenByEventId(eventId: string) {
        try {
            let qrCode: IQrCode[] = []

            let queryData = query<Omit<IQrCode, 'id'>>(this.qrColecction, where("eventId", "==", eventId));
            const querySnapshot = await getDocs(queryData)
            querySnapshot.forEach((doc) => {
                console.log('epa')
                const data: Omit<IQrCode, 'id'> = doc.data();
                qrCode.push({ id: doc.id, ...data })
            });

            return qrCode

        } catch (error) {
            console.log(error)
        }
    }
    async checkingToken(token: string, userId: string, eventId: string) {
        try {
            let qrCode: IQrCode[] = []
            let queryData = query<Omit<IQrCode, 'id'>>(this.qrColecction, where("token", "==", token));
            const querySnapshot = await getDocs(queryData)
            querySnapshot.forEach((doc) => {
                console.log('epa')
                const data: Omit<IQrCode, 'id'> = doc.data();
                qrCode.push({ id: doc.id, ...data })
            });

            if (qrCode.length > 0) {
                const eventDocRef = doc(eventsCollectionRef, eventId);
                const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent');
                const querySnapshot = await addDoc(attendanceByEvent, { userId });
                return true
            } else {
                false
            }

        } catch (error) {
            console.log(error)
        }
    }
    async alreadyCheck(token: string, userId: string, eventId: string) {
        try {
            let chekingUser: IAttendanceByEvent[] = []

            const eventDocRef = doc(eventsCollectionRef, eventId);

            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;

            let queryData = query<Omit<IAttendanceByEvent, 'id'>>(attendanceByEvent, where('userId', '==', userId));

            const querySnapshot = await getDocs(queryData)
            querySnapshot.forEach((doc) => {
                const data: Omit<IAttendanceByEvent, 'id'> = doc.data();
                chekingUser.push({ id: doc.id, ...data })
            });
            return chekingUser.length > 0
        } catch (error) {
            console.log(error)
        }
    }




}