import { create } from 'zustand';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NotesState {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void;
  addIdea: (idea: IdeaNote) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  // Estados iniciales con arrays vacíos
  notes: [],
  checklists: [],
  ideas: [],

  // Acciones de inserción
  addNote: (nuevaNota) => 
    set((state) => ({ notes: [...state.notes, nuevaNota] })),

  addChecklist: (nuevoChecklist) => 
    set((state) => ({ checklists: [...state.checklists, nuevoChecklist] })),

  addIdea: (nuevaIdea) => 
    set((state) => ({ ideas: [...state.ideas, nuevaIdea] })),
}));