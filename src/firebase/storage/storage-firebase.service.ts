import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageApp } from "../ConfigFirebase";
export class StorageFirebaseService {
    constructor(
        private readonly storage = storageApp
    ) { }

    async uploadImg(file: any, directory: string, nameImg:string) {
        try {
            const storageRef = ref(this.storage, `${directory}/${nameImg}`);
            const snapshot = await uploadBytes(storageRef, file)
            const downloadURL = getDownloadURL(snapshot.ref)
            return downloadURL
        } catch (error) {
            console.log('Ocurrio un error', error);
        }

    }
}
