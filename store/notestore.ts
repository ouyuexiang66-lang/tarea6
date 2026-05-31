import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { Note, ChecklistNote, IdeaNote } from '../types';

interface NoteStore {
  notes: Note[];
  checklists: ChecklistNote[];
  ideas: IdeaNote[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addNote: (note: Note) => void;
  addChecklist: (checklist: ChecklistNote) => void; // 👈 ¡AÑADIR ESTA!
  addIdea: (idea: IdeaNote) => void;               // 👈 ¡AÑADIR ESTA!
  archiveNote: (id: string) => void;
  deleteNotePermanently: (id: string) => void;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
}

export const useNotesStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      checklists: [],
      ideas: [],
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      // --- INSERCIONES ---
      addNote: (note) => set((state) => ({ 
        notes: [note, ...state.notes] 
      })),

      addChecklist: (checklist) => set((state) => ({ 
        checklists: [checklist, ...state.checklists] 
      })),

      addIdea: (idea) => set((state) => ({ 
        ideas: [idea, ...state.ideas] 
      })),

      // --- ARCHIVADO Y BORRADO ---
      archiveNote: (id) => set((state) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        return {
          notes: state.notes.map(n => n.id === id ? { ...n, archived: true } : n)
        };
      }),

      deleteNotePermanently: (id) => set((state) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        return {
          notes: state.notes.filter(n => n.id !== id)
        };
      }),
      

      // --- LOGICA DE CHECKLISTS + HAPTICS NATIVOS ---
      toggleChecklistItem: (checklistId, itemId) => set((state) => {
        const updatedChecklists = state.checklists.map((chk) => {
          if (chk.id !== checklistId) return chk;

          const updatedItems = chk.items.map(item => 
            item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
          );

          // Si el usuario completa el 100% de la lista, doble vibración (Success)
          const todosCompletados = updatedItems.every(item => item.isCompleted);
          if (todosCompletados) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          return { ...chk, items: updatedItems, updatedAt: new Date() };
        });

        return { checklists: updatedChecklists };
      }),
    }),
    {
      name: 'noteflow-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    }
  )
);