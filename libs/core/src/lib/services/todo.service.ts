import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
}

export const todoService = {
  async addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const docRef = await addDoc(collection(db, 'todos'), todo);
    return { ...todo, id: docRef.id };
  },

  async getTodos(userId: string): Promise<Todo[]> {
    const q = query(collection(db, 'todos'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Todo)
    );
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
