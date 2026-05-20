import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Note, NoteStatus } from '../types';

interface NotesContextType {
  notes: Note[];
  addNote: (text: string, tags?: string[]) => void;
  toggleNoteStatus: (id: string, currentStatus: NoteStatus) => void;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (text: string, tags: string[] = []) => {
    const newNote: Note = {
      id: Date.now().toString(), // ID temporal único
      text,
      createdAt: Date.now(),
      status: 'active',
      tags,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const toggleNoteStatus = (id: string, currentStatus: NoteStatus) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, status: currentStatus === 'active' ? 'archived' : 'active' }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, toggleNoteStatus, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext debe ser utilizado dentro de un NotesProvider');
  }
  return context;
};