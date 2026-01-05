import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAssetManager } from '@/hooks/useAssetManager';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoading, progress, assetsReady } = useAssetManager();

  // Show loading screen on first launch
  if (isLoading || !assetsReady) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#4A90E2'
      }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
          🎓 Alphabet Learning
        </Text>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 20, fontSize: 16 }}>
          Loading assets...
        </Text>
        <Text style={{ color: '#fff', marginTop: 10, fontSize: 14, opacity: 0.9 }}>
          {progress}%
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
