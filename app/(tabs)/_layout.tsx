import React from 'react';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: Colors[colorScheme].tint,
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
              name="textformat.abc"
              size={28}
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
              name="speaker.wave.2.fill"
              size={28}
              color={color}
            />
          ),
        }}
      />

      {/* Hidden Explore tab */}
      <Tabs.Screen
        name="explore"
        options={{ href: null }}
      />
    </Tabs>
  );
}
