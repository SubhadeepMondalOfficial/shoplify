import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const storage = getStorage()

const fileStorage = async (file, path) => {
    const bucket = ref(storage, path);
    const snapshot = await uploadBytes(bucket, file);
    const url =  await getDownloadURL(snapshot.ref)
    return url;
}

export default fileStorage