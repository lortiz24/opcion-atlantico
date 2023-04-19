import { collection, CollectionReference } from "firebase/firestore";
import { FirebaseDB } from "./ConfigFirebase";
import { IModules } from "../interfaces/modules-interface";
import { IQrCode } from "../features/eventModule/interfaces/events-interfaces";

export const modulesCollectionRef = collection(FirebaseDB, "modules") as CollectionReference<Omit<IModules, 'id'>>;
export const eventsCollectionRef = collection(FirebaseDB, "events");
export const qrAttendanceCollectionRef = collection(FirebaseDB, "qr-attendance") as CollectionReference<Omit<IQrCode, 'id'>>;





