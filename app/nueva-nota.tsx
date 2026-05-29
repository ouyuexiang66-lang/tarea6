import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/notestore'; // Ruta a tu store de Zustand
import { useAppTheme, DesignTokens } from '../constants/themes';

// --- SCHEMAS DE VALIDACIÓN CON ZOD ---
const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, 'La tarea no puede estar vacía'),
      isCompleted: z.boolean(),
    })
  ).min(1, 'Debes añadir al menos una tarea a la lista'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  color: z.string().startsWith('#', 'Debe ser un color hexadecimal válido'),
  tags: z.array(z.string()).min(1, 'Añade al menos una etiqueta para clasificar tu idea'),
});

type TipoElemento = 'note' | 'checklist' | 'idea';

export default function ModalNuevaNota() {
  const theme = useAppTheme();
  const router = useRouter();
  
  // Acciones de inserción de Zustand
  const addNote = useNotesStore((state) => state.addNote);
  const addChecklist = useNotesStore((state) => state.addChecklist);
  const addIdea = useNotesStore((state) => state.addIdea);

  // Estados del Formulario
  const [tipo, setTipo] = useState<TipoElemento>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Estados dinámicos (Checklist)
  const [items, setItems] = useState<{ id: string; text: string; isCompleted: boolean }[]>([]);
  const [nuevoItemText, setNuevoItemText] = useState('');

  // Estados dinámicos (Ideas)
  const [colorSeleccionado, setColorSeleccionado] = useState('#FEF08A'); // Amarillo pastel por defecto
  const [tags, setTags] = useState<string[]>([]);
  const [nuevaTagText, setNuevaTagText] = useState('');

  // Control de errores de validación
  const [errores, setErrores] = useState<Record<string, string>>({});

  const coloresIdeas = ['#FEF08A', '#BFDBFE', '#BBF7D0', '#FBCFE8', '#E9D5FF'];

  // --- CONTROLADORES DINÁMICOS ---
  const gestionarAñadirTask = () => {
    if (!nuevoItemText.trim()) return;
    setItems([...items, { id: Date.now().toString(), text: nuevoItemText.trim(), isCompleted: false }]);
    setNuevoItemText('');
  };

  const gestionarAñadirTag = () => {
    if (!nuevaTagText.trim()) return;
    const tagLimpia = nuevaTagText.trim().toLowerCase();
    if (!tags.includes(tagLimpia)) {
      setTags([...tags, tagLimpia]);
    }
    setNuevaTagText('');
  };

  const guardarElemento = () => {
    setErrores({});

    try {
      // Instanciamos un objeto Date nativo de JavaScript para cumplir tus tipos globales
      const fechaActual = new Date(); 

      if (tipo === 'note') {
        const datosValidados = noteSchema.parse({ title, content });
        addNote({
          id: Date.now().toString(),
          title: datosValidados.title,
          content: datosValidados.content,
          createdAt: fechaActual, // Satisface la propiedad requerida de tipo Date
          updatedAt: fechaActual, // Satisface la propiedad requerida de tipo Date
        });
      } 
      else if (tipo === 'checklist') {
        const datosValidados = checklistSchema.parse({ title, items });
        addChecklist({
          id: Date.now().toString(),
          title: datosValidados.title,
          items: datosValidados.items,
          createdAt: fechaActual,
          updatedAt: fechaActual,
        });
      } 
      else if (tipo === 'idea') {
        const datosValidados = ideaSchema.parse({ title, color: colorSeleccionado, tags });
        addIdea({
          id: Date.now().toString(),
          title: datosValidados.title,
          color: datosValidados.color,
          tags: datosValidados.tags,
          createdAt: fechaActual,
          updatedAt: fechaActual,
        });
      }

      router.back(); // Regresar tras guardar con éxito

    } catch (error) {
      if (error instanceof z.ZodError) {
        const erroresMapeados: Record<string, string> = {};
        // .issues y .path[0] tipados estrictamente para Zod
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            erroresMapeados[issue.path[0].toString()] = issue.message;
          }
        });
        setErrores(erroresMapeados);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: theme.colors.surface }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.tituloModal, { color: theme.colors.text }]}>
          Formulario de Creación
        </Text>
        
        {/* Selector de Tipo de Nota */}
        <View style={styles.selectorTipoContainer}>
          {(['note', 'checklist', 'idea'] as TipoElemento[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.btnTipo, 
                { backgroundColor: tipo === t ? theme.colors.primary : theme.colors.surface }
              ]}
              onPress={() => { setTipo(t); setErrores({}); }}
            >
              <Text style={{ 
                color: tipo === t ? '#FFFFFF' : theme.colors.text, 
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {t === 'note' ? 'Nota' : t === 'checklist' ? 'Tareas' : 'Idea'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- CAMPO COMÚN: TÍTULO --- */}
        <Text style={[styles.label, { color: theme.colors.text }]}>Título</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderWidth: 1, borderColor: '#E4E4E7' }]}
          placeholder="Escribe un título descriptivo..."
          placeholderTextColor="#A1A1AA"
          value={title}
          onChangeText={setTitle}
        />
        {errores.title && <Text style={styles.errorText}>{errores.title}</Text>}

        {/* --- CAMPOS DINÁMICOS --- */}
        
        {tipo === 'note' && (
          <View style={styles.seccionDinamica}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Contenido</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderWidth: 1, borderColor: '#E4E4E7' }]}
              placeholder="Escribe el cuerpo de la nota..."
              placeholderTextColor="#A1A1AA"
              multiline
              numberOfLines={6}
              value={content}
              onChangeText={setContent}
              textAlignVertical="top"
            />
            {errores.content && <Text style={styles.errorText}>{errores.content}</Text>}
          </View>
        )}

        {tipo === 'checklist' && (
          <View style={styles.seccionDinamica}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Añadir Tareas</Text>
            <View style={styles.inputFila}>
              <TextInput
                style={[styles.inputFlex, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderWidth: 1, borderColor: '#E4E4E7' }]}
                placeholder="Ej. Diseñar la base de datos"
                placeholderTextColor="#A1A1AA"
                value={nuevoItemText}
                onChangeText={setNuevoItemText}
              />
              <TouchableOpacity style={[styles.btnAñadir, { backgroundColor: theme.colors.primary }]} onPress={gestionarAñadirTask}>
                <Text style={styles.btnAñadirTexto}>+</Text>
              </TouchableOpacity>
            </View>
            {errores.items && <Text style={styles.errorText}>{errores.items}</Text>}

            {items.map((item) => (
              <View key={item.id} style={[styles.itemFila, { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: '#E4E4E7' }]}>
                <Text style={{ color: theme.colors.text }}>✓ {item.text}</Text>
              </View>
            ))}
          </View>
        )}

        {tipo === 'idea' && (
          <View style={styles.seccionDinamica}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Color Identificativo</Text>
            <View style={styles.paletaContainer}>
              {coloresIdeas.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.circuloColor, 
                    { backgroundColor: color, borderWidth: colorSeleccionado === color ? 3 : 0, borderColor: theme.colors.primary }
                  ]}
                  onPress={() => setColorSeleccionado(color)}
                />
              ))}
            </View>
            {errores.color && <Text style={styles.errorText}>{errores.color}</Text>}

            <Text style={[styles.label, { color: theme.colors.text }]}>Etiquetas (Tags)</Text>
            <View style={styles.inputFila}>
              <TextInput
                style={[styles.inputFlex, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderWidth: 1, borderColor: '#E4E4E7' }]}
                placeholder="Ej. refactor, marketing"
                placeholderTextColor="#A1A1AA"
                value={nuevaTagText}
                onChangeText={setNuevaTagText}
              />
              <TouchableOpacity style={[styles.btnAñadir, { backgroundColor: theme.colors.primary }]} onPress={gestionarAñadirTag}>
                <Text style={styles.btnAñadirTexto}>+</Text>
              </TouchableOpacity>
            </View>
            {errores.tags && <Text style={styles.errorText}>{errores.tags}</Text>}

            <View style={styles.chipsContainer}>
              {tags.map((tag) => (
                <View key={tag} style={[styles.chip, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.chipTexto}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* --- BOTONES DE ACCIÓN --- */}
        <TouchableOpacity style={[styles.btnGuardar, { backgroundColor: theme.colors.primary }]} onPress={guardarElemento}>
          <Text style={styles.btnGuardarTexto}>Guardar Elemento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnCancelar, { borderColor: theme.colors.error }]} onPress={() => router.back()}>
          <Text style={[styles.btnCancelarTexto, { color: theme.colors.error }]}>Cancelar</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: DesignTokens.spacing.md,
    paddingBottom: DesignTokens.spacing.xl,
  },
  tituloModal: {
    fontSize: DesignTokens.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: DesignTokens.spacing.lg,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: DesignTokens.spacing.md,
    marginBottom: DesignTokens.spacing.xs,
  },
  selectorTipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DesignTokens.spacing.md,
  },
  btnTipo: {
    flex: 1,
    paddingVertical: DesignTokens.spacing.sm,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7'
  },
  input: {
    padding: DesignTokens.spacing.sm,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
  },
  seccionDinamica: {
    marginTop: DesignTokens.spacing.xs,
  },
  inputFila: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: {
    flex: 1,
    padding: DesignTokens.spacing.sm,
    borderRadius: 8,
    fontSize: 16,
  },
  btnAñadir: {
    marginLeft: DesignTokens.spacing.sm,
    paddingHorizontal: DesignTokens.spacing.md,
    paddingVertical: DesignTokens.spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAñadirTexto: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemFila: {
    padding: DesignTokens.spacing.sm,
    borderRadius: 6,
    marginTop: 6,
  },
  paletaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: DesignTokens.spacing.xs,
  },
  circuloColor: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: DesignTokens.spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DesignTokens.spacing.sm,
  },
  chip: {
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  chipTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  btnGuardar: {
    marginTop: DesignTokens.spacing.xl,
    padding: DesignTokens.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnGuardarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnCancelar: {
    marginTop: DesignTokens.spacing.sm,
    padding: DesignTokens.spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
  },
});