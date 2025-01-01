import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}

export const todoService = {
  async addTodo(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
    const timestamp = Timestamp.now();
    const todoWithDate = {
      ...todo,
      createdAt: timestamp.toDate().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'todos'), todoWithDate);
    return { ...todoWithDate, id: docRef.id };
  },

  async getTodos(userId: string): Promise<Todo[]> {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt instanceof Timestamp 
        ? data.createdAt.toDate().toISOString()
        : data.createdAt;
      
      return {
        id: doc.id,
        ...data,
        createdAt,
      } as Todo;
    });
  },

  async updateTodo(id: string, data: Partial<Todo>): Promise<void> {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, data);
  },

  async deleteTodo(id: string): Promise<void> {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  },
};
