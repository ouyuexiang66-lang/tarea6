import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NotesProvider } from './noteflow/src/context/NotesContext';
import { HomeScreen } from './noteflow/src/screens/HomeScreen';

export default function App() {
  return (
    <NotesProvider>
      <StatusBar style="auto" />
      <HomeScreen />
    </NotesProvider>
  );
}