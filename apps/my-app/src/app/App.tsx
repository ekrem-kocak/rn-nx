import React, { useEffect, useState } from 'react';
import { Navigation } from './navigation';
import { configureGoogleSignIn, checkCurrentUser } from './config/google-signin';
import { GluestackUIProvider, useThemeStore } from '@rn-nx/core';

import '../global.css';

export default function App() {
  const { theme } = useThemeStore();

  const { toggleTheme } = useThemeStore();
  

  useEffect(() => {
    configureGoogleSignIn();
    void checkCurrentUser();
  }, []);

  return (
    <GluestackUIProvider mode={theme}>
      <Navigation />
    </GluestackUIProvider>
  );
}
