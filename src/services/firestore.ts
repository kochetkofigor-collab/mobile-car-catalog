import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Car, Landlord } from '@/data/cars';

export interface FirestoreCar extends Omit<Car, 'id'> {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FirestoreLandlord extends Omit<Landlord, 'id'> {
  createdAt?: Date;
  updatedAt?: Date;
}

const COLLECTIONS = {
  CARS: 'cars',
  LANDLORDS: 'landlords',
  CITIES: 'cities',
  BRANDS: 'brands'
};

export const carsService = {
  async getAll(): Promise<Car[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CARS));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Car));
  },

  async getById(id: string): Promise<Car | null> {
    const docRef = doc(db, COLLECTIONS.CARS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Car;
    }
    return null;
  },

  async getByCity(city: string): Promise<Car[]> {
    const q = query(
      collection(db, COLLECTIONS.CARS),
      where('city', '==', city)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Car));
  },

  async add(car: FirestoreCar): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CARS), {
      ...car,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async update(id: string, car: Partial<FirestoreCar>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CARS, id);
    await updateDoc(docRef, {
      ...car,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CARS, id);
    await deleteDoc(docRef);
  }
};

export const landlordsService = {
  async getAll(): Promise<Landlord[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.LANDLORDS));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Landlord));
  },

  async getById(id: string): Promise<Landlord | null> {
    const docRef = doc(db, COLLECTIONS.LANDLORDS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Landlord;
    }
    return null;
  },

  async add(landlord: FirestoreLandlord): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.LANDLORDS), {
      ...landlord,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  },

  async update(id: string, landlord: Partial<FirestoreLandlord>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.LANDLORDS, id);
    await updateDoc(docRef, {
      ...landlord,
      updatedAt: Timestamp.now()
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.LANDLORDS, id);
    await deleteDoc(docRef);
  }
};

export const citiesService = {
  async getAll(): Promise<string[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CITIES));
    return snapshot.docs.map(doc => doc.data().name as string);
  },

  async add(city: string): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CITIES), {
      name: city,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CITIES, id);
    await deleteDoc(docRef);
  }
};

export interface Brand {
  id?: string;
  name: string;
  createdAt?: Date;
}

export const brandsService = {
  async getAll(): Promise<Brand[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.BRANDS));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Brand));
  },

  async add(name: string): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.BRANDS), {
      name,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  async update(id: string, name: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BRANDS, id);
    await updateDoc(docRef, { name });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BRANDS, id);
    await deleteDoc(docRef);
  }
};
