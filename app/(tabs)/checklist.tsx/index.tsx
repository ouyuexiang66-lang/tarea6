import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../../store/notestore'; // CORREGIDO: 'S' mayúscula
import { useAppTheme, DesignTokens } from '../../../constants/themes';
import ChecklistCard from '../../../components/items/ChecklistCard';
import { ChecklistNote } from '../../../types';

export default function PantallaChecklists() {
  const theme = useAppTheme();
  
  // Consumimos el array de checklists del store global
  const checklists = useNotesStore((state) => state.checklists);

  // 1. Declaramos la constante puente para saltar las restricciones de la librería
  const FlexibleFlashList = FlashList as any;
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.titulo, { color: theme.colors.text }]}>Mis Tareas</Text>
      </View>

      {/* 2. TIPADO EXPLÍCITO: Evitamos el error implícito pasándole ChecklistNote */}
      <FlexibleFlashList
        data={checklists}
        renderItem={({ item }: { item: ChecklistNote }) => <ChecklistCard item={item} />}
        estimatedItemSize={95} 
        keyExtractor={(item: ChecklistNote) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start' },
  headerContainer: {
    paddingHorizontal: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
  },
  titulo: { 
    fontSize: DesignTokens.fontSize.header, 
    fontWeight: 'bold', 
    marginBottom: DesignTokens.spacing.md 
  },
  listContent: { paddingBottom: DesignTokens.spacing.lg }
});