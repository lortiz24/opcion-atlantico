import { qrAttendanceCollectionRef, eventsCollectionRef } from "../providers";
import { query, where, addDoc, deleteDoc, doc, onSnapshot, getDocs, getDoc, QueryFieldFilterConstraint, updateDoc, orderBy, collection, CollectionReference, setDoc, } from "firebase/firestore";
import { IAttendanceByEvent, IWhereQuerys, IEvent, IQrCode, ISelectedForeign } from "../../interfaces/events-interfaces";
import { UserServiceFirebase } from "../user/user-firebase.service";
import { IUserInfo } from "../../interfaces/user-interfaces";
import { ErrorFirebaseService } from "../error/error-firebase-service";


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
        private readonly userService = new UserServiceFirebase(),
        private readonly eventLogger = new ErrorFirebaseService()
    ) { }

    async getAll(selectedForeinge: ISelectedForeign, conditions?: IWhereQuerys[]) {
        try {
            const queryList: QueryFieldFilterConstraint[] = [];
            conditions?.map((condition) => {
                queryList.push(where(condition.nameProperty, condition.operation, condition.value));
            });

            let queryData = query<Omit<IEvent, "id">>(this.eventsCollection, ...queryList);

            const querySnapshot = await getDocs<Omit<IEvent, "id">>(queryData);
            let events: IEvent[] = [];
            let moderatorsPromises: Promise<IUserInfo[]>[] = [];
            let assitantsPromises: Promise<IUserInfo[]>[] = [];

            querySnapshot.forEach(async (doc) => {
                const data: Omit<IEvent, "id"> = doc.data();
                let moderatorsList: IUserInfo[] = [];
                let assistansList: IUserInfo[] = [];

                if (selectedForeinge) {
                    const moderatorsData = Promise.all(
                        data.moderators.map(async (moderatorId) => await this.userService.getUserInfo(moderatorId) as IUserInfo)
                    );
                    const assistansData = Promise.all(
                        data.assistants.map(async (assistantsId) => await this.userService.getUserInfo(assistantsId) as IUserInfo)
                    );
                    moderatorsPromises.push(moderatorsData);
                    moderatorsList = selectedForeinge.moderators === true ? await moderatorsData : [];

                    assitantsPromises.push(assistansData);
                    assistansList = selectedForeinge.assistants === true ? await assistansData : [];
                }
                events.push({ id: doc.id, ...data, forengData: { moderators: moderatorsList, assistants: assistansList } });
            });
            await Promise.all(moderatorsPromises);
            await Promise.all(assitantsPromises);
            return events;
        } catch (error) {
            console.log(error);
        }
    }
    async getOneById(eventId: string) {
        try {
            const moduleRef = doc(this.eventsCollection, eventId);

            const querySnapshot = await getDoc<Omit<IEvent, 'id'>>(moduleRef);
            if (!querySnapshot.exists()) return { ...querySnapshot.data() } as IEvent
            return { id: querySnapshot.id, ...querySnapshot.data() } as IEvent
        } catch (error) {
            console.log(error)
        }
    }
    async getUsersAttendanceByEventId(eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);
            const usersByEvent: IAttendanceByEvent[] = []
            const promiseUsersInfo: Promise<IUserInfo | undefined>[] = []

            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;
            const queryData = query<Omit<IAttendanceByEvent, "id">>(attendanceByEvent)
            const querySnapshot = await getDocs(queryData)

            querySnapshot.forEach(snapshot => {
                const data: Omit<IAttendanceByEvent, "id"> = snapshot.data()
                usersByEvent.push({ id: snapshot.id, ...data })
                promiseUsersInfo.push(this.userService.getUserInfo(snapshot.id))
            })

            const usersInfoByEvent = await Promise.all(promiseUsersInfo)
            return usersInfoByEvent
        } catch (error) {
            console.log(error)
        }
    }
    async getUsersIdAttendanceByEventId(eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);
            const usersByEvent: string[] = []


            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;
            const queryData = query<Omit<IAttendanceByEvent, "id">>(attendanceByEvent)
            const querySnapshot = await getDocs(queryData)

            querySnapshot.forEach(snapshot => {
                const data: Omit<IAttendanceByEvent, "id"> = snapshot.data()
                usersByEvent.push(snapshot.id)
            })

            return usersByEvent
        } catch (error) {
            console.log(error)
        }
    }
    async getUsersInfoAttendanceByEventId(eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);
            const usersByEvent: string[] = []
            const promiseUsersInfo: Promise<IUserInfo | undefined>[] = []

            const documentRef = await getDoc(eventDocRef)
            const asistentes = documentRef.data()?.assistants

            asistentes?.forEach(asistente => {
                promiseUsersInfo.push(this.userService.getUserInfo(asistente))
            })


            const usersInfoAsistentes = Promise.all(promiseUsersInfo)
            return usersInfoAsistentes
        } catch (error) {
            console.log(error)
        }
    }

    async existEvent(eventId: string) {
        try {
            const moduleRef = doc(this.eventsCollection, eventId);

            const querySnapshot = await getDoc<Omit<IEvent, 'id'>>(moduleRef);
            return querySnapshot.exists()
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
            const eventRef = doc(this.eventsCollection, eventId);
            await updateDoc(eventRef, newEvent);
            return { ok: true }
        } catch (error) {
            console.error("Error al actualizar el evento: ", error);
            return { ok: false }
        }
    }
    //todo: eliminar las subcolecciones de events
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
    listeningEvents(onSet: (events: IEvent[]) => void, conditions?: IWhereQuerys[], selectedForeing?: ISelectedForeign) {
        const queryList: QueryFieldFilterConstraint[] = [];
        conditions?.map((condition) => {
            queryList.push(where("anfitrion", condition.operation, condition.value));
        });

        let queryData = query<Omit<IEvent, "id">>(this.eventsCollection, orderBy("dateStart", "asc"), ...queryList);

        return onSnapshot(queryData, async (querySnapshot) => {
            if (!querySnapshot.empty) {
                const events: IEvent[] = [];
                let assistansPromise: Promise<IUserInfo[]>[] = [];
                let moderatorsPromises: Promise<IUserInfo[]>[] = [];

                querySnapshot.forEach(async (doc) => {
                    const data: Omit<IEvent, "id"> = doc.data();
                    let moderators: IUserInfo[] = [];
                    let assistansList: IUserInfo[] = [];

                    if (selectedForeing) {
                        const moderatorsData = Promise.all(
                            data.moderators.map(async (moderatorId) => await this.userService.getUserInfo(moderatorId) as IUserInfo)
                        );
                        const assistansData = Promise.all(
                            data.assistants.map(async (assistantsId) => await this.userService.getUserInfo(assistantsId) as IUserInfo)
                        );
                        assistansPromise.push(moderatorsData);
                        moderators = selectedForeing.moderators === true ? await moderatorsData : [];

                        moderatorsPromises.push(assistansData);
                        assistansList = selectedForeing.assistants === true ? await assistansData : [];
                    }

                    events.push({ id: doc.id, ...data, forengData: { moderators: moderators, assistants: assistansList } });
                });

                await Promise.all(assistansPromise); // esperamos a que todas las promesas se completen
                await Promise.all(moderatorsPromises); // esperamos a que todas las promesas se completen

                onSet(events);
            } else {
                onSet([]);
            }
        });
    }
    listeningUsersInfoCheck(eventId: string, onSet: (usersInfo: IUserInfo[]) => void) {

        const eventDocRef = doc(this.eventsCollection, eventId);
        const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;
        let queryData = query<Omit<IAttendanceByEvent, "id">>(attendanceByEvent);

        return onSnapshot(queryData, async (querySnapshot) => {
            if (!querySnapshot.empty) {

                const userInfo: IUserInfo[] = [];

                const promises: Promise<IUserInfo | undefined>[] = []

                querySnapshot.forEach(async (doc) => {

                    const data: Omit<IAttendanceByEvent, "id"> = doc.data();

                    promises.push(this.userService.getUserInfo(doc.id))

                    const moderatorsData = await this.userService.getUserInfo(doc.id)

                    if (moderatorsData)
                        userInfo.push(moderatorsData);
                });
                await Promise.all(promises)
                onSet(userInfo);
            } else {
                onSet([]);
            }
        });
    }
    listeningUsersInfoNotCheck(eventId: string, onSet: (usersInfo: IUserInfo[]) => void) {
        const eventDocRef = doc(this.eventsCollection, eventId);
        return onSnapshot(eventDocRef, async (querySnapshot) => {

            const usersInfo: IUserInfo[] = [];

            const promises: Promise<IUserInfo | undefined>[] = []

            const data = querySnapshot.data();

            data?.assistants.forEach(async (asistente) => {
                const userInfo = await this.userService.getUserInfo(asistente)
                if (userInfo)
                    usersInfo.push(userInfo)

                promises.push(this.userService.getUserInfo(asistente))
            })

            await Promise.all(promises)
            onSet(usersInfo);
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
                const data: Omit<IQrCode, 'id'> = doc.data();
                qrCode.push({ id: doc.id, ...data })
            });
            //token valido
            return qrCode.length > 0

        } catch (error) {
            this.eventLogger.hanledError(error)
        }
    }
    async createCheck(userId: string, eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);
            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;
            const docRef = doc(attendanceByEvent, userId)
            await setDoc(docRef, { userId })
            return 201
        } catch (error) {
            return this.eventLogger.hanledError(error)
        }
    }
    async deleteCheck(userId: string, eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);
            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;
            const docRef = doc(attendanceByEvent, userId)
            await deleteDoc(docRef)
            return 201
        } catch (error) {
            return this.eventLogger.hanledError(error)
        }
    }
    async alreadyCheck(userId: string, eventId: string) {
        try {
            const eventDocRef = doc(this.eventsCollection, eventId);

            const attendanceByEvent = collection(eventDocRef, 'attendanceByEvent') as CollectionReference<Omit<IAttendanceByEvent, 'id'>>;

            const attendancRef = doc(attendanceByEvent, userId)

            const querySnapshot = await getDoc<Omit<IAttendanceByEvent, 'id'>>(attendancRef);
            return querySnapshot.exists()

        } catch (error) {
            console.log(error)
        }
    }




}