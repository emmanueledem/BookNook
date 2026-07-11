import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Platform } from 'react-native';



SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 1200));
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return (
    <PaperProvider>
      {/* ← Remove <StatusBar /> entirely */}
      <Stack
        screenOptions={{
          headerShown: false,
          ...(Platform.OS === 'android' && {
            statusBarStyle: 'dark',
            statusBarAnimation: 'fade',
          }),
        }}
      />
    </PaperProvider>
  );
}