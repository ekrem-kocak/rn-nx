import React, { useEffect } from 'react';
import { Navigation } from './navigation';
import { configureGoogleSignIn, checkCurrentUser } from './config/google-signin';
import { GluestackUIProvider } from '@rn-nx/core';

import '../global.css';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
    void checkCurrentUser();
  }, []);

  return (
    <GluestackUIProvider>
      <Navigation />
    </GluestackUIProvider>
  );
}
