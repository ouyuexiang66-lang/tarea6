import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../constants/themes';

export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarStyle: { backgroundColor: theme.colors.surface },
      headerStyle: { backgroundColor: theme.colors.surface },
      headerTintColor: theme.colors.text,
    }}>
      <Tabs.Screen
        name="notas"
        options={{
          title: 'Mis Notas',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="checklist"
        options={{
          title: 'Tareas',
          headerShown: false, 
          tabBarIcon: ({ color,size }) => <Ionicons name="checkbox" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => <Ionicons name="bulb" size={size} color={color} />,
        }}
      />


    </Tabs>
  );
}


