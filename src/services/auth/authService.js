import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../../config/firebase';
import { mockAuthService } from './mockAuthService';
import { createUser } from '../../models/User';

/**
 * Maps Firebase Auth error codes to user-friendly messages.
 * @param {Error} error
 * @returns {string}
 */
export function getFriendlyAuthErrorMessage(error) {
  if (!error) return 'An unknown authentication error occurred.';
  const code = error.code || '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in cancelled: The login popup was closed before completing.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in cancelled: Another sign-in popup request is already active.';
    case 'auth/popup-blocked':
      return 'Sign-in blocked: Your browser blocked the login popup. Please allow popups for this site.';
    case 'auth/network-request-failed':
      return 'Network error: Please check your internet connection and try again.';
    case 'auth/unauthorized-domain':
      return 'Domain error: This domain is not authorized in your Firebase console for Google Sign-In.';
    case 'auth/user-disabled':
      return 'Account disabled: This user account has been disabled.';
    case 'auth/operation-not-allowed':
      return 'Sign-in disabled: Google Sign-In is not enabled in your Firebase console.';
    default:
      return error.message || 'Failed to sign in with Google. Please try again.';
  }
}

/**
 * Syncs Firebase User profile data with Firestore `/users/{uid}` document.
 * @param {import('firebase/auth').User} firebaseUser
 * @returns {Promise<object>} Merged profile data
 */
async function syncUserProfile(firebaseUser) {
  if (!db || !firebaseUser) return null;

  const userDocRef = doc(db, 'users', firebaseUser.uid);
  let userSnapshot;

  try {
    userSnapshot = await getDoc(userDocRef);
  } catch (err) {
    console.warn('[AuthService] Unable to read user profile from Firestore:', err);
  }

  const defaultProfile = {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName || 'Developer',
    email: firebaseUser.email || '',
    photoURL: firebaseUser.photoURL || null,
    selectedLanguages: ['javascript'],
    xp: 0,
    level: 1,
    streak: 1,
  };

  if (!userSnapshot || !userSnapshot.exists()) {
    // First-time user profile creation
    const newProfile = {
      ...defaultProfile,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    try {
      await setDoc(userDocRef, {
        ...newProfile,
        createdAt: serverTimestamp(),
        lastActiveAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('[AuthService] Unable to create user doc in Firestore:', err);
    }
    return newProfile;
  } else {
    // Returning user: update lastActiveAt
    const existingData = userSnapshot.data();
    const updatedProfile = {
      ...defaultProfile,
      ...existingData,
      displayName: firebaseUser.displayName || existingData.displayName || 'Developer',
      email: firebaseUser.email || existingData.email || '',
      photoURL: firebaseUser.photoURL || existingData.photoURL || null,
      lastActiveAt: new Date().toISOString(),
    };

    try {
      await setDoc(
        userDocRef,
        {
          displayName: updatedProfile.displayName,
          email: updatedProfile.email,
          photoURL: updatedProfile.photoURL,
          lastActiveAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('[AuthService] Unable to update lastActiveAt in Firestore:', err);
    }
    return updatedProfile;
  }
}

/**
 * Format Firebase user into standard app User object
 * @param {import('firebase/auth').User} firebaseUser
 * @param {object} [profileData]
 * @returns {import('../../models/User').User}
 */
function formatFirebaseUser(firebaseUser, profileData = {}) {
  if (!firebaseUser) return null;
  return createUser({
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName || profileData.displayName || 'Developer',
    email: firebaseUser.email || profileData.email || '',
    photoURL: firebaseUser.photoURL || profileData.photoURL || null,
    selectedLanguages: profileData.selectedLanguages || ['javascript'],
    xp: profileData.xp ?? 0,
    level: profileData.level ?? 1,
    streak: profileData.streak ?? 1,
    createdAt: profileData.createdAt || new Date().toISOString(),
    lastActiveAt: profileData.lastActiveAt || new Date().toISOString(),
  });
}

export const authService = {
  /**
   * Triggers Google Sign-In flow
   * @returns {Promise<import('../../models/User').User>}
   */
  signInWithGoogle: async () => {
    if (!isFirebaseConfigured()) {
      console.info('[AuthService] Firebase env vars missing; using mock Google sign-in.');
      return mockAuthService.signInWithGoogle();
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profileData = await syncUserProfile(result.user);
      return formatFirebaseUser(result.user, profileData);
    } catch (error) {
      const friendlyMessage = getFriendlyAuthErrorMessage(error);
      const errObj = new Error(friendlyMessage);
      errObj.code = error.code;
      throw errObj;
    }
  },

  /**
   * Signs out current user
   * @returns {Promise<void>}
   */
  signOut: async () => {
    if (!isFirebaseConfigured()) {
      return mockAuthService.signOut();
    }
    await firebaseSignOut(auth);
  },

  /**
   * Retrieves currently cached user session
   * @returns {import('../../models/User').User|null}
   */
  getCurrentUser: () => {
    if (!isFirebaseConfigured()) {
      return mockAuthService.getCurrentUser();
    }
    return auth?.currentUser ? formatFirebaseUser(auth.currentUser) : null;
  },

  /**
   * Listens to Auth state changes
   * @param {(user: import('../../models/User').User|null) => void} listener
   * @returns {() => void} unsubscribe function
   */
  onAuthStateChanged: (listener) => {
    if (!isFirebaseConfigured()) {
      return mockAuthService.onAuthStateChanged(listener);
    }

    return firebaseOnAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let profileData = {};
        try {
          profileData = await syncUserProfile(firebaseUser);
        } catch (e) {
          console.warn('[AuthService] Profile sync error on state change:', e);
        }
        listener(formatFirebaseUser(firebaseUser, profileData));
      } else {
        listener(null);
      }
    });
  },
};
