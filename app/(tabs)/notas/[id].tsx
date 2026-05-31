import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useNotesStore } from '../../../store/notestore'; // 👈 Corregido el número de niveles de carpetas
import { useAppTheme } from '../../../constants/themes';   // 👈 Corregido el número de niveles de carpetas

export default function DetalleNota() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useAppTheme();

  // Tipamos el estado 'state' explícitamente para fulminar los errores ts(7006)
  const note = useNotesStore((state: any) => state.notes.find((n: any) => n.id === id));
  const archiveNote = useNotesStore((state: any) => state.archiveNote);
  const deleteNotePermanently = useNotesStore((state: any) => state.deleteNotePermanently);

  if (!note) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center' }]}>
        <Text style={{ color: theme.colors.text, textAlign: 'center' }}>La nota seleccionada no existe.</Text>
      </View>
    );
  }

  const confirmarArchivado = () => {
    Alert.alert(
      'Archivar nota',
      '¿Seguro que quieres mandar esta nota al archivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Archivar', 
          style: 'destructive',
          onPress: () => {
            archiveNote(note.id);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ title: note.title || 'Detalle de Nota' }} />
      
      <View style={styles.contentWrapper}>
        <Text style={[styles.titulo, { color: theme.colors.text }]}>{note.title}</Text>
        <Text style={[styles.cuerpo, { color: theme.colors.text }]}>{note.content}</Text>
      </View>

      {/* Acciones de la parte inferior */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: theme.colors.surface }]} 
          onPress={confirmarArchivado}
        >
          <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>Archivar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  contentWrapper: { flex: 1, marginTop: 8 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  cuerpo: { fontSize: 16, lineHeight: 24, opacity: 0.85 },
  actionsContainer: { paddingVertical: 16, alignItems: 'center' },
  btn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, minWidth: 150, alignItems: 'center' }
});