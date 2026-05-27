import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppTheme, DesignTokens } from '../../../constants/themes';

export default function DetalleNota() {
    const theme = useAppTheme();
  // useLocalSearchParams captura el id directamente desde la URL/Ruta
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.texto, { color: theme.colors.text, fontSize: DesignTokens.fontSize.body }]}>
        Viendo el detalle del elemento con ID: {id}
        </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    texto: { fontWeight: 'bold' }
});