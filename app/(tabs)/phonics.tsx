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
import { PHONICS } from '../../data/phonics';


type Phonic = (typeof PHONICS)[number];

const SPACING = 16;

/* ---------- Responsive Helpers ---------- */

const getNumColumns = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};

/* ---------- Grid Item ---------- */

const PhonicItem = ({
  item,
  size,
  onPress,
}: {
  item: Phonic;
  size: number;
  onPress: (item: Phonic) => void;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState(false);

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
          <Text style={{ fontSize: 32 }}>📸</Text>
        )}

        <Text
          style={[styles.soundText, { fontSize: size * 0.25 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {item.soundText}
        </Text>

        <Text
          style={[styles.example, { fontSize: size * 0.1 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {item.example}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

/* ---------- Screen ---------- */

export default function PhonicsScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const numColumns = getNumColumns(width);
  const cardSize =
    (width - SPACING * (numColumns + 1)) / numColumns;

  const playSound = async (phonic: Phonic) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (phonic.sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          phonic.sound,
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
        <Text style={styles.title}>🔊 Learn Phonics</Text>
        <Text style={styles.subtitle}>
          Tap each card to hear the Phonics sound
        </Text>
      </View>

      <FlatList
        data={PHONICS}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
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
          <PhonicItem
            item={item}
            size={cardSize}
            onPress={playSound}
          />
        )}
        removeClippedSubviews={false}
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

    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' } as any)
      : {
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }),
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
