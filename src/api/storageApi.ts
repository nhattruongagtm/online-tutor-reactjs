import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
export const storageApi = {
  uploadFile: async (id: number, blobFile: File | Blob,directory: string = 'store') => {
    const storageRef = ref(storage, `${directory}/${id}/${id}.png`);
    try {
      const resp = await uploadBytes(storageRef, blobFile);
      console.log(resp);
      if (resp) {
        const imgRef = ref(storageRef);
        const url = await getDownloadURL(imgRef);
        return url;
      }
    } catch (error) {
      return '';
    }
  },
};
