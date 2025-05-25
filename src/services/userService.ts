import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { User } from '../types/user';

const usersCollection = collection(db, 'users');

export const getUserById = async (id: string): Promise<User | null> => {
    const ref = doc(usersCollection, id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;
    return {id: snap.id, ...snap.data()} as User;
};

export const createUser = async (user: Omit<User, 'id'>, id: string): Promise<void> => {
    const ref = doc(usersCollection, id);
    await setDoc(ref, user);
};

export const updateUser = async (id: string, updates: Partial<Omit<User, 'id'>>) => {
    const ref = doc(usersCollection, id);
    await updateDoc(ref, updates);
};

export const deleteUser = async (id: string) => {
    const ref = doc(usersCollection, id);
    await deleteDoc(ref);
};
