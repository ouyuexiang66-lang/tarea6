import { z } from 'zod';

/**
 * Interfaz base con las propiedades compartidas por todos los tipos de notas.
 * Hacemos 'updatedAt' opcional aquí para que no choque en las interfaces hijas.
 */
export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  archived?: boolean; // 👈 ¡IMPRESCINDIBLE añadir esto aquí!
}

export interface Note extends BaseNote {
  content: string;
}

export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}


/**
 * Representa un ítem individual dentro de una lista de tareas.
 */
export interface ChecklistItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

/**
 * Nota de texto tradicional (Extiende de BaseNote).
 * Hereda id, title, createdAt, updatedAt y archived automáticamente.
 */
export interface Note extends BaseNote {
  content: string;
}

/**
 * Nota de tipo lista de tareas pendientes (Extiende de BaseNote).
 * Corregida: Eliminados los campos duplicados que chocaban con la base.
 */
export interface ChecklistNote extends BaseNote {
  items: ChecklistItem[];
}

/**
 * Nota rápida/Idea mental con etiquetas y color personalizado (Extiende de BaseNote).
 */
export interface IdeaNote extends BaseNote {
  tags: string[];
  color: string;
}

/**
 * Tipo de unión (Union Type) que engloba cualquier variante de nota disponible en NoteFlow.
 */
export type AnyNote = Note | ChecklistNote | IdeaNote;


// --- GUARDAS DE TIPO (Type Guards) ---

export function isTextNote(note: AnyNote): note is Note {
  return 'content' in note;
}

export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return 'tags' in note;
}


// --- ESQUEMAS DE VALIDACIÓN ZOD ---

export const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

export const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  items: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, 'La tarea no puede estar vacía'),
      isCompleted: z.boolean(),
    })
  ).min(1, 'Debes añadir al menos una tarea a la lista'),
});

export const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  color: z.string().startsWith('#', 'Debe ser un color hexadecimal válido'),
  tags: z.array(z.string()).min(1, 'Añade al menos una etiqueta para clasificar tu idea'),
});