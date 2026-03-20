import { ALPHABETS } from '@/data/alphabets';
import { useAudioPlayer } from 'expo-audio';
import { Image as ExpoImage } from 'expo-image';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Alphabet = (typeof ALPHABETS)[number];

const SPACING = 16;

/* ---------- Responsive Helpers ---------- */

const getNumColumns = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

/* ---------- Grid Item ---------- */

const GridItem = memo(
  ({
    item,
    size,
    onPress,
  }: {
    item: Alphabet;
    size: number;
    onPress: (item: Alphabet) => void;
  }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false);
    }, [item.id]);

    // ✅ simple calculations (no useMemo)
    const imageSize = size * 0.55;
    const letterFontSize = size * 0.22;
    const nameFontSize = size * 0.09;

    // ✅ stable press handler
    const handlePress = useCallback(() => {
      onPress(item);
    }, [onPress, item]);

    return (
      <Pressable onPress={handlePress}>
        <View
          style={[
            styles.card,
            {
              width: size,
              height: size,
              backgroundColor: item.color,
              padding: size * 0.08,
            },
          ]}
        >
            {item.image && !imageError ? (
              <ExpoImage
                source={item.image}
                contentFit="contain"
                cachePolicy="memory-disk"
                onError={() => setImageError(true)}
                style={{ width: imageSize, height: imageSize }}
              />
            ) : (
              <View
                style={[
                  styles.fallbackImage,
                  { width: imageSize, height: imageSize },
                ]}
              >
                <Text style={styles.fallbackText}>📸</Text>
              </View>
            )}

            <Text
              style={[styles.letter, { fontSize: letterFontSize }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.letter}
            </Text>

            <Text
              style={[styles.name, { fontSize: nameFontSize }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.name}
            </Text>
          </View>
      </Pressable>
    );
  }
);

/* ---------- Screen ---------- */

export default function HomeScreen() {
  const windowDims = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const player = useAudioPlayer();

  // Stable reference - only update on actual size changes
  const width = useMemo(() => windowDims.width, [windowDims.width]);

  const numColumns = useMemo(() => getNumColumns(width), [width]);

  const cardSize = useMemo(
    () => (width - SPACING * (numColumns + 1)) / numColumns,
    [width, numColumns]
  );

  const columnWrapperStyle = useMemo(
    () => (numColumns > 1 ? { justifyContent: 'space-between' as const } : undefined),
    [numColumns]
  );

  const contentContainerStyle = useMemo(
    () => ({
      padding: SPACING,
      paddingBottom: insets.bottom + 140,
    }),
    [insets.bottom]
  );

  const getItemLayout = useCallback(
    (_data: any, index: number) => {
      const itemsPerRow = numColumns;
      const row = Math.floor(index / itemsPerRow);
      const itemHeight = cardSize + SPACING;
      return {
        length: itemHeight,
        offset: row * itemHeight,
        index,
      };
    },
    [numColumns, cardSize]
  );

  // ✅ FIXED AUDIO (no remove on every tap)
  const playSound = useCallback(
    (alphabet: Alphabet) => {
      if (!alphabet.sound) return;
      player.replace(alphabet.sound);
      player.play();
    },
    [player]
  );

  useEffect(() => {
    return () => {
      player.remove(); // cleanup only
    };
  }, [player]);

  // ✅ memoized renderItem
  const renderItem = useCallback(
    ({ item }: { item: Alphabet }) => (
      <GridItem item={item} size={cardSize} onPress={playSound} />
    ),
    [cardSize, playSound]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎓 Learn Alphabets</Text>
        <Text style={styles.subtitle}>
          Tap each card to hear the name
        </Text>
      </View>

      <FlatList
        data={ALPHABETS}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={columnWrapperStyle}
        contentContainerStyle={contentContainerStyle}
        renderItem={renderItem}
        scrollEnabled={true}
        scrollsToTop={false}
        removeClippedSubviews={true}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        updateCellsBatchingPeriod={80}
        windowSize={5}
        scrollEventThrottle={400}
        scrollIndicatorInsets={{ right: 1 }}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.992}
        nestedScrollEnabled={false}
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
    backgroundColor: '#fff',
  },

  fallbackImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: 32,
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