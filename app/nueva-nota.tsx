import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme, DesignTokens } from '../constants/themes';

export default function ModalNuevaNota() {
  const theme = useAppTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.texto, { color: theme.colors.text, fontSize: DesignTokens.fontSize.title }]}>
        Formulario de Creación
      </Text>
      
      {/* Botón nativo para cerrar el modal y volver atrás */}
      <Button title="Cancelar" color={theme.colors.error} onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: DesignTokens.spacing.md },
  texto: { marginBottom: DesignTokens.spacing.lg }
});