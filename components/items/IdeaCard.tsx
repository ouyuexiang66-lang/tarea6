import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';
import { IdeaNote } from '../../types';
import { DesignTokens } from '../../constants/themes';

interface IdeaCardProps {
  item: IdeaNote;
}

export default function IdeaCard({ item }: IdeaCardProps) {
  return (
    // Usamos el color de fondo personalizado que viene en el modelo de la idea
    <Card style={[styles.card, { backgroundColor: item.color || '#FFFDE7' }]}>
      <Card.Content>
        <Text variant="titleMedium" style={{ color: '#333333', fontWeight: 'bold' }}>
          {item.title}
        </Text>
        
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {item.tags.map((tag, index) => (
              <Chip 
                key={index} 
                style={styles.chip} 
                textStyle={styles.chipText}
                compact
              >
                #{tag}
              </Chip>
            ))}
          </View>
        )}
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: DesignTokens.spacing.sm,
    gap: DesignTokens.spacing.xs,
  },
  chip: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 6,
  },
  chipText: {
    fontSize: 11,
    color: '#444444',
  }
});