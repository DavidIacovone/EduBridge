import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Course } from '../types/course';

const coursesCollection = collection(db, 'courses');

export const getCourseById = async (id: string): Promise<Course | null> => {
    const ref = doc(db, 'courses', id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;
    return {id: snap.id, ...snap.data()} as Course;
};

export const getCoursesByCity = async (city: string): Promise<Course[]> => {
    const q = query(coursesCollection, where('city', '==', city));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Course[];
};

export const getCoursesByUserId = async (userId: string): Promise<Course[]> => {
    const q = query(collection(db, 'courses'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as Course));
};


export const createCourse = async (course: Omit<Course, 'id'>): Promise<string> => {
    const docRef = await addDoc(coursesCollection, course);
    return docRef.id;
};

export const updateCourse = async (id: string, updates: Partial<Omit<Course, 'id'>>) => {
    const ref = doc(db, 'courses', id);
    await updateDoc(ref, updates);
};

export const deleteCourse = async (id: string) => {
    const ref = doc(db, 'courses', id);
    await deleteDoc(ref);
};
