import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Animated,
  useWindowDimensions,
  Platform,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALPHABETS } from '@/data/alphabets';
import { useAudioCache } from '@/hooks/useAudioCache';

type Alphabet = (typeof ALPHABETS)[number];

const SPACING = 16;

/* ---------- Responsive Helpers ---------- */

const getNumColumns = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

/* ---------- Grid Item ---------- */

const GridItem = React.memo(
  ({
    item,
    size,
    onPress,
  }: {
    item: Alphabet;
    size: number;
    onPress: (item: Alphabet) => void;
  }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false);
    }, [item.id]);

    const handlePress = useCallback(() => {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 0.96,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();

      onPress(item);
    }, [item, onPress, scale]);

    const imageSize = useMemo(() => ({
      width: size * 0.55,
      height: size * 0.55,
    }), [size]);

    return (
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[
            styles.card,
            {
              width: size,
              height: size,
              backgroundColor: item.color,
              transform: [{ scale }],
              padding: size * 0.08,
            },
          ]}
        >
          {!imageError ? (
            <Image
              source={item.getImage()}
              resizeMode="contain"
              onError={() => setImageError(true)}
              style={{
                ...imageSize,
                flex: 1,
              }}
            />
          ) : (
            <View
              style={{
                ...imageSize,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 32 }}>📸</Text>
            </View>
          )}

          <Text
            style={[styles.letter, { fontSize: size * 0.22 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.letter}
          </Text>

          <Text
            style={[styles.name, { fontSize: size * 0.09 }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.name}
          </Text>
        </Animated.View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memoization
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.size === nextProps.size
    );
  }
);

/* ---------- Screen ---------- */

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const numColumns = useMemo(() => getNumColumns(width), [width]);
  
  const cardSize = useMemo(() => 
    (width - SPACING * (numColumns + 1)) / numColumns,
    [width, numColumns]
  );

  const playSound = useCallback(async (alphabet: Alphabet) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (alphabet.soundUrl) {
        // Download and cache audio on demand
        const { downloadAudio } = useAudioCache(alphabet.soundUrl);
        const audioPath = await downloadAudio();

        if (!audioPath) {
          Alert.alert('Error', 'Failed to load audio. Please check your internet connection.');
          return;
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioPath }
        );
        setSound(newSound);
        await newSound.playAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
      Alert.alert('Error', 'Failed to play audio');
    }
  }, [sound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {});
      }
    };
  }, [sound]);

  const columnWrapperStyle = useMemo(
    () =>
      numColumns > 1
        ? { justifyContent: 'space-between' as const }
        : undefined,
    [numColumns]
  );

  const contentContainerStyle = useMemo(() => ({
    padding: SPACING,
    paddingBottom: insets.bottom + 140,
  }), [insets.bottom]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎓 Learn Alphabets</Text>
        <Text style={styles.subtitle}>
          Tap each card to hear the name
        </Text>
      </View>

      {/* Grid */}
      <FlatList
        data={ALPHABETS}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={columnWrapperStyle}
        contentContainerStyle={contentContainerStyle}
        renderItem={({ item }) => (
          <GridItem
            item={item}
            size={cardSize}
            onPress={playSound}
          />
        )}
        removeClippedSubviews={true}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        scrollIndicatorInsets={{ right: 1 }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    paddingTop:
      Platform.OS === 'web' ? 24 : Platform.OS === 'ios' ? 56 : 48,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#4A90E2',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 14,
    color: '#FFF',
  },

  card: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SPACING / 2,
    flexDirection: 'column',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  letter: {
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
    textAlign: 'center',
  },

  name: {
    color: '#fff',
    marginTop: 2,
    textAlign: 'center',
  },
});
