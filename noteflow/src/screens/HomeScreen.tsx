import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useNotes } from '../hooks/useNotes';

export const HomeScreen = () => {
  const [inputText, setInputText] = useState('');
  const { activeNotes, createNewNote, archiveNote } = useNotes();

  const handleSave = () => {
    if (inputText.trim() === '') return;
    createNewNote(inputText.trim());
    setInputText(''); // Limpia el input tras guardar
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NoteFlow</Text>
          <Text style={styles.headerSubtitle}>Vuelca tus ideas al instante</Text>
        </View>

        {/* Lista de Notas */}
        <FlatList
          data={activeNotes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteText}>{item.text}</Text>
              <TouchableOpacity 
                style={styles.archiveButton} 
                onClick={() => archiveNote(item.id)}
              >
                <Text style={styles.archiveButtonText}>Archivar</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay notas activas. ¡Empieza a escribir abajo!</Text>
          }
        />

        {/* Barra de Entrada Inferior (Captura Rápida) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe una nota rápida..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onClick={handleSave}>
            <Text style={styles.sendButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  listContent: {
    padding: 20,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Sombra para Android
  },
  noteText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  archiveButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  archiveButtonText: {
    fontSize: 12,
    color: '#4B5563',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 40,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    color: '#111827',
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});