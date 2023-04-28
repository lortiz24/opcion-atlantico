import { collection, CollectionReference } from "firebase/firestore";
import { FirebaseDB } from "./ConfigFirebase";
import { IMenu } from "../interfaces/modules-interface";
import { IAttendanceByEvent, IEvent, IQrCode } from "../interfaces/events-interfaces";
import { IUserInfo } from "../interfaces/user-interfaces";
import { IRol } from "../interfaces/rols-interfaces";

export const modulesCollectionRef = collection(FirebaseDB, "modules") as CollectionReference<Omit<IMenu, 'id'>>;
export const eventsCollectionRef = collection(FirebaseDB, "events") as CollectionReference<Omit<IEvent, 'id'>>;
export const qrAttendanceCollectionRef = collection(FirebaseDB, "qr-attendance") as CollectionReference<Omit<IQrCode, 'id'>>;
export const userInfoCollectionRef = collection(FirebaseDB, "user-info") as CollectionReference<Omit<IUserInfo, 'id'>>;
export const rolsCollectionRef = collection(FirebaseDB, "rols") as CollectionReference<Omit<IRol, 'id'>>;




