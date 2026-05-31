import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useNotesStore } from '../store/notestore'; // Ajusta la ruta
import { useAppTheme } from '../constants/themes';

export default function RootLayout() {
  const theme = useAppTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Comprobar si Zustand ya ha leído AsyncStorage
    const checkHydration = () => {
      setIsHydrated(useNotesStore.persist.hasHydrated());
    };

    checkHydration();
    
    // Suscribirse a los eventos de carga de datos
    const unsubscribe = useNotesStore.persist.onHydrate(() => setIsHydrated(false));
    const unsubscribeFinish = useNotesStore.persist.onFinishHydration(() => setIsHydrated(true));

    return () => {
      unsubscribe();
      unsubscribeFinish();
    };
  }, []);

  // Si aún está leyendo el disco, bloqueamos la pantalla con un spinner
  if (!isHydrated) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Cuando ya tiene los datos listos, renderiza las pantallas normalmente
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="nueva-nota" options={{ presentation: 'modal', title: 'Nueva Nota' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});