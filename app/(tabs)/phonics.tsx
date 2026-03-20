import { PHONICS } from '@/data/phonics';
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

type Phonic = (typeof PHONICS)[number];

const SPACING = 16;

/* ---------- Responsive Helpers ---------- */

const getNumColumns = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

/* ---------- Grid Item ---------- */

const PhonicItem = memo(
  ({
    item,
    size,
    onPress,
  }: {
    item: Phonic;
    size: number;
    onPress: (item: Phonic) => void;
  }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      setImageError(false);
    }, [item.id]);

    // ❌ removed useMemo (not needed)
    const imageSize = size * 0.55;
    const soundFontSize = size * 0.25;
    const exampleFontSize = size * 0.1;

    // ✅ stable handler (no inline function)
    const handlePress = useCallback(() => {
      onPress(item);
    }, [onPress, item]);

    return (
      <Pressable onPress={handlePress}>
        {({ pressed }) => (
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
              <Text style={styles.fallbackText}>📸</Text>
            )}

            <Text
              style={[styles.soundText, { fontSize: soundFontSize }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.soundText}
            </Text>

            <Text
              style={[styles.example, { fontSize: exampleFontSize }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.example}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }
);

/* ---------- Screen ---------- */

export default function PhonicsScreen() {
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

  // ✅ FIXED AUDIO (removed remove())
  const playSound = useCallback(
    (phonic: Phonic) => {
      if (!phonic.sound) return;
      player.replace(phonic.sound);
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
    ({ item }: { item: Phonic }) => (
      <PhonicItem item={item} size={cardSize} onPress={playSound} />
    ),
    [cardSize, playSound]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔊 Learn Phonics</Text>
        <Text style={styles.subtitle}>
          Tap each card to hear the phonics sound
        </Text>
      </View>

      <FlatList
        data={PHONICS}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={
          numColumns > 1
            ? { justifyContent: 'space-between' as const }
            : undefined
        }
        contentContainerStyle={{
          padding: SPACING,
          paddingBottom: insets.bottom + 140,
        }}
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
    backgroundColor: '#6C5CE7',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 14,
    color: '#fff',
  },

  card: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SPACING / 2,
    backgroundColor: '#fff',
  },

  fallbackText: {
    fontSize: 32,
  },

  soundText: {
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
    textTransform: 'lowercase',
  },

  example: {
    color: '#fff',
    marginTop: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});