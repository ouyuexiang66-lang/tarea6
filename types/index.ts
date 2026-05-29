/**
 * Interfaz base con las propiedades compartidas por todos los tipos de notas.
 */
export interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
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
 */
export interface Note extends BaseNote {
  content: string;
}

/**
 * Nota de tipo lista de tareas pendientes (Extiende de BaseNote).
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
 * Permite almacenar y procesar colecciones mixtas en un mismo array.
 */
export type AnyNote = Note | ChecklistNote | IdeaNote;


/**
 * Guarda de tipo para verificar si una nota es de texto (Note)
 */
export function isTextNote(note: AnyNote): note is Note {
  return 'content' in note;
}

/**
 * Guarda de tipo para verificar si una nota es una lista de tareas (ChecklistNote)
 */
export function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}

/**
 * Guarda de tipo para verificar si una nota es una idea rápida (IdeaNote)
 */
export function isIdeaNote(note: AnyNote): note is IdeaNote {
  return 'tags' in note;
}


import { z } from 'zod';

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
      isCompleted: z.boolean(), // <-- CORREGIDO: quitada la 'z.' extra
    })
  ).min(1, 'Debes añadir al menos una tarea a la lista'),
});

export const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  color: z.string().startsWith('#', 'Debe ser un color hexadecimal válido'),
  tags: z.array(z.string()).min(1, 'Añade al menos una etiqueta para clasificar tu idea'),
});