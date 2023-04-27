import { StorageFirebaseService } from "../../firebase/storage/storage-firebase.service";

class StorageController {
    constructor(
        private readonly storageService = new StorageFirebaseService()
    ) { }

    async uploadImage(file: any, directory: string, nameImg: string) {
        const newNameImage = await this.storageService.uploadImg(file, directory, nameImg)
        return newNameImage
    }
}

export const storageController = new StorageController()