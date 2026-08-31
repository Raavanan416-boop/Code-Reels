import { createUser } from '../../models/User';

const STORAGE_KEY = 'codeswipe_auth_user';

class MockAuthService {
  constructor() {
    this.listeners = new Set();
    this.currentUser = this._loadUser();
  }

  _loadUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  _saveUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.listeners.forEach((listener) => listener(this.currentUser));
  }

  async signInWithGoogle() {
    // Simulate network latency for authentic google sign-in feeling
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const mockUser = createUser({
      id: 'usr_' + Math.random().toString(36).slice(2, 9),
      displayName: 'Alex Developer',
      email: 'alex.dev@codeswipe.io',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });

    this._saveUser(mockUser);
    return mockUser;
  }

  async signOut() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    this._saveUser(null);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  onAuthStateChanged(callback) {
    this.listeners.add(callback);
    callback(this.currentUser);
    return () => {
      this.listeners.delete(callback);
    };
  }
}

export const mockAuthService = new MockAuthService();
