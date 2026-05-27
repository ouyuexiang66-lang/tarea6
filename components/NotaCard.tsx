import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme, DesignTokens } from '../constants/themes';

export default function NotaCard() {
  const theme = useAppTheme(); // Detecta el tema activo automáticamente

    return (
    // Aplicamos el espaciado dinámico y el color de fondo del tema actual
    <View style={[
        styles.card, 
        { backgroundColor: theme.colors.surface, padding: DesignTokens.spacing.md }
    ]}>
        <Text style={[
        styles.titulo, 
        { color: theme.colors.text, fontSize: DesignTokens.fontSize.title }
        ] }>
        Título de la Nota
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
    borderRadius: 8,
     marginBottom: DesignTokens.spacing.sm, // Uso del token de espaciado base
    },
    titulo: {
    fontWeight: 'bold',
    }
});