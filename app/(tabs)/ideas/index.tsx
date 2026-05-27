import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme, DesignTokens } from '../../../constants/themes';

export default function PantallaIdeas() {
  const theme = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, fontSize: DesignTokens.fontSize.title }}>
        Espacio para Notas Rápidas e Ideas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
