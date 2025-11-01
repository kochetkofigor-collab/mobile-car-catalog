import { collection, addDoc, getDocs, query, where, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TelegramUser, User } from '@/types/telegram';

const COLLECTIONS = {
  USERS: 'users'
};

export const authService = {
  async findOrCreateUser(telegramUser: TelegramUser): Promise<User> {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('telegramId', '==', telegramUser.id)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      
      await updateDoc(doc(db, COLLECTIONS.USERS, userDoc.id), {
        lastLogin: Timestamp.now()
      });

      return {
        id: userDoc.id,
        telegramId: userData.telegramId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        photoUrl: userData.photoUrl,
        createdAt: userData.createdAt.toDate(),
        lastLogin: new Date()
      };
    }

    const newUser = {
      telegramId: telegramUser.id,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
      photoUrl: telegramUser.photo_url,
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.USERS), newUser);

    return {
      id: docRef.id,
      telegramId: newUser.telegramId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      photoUrl: newUser.photoUrl,
      createdAt: new Date(),
      lastLogin: new Date()
    };
  },

  async getUserById(userId: string): Promise<User | null> {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where('telegramId', '==', Number(userId))
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    return {
      id: userDoc.id,
      telegramId: userData.telegramId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      photoUrl: userData.photoUrl,
      createdAt: userData.createdAt.toDate(),
      lastLogin: userData.lastLogin.toDate()
    };
  }
};
