import { StorageFirebaseService } from "../../firebase/storage/storage-firebase.service";

class StorageController {
    constructor(
        private readonly storageService = new StorageFirebaseService()
    ) { }

    async uploadImage(file: any) {
        this.storageService.uploadImg(file)
    }
}

export const storageController = new StorageController()