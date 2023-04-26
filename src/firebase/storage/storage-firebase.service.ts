import { ref, uploadBytes } from "firebase/storage";
import { storageApp } from "../ConfigFirebase";

export class StorageFirebaseService {
    constructor(
        private readonly storage = storageApp
    ) { }

    uploadImg(file: any) {
        const storageRef = ref(this.storage, 'some-child');
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log('Uploaded a blob or file!', snapshot);
            });


    }
}
