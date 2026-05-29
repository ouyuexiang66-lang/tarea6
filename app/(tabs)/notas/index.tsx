import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../../store/notestore';
import { useAppTheme, DesignTokens } from '../../../constants/themes'; // Cambiado a 'theme'
import NoteCard from '../../../components/items/NoteCard'; // Ruta a la nueva tarjeta interna
import { Note } from '../../../types';

export default function PantallaNotas() {
  const theme = useAppTheme();
  
  // Conectamos con Zustand para obtener el array de notas en tiempo real
  const notes = useNotesStore((state) => state.notes);
  const FlexibleFlashList = FlashList as any;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.titulo, { color: theme.colors.text }]}>Mis Notas</Text>
      </View>

      {/* Lista de alto rendimiento */}
    <FlexibleFlashList
        data={notes}
        renderItem={({ item }: { item: Note }) => <NoteCard item={item} />}
        estimatedItemSize={110} 
        keyExtractor={(item: Note) => item.id}
        contentContainerStyle={styles.listContent} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start' 
  },
  headerContainer: {
    paddingHorizontal: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
  },
  titulo: { 
    fontSize: DesignTokens.fontSize.header, 
    fontWeight: 'bold', 
    marginBottom: DesignTokens.spacing.md 
  },
  listContent: {
    paddingBottom: DesignTokens.spacing.lg
  }
});