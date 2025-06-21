// Composable for easier Firestore collection operations
import { useFirestore } from './useFirestore';
import { useAuth } from './useAuth';
import { ref } from 'vue';

export function useCollection(collectionName) {
  const { user } = useAuth();
  const { 
    addToCollection,
    getCollection,
    updateDocument,
    deleteDocument,
    queryByField 
  } = useFirestore();
  
  const documents = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // Load all documents for the current user
  const loadUserDocuments = async () => {
    if (!user.value) return [];
    
    try {
      loading.value = true;
      error.value = null;
      
      const docs = await queryByField(collectionName, 'userId', user.value.uid);
      documents.value = docs;
      return docs;
    } catch (err) {
      console.error(`Error loading ${collectionName}:`, err);
      error.value = `Failed to load your ${collectionName.replace('_', ' ')}`;
      return [];
    } finally {
      loading.value = false;
    }
  };
  
  // Add a new document with timestamp and user ID
  const addDocument = async (data) => {
    if (!user.value) throw new Error('User must be authenticated');
    
    try {
      loading.value = true;
      error.value = null;
      
      const docData = {
        ...data,
        userId: user.value.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addToCollection(collectionName, docData);
      await loadUserDocuments();
      return docRef;
    } catch (err) {
      console.error(`Error adding ${collectionName}:`, err);
      error.value = `Failed to create new ${collectionName.replace('_', ' ')}`;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // Update a document with timestamp
  const updateUserDocument = async (id, data) => {
    if (!user.value) throw new Error('User must be authenticated');
    
    try {
      loading.value = true;
      error.value = null;
      
      const docData = {
        ...data,
        updatedAt: new Date()
      };
      
      await updateDocument(collectionName, id, docData);
      await loadUserDocuments();
    } catch (err) {
      console.error(`Error updating ${collectionName}:`, err);
      error.value = `Failed to update ${collectionName.replace('_', ' ')}`;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  // Delete a document
  const deleteUserDocument = async (id) => {
    if (!user.value) throw new Error('User must be authenticated');
    
    try {
      loading.value = true;
      error.value = null;
      
      await deleteDocument(collectionName, id);
      await loadUserDocuments();
    } catch (err) {
      console.error(`Error deleting ${collectionName}:`, err);
      error.value = `Failed to delete ${collectionName.replace('_', ' ')}`;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  
  return {
    documents,
    loading,
    error,
    loadUserDocuments,
    addDocument,
    updateUserDocument,
    deleteUserDocument
  };
}
