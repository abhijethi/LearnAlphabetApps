import React, { useRef, useState, useEffect } from 'react';
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
} from 'react-native';
import { Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ALPHABETS } from '@/data/alphabets';

type Alphabet = (typeof ALPHABETS)[number];

const SPACING = 16;

/* ---------- Responsive Helpers ---------- */

const getNumColumns = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

/* ---------- Grid Item ---------- */

const GridItem = ({
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

  // ✅ IMPORTANT: reset state when FlatList reuses the cell
  useEffect(() => {
    setImageError(false);
  }, [item.id]);

  const handlePress = () => {
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
  };

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
        {item.image && !imageError ? (
          <Image
            source={item.image}
            resizeMode="contain"
            onError={() => setImageError(true)}
            style={{
              width: size * 0.55,
              height: size * 0.55,
              flex: 1,
            }}
          />
        ) : (
          <View
            style={{
              width: size * 0.55,
              height: size * 0.55,
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
};

/* ---------- Screen ---------- */

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const numColumns = getNumColumns(width);
  const cardSize =
    (width - SPACING * (numColumns + 1)) / numColumns;

  const playSound = async (alphabet: Alphabet) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (alphabet.sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          alphabet.sound,
          { shouldPlay: true }
        );
        setSound(newSound);
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

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
        key={numColumns} // re-render only when layout changes
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()} // ✅ STABLE KEY
        columnWrapperStyle={
          numColumns > 1
            ? { justifyContent: 'space-between' }
            : undefined
        }
        contentContainerStyle={{
          padding: SPACING,
          paddingBottom: insets.bottom + 140,
        }}
        renderItem={({ item }) => (
          <GridItem
            item={item}
            size={cardSize}
            onPress={playSound}
          />
        )}
        removeClippedSubviews={false} // ✅ CRITICAL for Expo Go
        initialNumToRender={12}
        windowSize={5}
        showsVerticalScrollIndicator={false}
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

    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        } as any)
      : {
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }),
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
