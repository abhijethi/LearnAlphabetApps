import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* 🅰️ ABC / Alphabets */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'ABC',
          tabBarLabel: 'ABC',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="textformat.abc"
              color={color}
            />
          ),
        }}
      />

      {/* 🔊 Phonics / Sounds */}
      <Tabs.Screen
        name="phonics"
        options={{
          title: 'Phonics',
          tabBarLabel: 'Phonics',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="speaker.wave.2.fill"
              color={color}
            />
          ),
        }}
      />

      {/* Hidden Explore tab */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
