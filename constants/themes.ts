import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

/**
 * Hook personalizado para detectar el tema del móvil
 * y devolver el objeto de colores correcto (Claro u Oscuro).
 */
export function useAppTheme() {
    const scheme = useColorScheme();
    return scheme === 'dark' ? DarkTheme : LightTheme;
}

export const DesignTokens = {
    spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    },
    fontSize: {
    small: 12,
    body: 16,
    title: 22,
    header: 28,
    }
};

// Tema Claro personalizado
export const LightTheme = {
    ...MD3LightTheme,
    colors: {
    ...MD3LightTheme.colors,
    primary: '#4CAF50',       // Verde NoteFlow
    background: '#F5F5F5',    // Fondo gris claro
    surface: '#FFFFFF',       // Tarjetas blancas
    text: '#333333',
    },
};

// Tema Oscuro personalizado
export const DarkTheme = {
    ...MD3DarkTheme,
    colors: {
    ...MD3DarkTheme.colors,
    primary: '#81C784',       // Verde más suave para modo oscuro
    background: '#121212',    // Fondo oscuro
    surface: '#1E1E1E',       // Tarjetas gris oscuro
    text: '#FFFFFF',
    },
};