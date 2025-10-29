import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ListingRequest {
  id?: string;
  name: string;
  phone: string;
  createdAt?: any;
}

const COLLECTION_NAME = 'listing_requests';

export const listingRequestsService = {
  async getAll(): Promise<ListingRequest[]> {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt
      } as ListingRequest;
    });
  },

  async add(request: Omit<ListingRequest, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...request,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }
};