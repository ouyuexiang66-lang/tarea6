import { useNotesContext } from '../context/NotesContext';

export const useNotes = () => {
  const { notes, addNote, toggleNoteStatus, deleteNote } = useNotesContext();

  // Aquí podemos añadir lógica de filtrado o búsquedas más adelante
  const activeNotes = notes.filter((note) => note.status === 'active');
  const archivedNotes = notes.filter((note) => note.status === 'archived');

  return {
    activeNotes,
    archivedNotes,
    createNewNote: addNote,
    archiveNote: (id: string) => toggleNoteStatus(id, 'active'),
    unarchiveNote: (id: string) => toggleNoteStatus(id, 'archived'),
    removeNote: deleteNote,
  };
};