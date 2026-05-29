import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../../store/notestore'; 
import { useAppTheme, DesignTokens } from '../../../constants/themes';
import IdeaCard from '../../../components/items/IdeaCard';
import { IdeaNote } from '../../../types';

export default function PantallaIdeas() {
  const theme = useAppTheme();
  
  // Consumimos el array de ideas rápidas del store global
  const ideas = useNotesStore((state) => state.ideas);

  // 1. Declaramos la constante puente para evitar el problema de estimatedItemSize
  const FlexibleFlashList = FlashList as any;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.titulo, { color: theme.colors.text }]}>Banco de Ideas</Text>
      </View>

      {/* 2. TIPADO EXPLÍCITO: Añadimos el tipo : { item: IdeaNote } para fulminar el error de 'any' */}
      <FlexibleFlashList
        data={ideas}
        renderItem={({ item }: { item: IdeaNote }) => <IdeaCard item={item} />}
        estimatedItemSize={85} 
        keyExtractor={(item: IdeaNote) => item.id}
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