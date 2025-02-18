import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from '../config/supabase';
import { useAuthStore } from '../store/auth.store';
import { AuthError, User } from '@supabase/supabase-js';

export class AuthService {
  static async signInWithGoogle(): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        if (error) throw error;

        if (data?.user) {
          useAuthStore.getState().setUser(data.user);
          return { user: data.user, error: null };
        }

        throw new Error('No user data received from Supabase');
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      return { user: null, error: error as AuthError };
    }
  }

  static async signOut() {
    try {
      await supabase.auth.signOut();
      await GoogleSignin.signOut();
      useAuthStore.getState().setUser(null);
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as AuthError };
    }
  }
}
