import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { ChecklistNote } from '../../types';
import { useAppTheme, DesignTokens } from '../../constants/themes';

interface ChecklistCardProps {
  item: ChecklistNote;
}

export default function ChecklistCard({ item }: ChecklistCardProps) {
  const theme = useAppTheme();
  
  // Calcular el progreso de tareas completadas
  const totalItems = item.items.length;
  const completados = item.items.filter(i => i.isCompleted).length;
  const progreso = totalItems > 0 ? completados / totalItems : 0;

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: theme.colors.text, fontWeight: 'bold' }}>
          {item.title}
        </Text>
        
        <View style={styles.infoRow}>
          <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
            Tareas: {completados}/{totalItems}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
            {Math.round(progreso * 100)}%
          </Text>
        </View>

        <ProgressBar 
          progress={progreso} 
          color={theme.colors.primary} 
          style={styles.progress} 
        />
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: DesignTokens.spacing.xs,
    marginBottom: DesignTokens.spacing.xs,
  },
  progress: {
    height: 6,
    borderRadius: 3,
  }
});