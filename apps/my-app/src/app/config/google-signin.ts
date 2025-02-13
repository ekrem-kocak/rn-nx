import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { supabase } from '@rn-nx/core';
import { useAuthStore } from '@rn-nx/core';
import { AuthError } from '@supabase/supabase-js';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID : undefined,
    offlineAccess: true,
  });
};

export const checkCurrentUser = async () => {
  try {
    // Önce Supabase oturumunu kontrol et
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Eğer aktif bir Supabase oturumu varsa, store'u güncelle ve dön
    if (session?.user) {
      useAuthStore.getState().setUser(session.user);
      return { user: session.user, error: null };
    }

    // Supabase oturumu yoksa, Google oturumunu kontrol et
    try {
      // Sessizce Google oturumunu kontrol et
      await GoogleSignin.signInSilently();
      // Eğer oturum varsa token'ları al
      const { idToken } = await GoogleSignin.getTokens();

      if (idToken) {
        // Google oturumu varsa Supabase'e giriş yap
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });

        if (!error && data.user) {
          useAuthStore.getState().setUser(data.user);
          return { user: data.user, error: null };
        }
      }
    } catch (error) {
      // Google oturumu yoksa veya hata olduysa sessizce devam et
      console.log('Google session check failed:', error);
    }

    return { user: null, error: null };
  } catch (error) {
    console.error('Check current user error:', error);
    return { user: null, error: error as AuthError };
  }
};
