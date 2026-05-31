import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';
import { useNotesStore } from '../../../store/notestore';
import NoteCard from '../../../components/items/NoteCard';
import { useAppTheme } from '../../../constants/themes';
import { Note } from '../../../types';

export default function PantallaNotas() {
  const theme = useAppTheme();
  const router = useRouter();
  
  // Extraemos y filtramos las notas activas
  const notes = useNotesStore((state) => state.notes.filter(n => !n.archived));
  const [search, setSearch] = useState('');

  // Lógica de filtrado en tiempo real
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // Forzamos el tipado amplio sobre el componente para fulminar el error ts(2322)
  const ComponenteLista = FlashList as any;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      {/* BUSCADOR GLOBAL */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: theme.colors.surface, color: theme.colors.text }]}
          placeholder="Buscar notas..."
          placeholderTextColor="#A1A1AA"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* LISTA DINÁMICA UTILIZANDO EL COMPONENTE PARCHEADO */}
      <ComponenteLista
        data={filteredNotes}
        estimatedItemSize={110}
        keyExtractor={(item: Note) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ color: '#A1A1AA', fontSize: 16 }}>
              {search ? 'No se encontraron coincidencias 🔍' : 'No hay notas activas disponibles 📝'}
            </Text>
          </View>
        }
        renderItem={({ item, index }: { item: Note; index: number }) => (
          <Animated.View 
            entering={FadeInDown.delay(index * 30).duration(300)}
            exiting={FadeOutLeft.duration(200)}
          >
            <TouchableOpacity 
              activeOpacity={0.7} 
              onPress={() => router.push({ pathname: '/notas/[id]', params: { id: item.id } })}
            >
              <NoteCard item={item} />
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* BOTÓN FLOTANTE (FAB) */}
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/nueva-nota')}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 12 },
  searchInput: { 
    height: 46, 
    borderRadius: 8, 
    paddingHorizontal: 16, 
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listContent: { paddingBottom: 80, paddingHorizontal: 12 },
  emptyContainer: { padding: 40, alignItems: 'center', justifyContent: 'center' },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabTexto: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' }
});