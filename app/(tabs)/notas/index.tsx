import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme, DesignTokens } from '../../../constants/themes';
import NotaCard from '../../../components/NotaCard';

export default function PantallaNotas() {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={{ padding: DesignTokens.spacing.md, width: '100%' }}>
        <Text style={[styles.titulo, { color: theme.colors.text }]}>Mis Notas</Text>
        <NotaCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
  titulo: { fontSize: DesignTokens.fontSize.header, fontWeight: 'bold', marginBottom: DesignTokens.spacing.md }
});