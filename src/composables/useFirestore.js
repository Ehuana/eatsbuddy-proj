// Composable for Firestore CRUD operations
import { db } from '@/firebase/config';
import { collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export function useFirestore() {
  // Example: Add a new document to a collection
  const addToCollection = async (col, data) => {
    return await addDoc(collection(db, col), data);
  };

  // Example: Get all documents from a collection
  const getCollection = async (col) => {
    const snapshot = await getDocs(collection(db, col));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  // Example: Update a document
  const updateDocument = async (col, id, data) => {
    return await updateDoc(doc(db, col, id), data);
  };

  // Example: Delete a document
  const deleteDocument = async (col, id) => {
    return await deleteDoc(doc(db, col, id));
  };

  // Example: Query documents by field
  const queryByField = async (col, field, value) => {
    const q = query(collection(db, col), where(field, '==', value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  return { addToCollection, getCollection, updateDocument, deleteDocument, queryByField };
}
