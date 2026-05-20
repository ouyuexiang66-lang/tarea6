export type NoteStatus = 'active' | 'archived';

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Note {
  id: string;
  text: string;
  createdAt: number;
  status: NoteStatus;
  tags: string[]; // Guardamos los IDs de las etiquetas
  isTodo?: boolean;
  isDone?: boolean;
}