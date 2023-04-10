import { collection } from "firebase/firestore/lite";
import { FirebaseDB } from "./ConfigFirebase";

export const modulesCollectionRef = collection(FirebaseDB, "modules");
export const eventsCollectionRef = collection(FirebaseDB, "events");





