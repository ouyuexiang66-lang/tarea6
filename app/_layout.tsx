import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useAppTheme } from '../constants/themes';

export default function RootLayout() {
    const theme = useAppTheme();

    return (
    <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
        {/* Este nombre debe coincidir exactamente con el nombre de tu carpeta */}
        <Stack.Screen name="(tabs)" /> 
        <Stack.Screen 
            name="nueva-nota" 
            options={{ 
            presentation: 'modal', 
            headerShown: true, 
            title: 'Nueva Nota / Tarea' 
            }} 
        />


        </Stack>
    </PaperProvider>
    );
}




