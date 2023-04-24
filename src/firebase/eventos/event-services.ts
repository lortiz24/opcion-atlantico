import { qrAttendanceCollectionRef } from "../providers";
import { IModules, StatusMenuItem } from "../../interfaces/modules-interface";
import { query, where, orderBy, limit, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, DocumentSnapshot, } from "firebase/firestore";
import { IEvent, IQrCode } from "../../interfaces/events-interfaces";
import { eventsCollectionRef } from "../providers";


export const listeningQrAttendance = (codeQrID: string, onSet: (modules: IQrCode) => void) => {
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

export const createQrAttendance = async (newQrAttendance: Omit<IQrCode, 'id'>) => {
    try {
        const querySnapshot = await addDoc(qrAttendanceCollectionRef, newQrAttendance);
        const newQrAttendanceId = querySnapshot.id;
        return newQrAttendanceId
    } catch (error) {
        console.error("Error al crear el codigo QR: ", error);
        throw error;
    }
}
export const deleteQrAttendance = async (idQrAttendanceId: string) => {
    try {
        const moduleRef = doc(qrAttendanceCollectionRef, idQrAttendanceId);
        await deleteDoc(moduleRef);
    } catch (error) {
        console.error("Error al eliminar el codigo QR: ", error);
        throw error;
    }
}
export const createEvent = async (newEvent: Omit<IEvent, 'id'>) => {
    try {
        const querySnapshot = await addDoc(eventsCollectionRef, newEvent);
        const newEventId = querySnapshot.id;
        return newEventId
    } catch (error) {
        console.error("Error al crear el evento: ", error);
        throw error;
    }
}