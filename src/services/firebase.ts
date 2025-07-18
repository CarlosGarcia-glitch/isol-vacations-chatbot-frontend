import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  UserCredential,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type PersistenceType = 'local' | 'session' | 'none';

export const AuthService = {
  auth,

  login: async (
    email: string,
    password: string,
    persistenceType: PersistenceType = 'session',
  ): Promise<UserCredential> => {
    const persistence = browserSessionPersistence;
    await setPersistence(auth, persistence);
    return await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },

  onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
    return onAuthStateChanged(auth, callback);
  },

  syncAuthState: (callback: (user: User | null) => void): void => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'firebase-auth-persistence') {
        callback(auth.currentUser);
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    localStorage.setItem('firebase-auth-persistence', Date.now().toString());
  },
};

export type { User, PersistenceType };
