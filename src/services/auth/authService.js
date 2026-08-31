/**
 * Authentication Service Interface contract.
 * Swap implementation in authService.js when connecting Firebase Auth.
 */

import { mockAuthService } from './mockAuthService';

// Default export uses mockAuthService for now
export const authService = {
  /**
   * Triggers Google Sign-In flow
   * @returns {Promise<import('../../models/User').User>}
   */
  signInWithGoogle: () => mockAuthService.signInWithGoogle(),

  /**
   * Signs out the current user
   * @returns {Promise<void>}
   */
  signOut: () => mockAuthService.signOut(),

  /**
   * Retrieves stored user session if any exists
   * @returns {import('../../models/User').User|null}
   */
  getCurrentUser: () => mockAuthService.getCurrentUser(),

  /**
   * Listens to Auth changes
   * @param {(user: import('../../models/User').User|null) => void} listener
   * @returns {() => void} unsubscribe function
   */
  onAuthStateChanged: (listener) => mockAuthService.onAuthStateChanged(listener),
};
