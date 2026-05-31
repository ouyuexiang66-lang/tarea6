import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Note } from './types';

export default function App() {
  const [nota, setNota] = useState('');
  const [listaNotas, setListaNotas] = useState<Note[]>([]);

  // Función para añadir una nota cumpliendo la interfaz estricta
  const añadirNota = () => {
    if (nota.trim() === '') return; 

    const nuevaNota: Note = {
      id: Date.now().toString(),
      title: nota.trim().substring(0, 20) + (nota.length > 20 ? '...' : ''), 
      content: nota, 
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false
    };

    setListaNotas([...listaNotas, nuevaNota]);
    setNota(''); 
  };

  // Función para borrar una nota tipando el ID de forma explícita
  const borrarNota = (id: string) => {
    setListaNotas(listaNotas.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>📝 Mis 3 Cosas</Text>

      {/* Input y Botón */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Escribe una nota importante..."
          value={nota}
          onChangeText={setNota}
        />
        <TouchableOpacity style={styles.boton} onPress={añadirNota}>
          <Text style={styles.textoBoton}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Notas Optimizada y Tipada */}
      <FlatList
        data={listaNotas}
        keyExtractor={(item: Note) => item.id} 
        renderItem={({ item }: { item: Note }) => ( 
          <View style={styles.tarjetaNota}>
            <Text style={styles.textoNota}>{item.content}</Text>
            <TouchableOpacity onPress={() => borrarNota(item.id)}>
              <Text style={styles.iconoBorrar}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 20, paddingTop: 40 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: '#FFF', padding: 15, borderRadius: 10, fontSize: 16, elevation: 2 },
  boton: { backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', width: 50, marginLeft: 10, borderRadius: 10 },
  textoBoton: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  tarjetaNota: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, elevation: 1 },
  textoNota: { fontSize: 16, color: '#333', flex: 1 },
  iconoBorrar: { fontSize: 18, paddingLeft: 10 }
});