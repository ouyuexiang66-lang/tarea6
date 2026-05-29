import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Note } from '../../types';
import { useAppTheme, DesignTokens } from '../../constants/themes';

interface NoteCardProps {
  item: Note;
}

export default function NoteCard({ item }: NoteCardProps) {
  const theme = useAppTheme();
  
  // Formatear la fecha de forma legible
  const fechaFormateada = new Date(item.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: theme.colors.text, fontWeight: 'bold' }}>
          {item.title}
        </Text>
        <Text 
          variant="bodyMedium" 
          numberOfLines={2} 
          style={{ color: theme.colors.text, marginVertical: DesignTokens.spacing.xs }}
        >
          {item.content}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.primary, alignSelf: 'flex-end' }}>
          {fechaFormateada}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: DesignTokens.spacing.sm,
    marginHorizontal: DesignTokens.spacing.md,
    elevation: 2,
  },
});