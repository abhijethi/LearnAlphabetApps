import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FS = FileSystem as any;
const BASE_DIR: string = FS.documentDirectory ?? FS.cacheDirectory ?? FS.bundleDirectory ?? '';
const CACHE_DIR = `${BASE_DIR}alphabet-assets/`;
const FIRST_LAUNCH_KEY = 'has_cached_assets_v1';

export const ALPHABET_FILE_IDS: Record<number, { image: string; audio: string }> = {
  0: { image: '1BBtOOvHOBuQhDa830douR6L2frJi5pGy', audio: '1HGnSK7YvOWNLDeHBNtMXxFHBMh3Idh0F' },
  1: { image: '2ball_img_id', audio: '2ball_aud_id' },
  2: { image: '3cat_img_id', audio: '3cat_aud_id' },
  3: { image: '4dog_img_id', audio: '4dog_aud_id' },
  4: { image: '5elephant_img_id', audio: '5elephant_aud_id' },
  5: { image: '6fish_img_id', audio: '6fish_aud_id' },
  6: { image: '7grape_img_id', audio: '7grape_aud_id' },
  7: { image: '8house_img_id', audio: '8house_aud_id' },
  8: { image: '9icecream_img_id', audio: '9icecream_aud_id' },
  9: { image: '10jellyfish_img_id', audio: '10jellyfish_aud_id' },
  10: { image: '11kite_img_id', audio: '11kite_aud_id' },
  11: { image: '12lion_img_id', audio: '12lion_aud_id' },
  12: { image: '13monkey_img_id', audio: '13monkey_aud_id' },
  13: { image: '14nest_img_id', audio: '14nest_aud_id' },
  14: { image: '15orange_img_id', audio: '15orange_aud_id' },
  15: { image: '16penguin_img_id', audio: '16penguin_aud_id' },
  16: { image: '17queen_img_id', audio: '17queen_aud_id' },
  17: { image: '18rainbow_img_id', audio: '18rainbow_aud_id' },
  18: { image: '19sun_img_id', audio: '19sun_aud_id' },
  19: { image: '20tiger_img_id', audio: '20tiger_aud_id' },
  20: { image: '21umbrella_img_id', audio: '21umbrella_aud_id' },
  21: { image: '22violin_img_id', audio: '22violin_aud_id' },
  22: { image: '23whale_img_id', audio: '23whale_aud_id' },
  23: { image: '24xylophone_img_id', audio: '24xylophone_aud_id' },
  24: { image: '25yoyo_img_id', audio: '25yoyo_aud_id' },
  25: { image: '26zebra_img_id', audio: '26zebra_aud_id' },
};

export const getGoogleDriveUrl = (fileId: string) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

export const getCachedImagePath = (index: number) =>
  `${CACHE_DIR}image-${index + 1}.png`;

export const useAssetManager = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    const initializeAssets = async () => {
      try {
        const cached = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
        if (cached === 'true') {
          setAssetsReady(true);
          setIsLoading(false);
          return;
        }

        const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
        }

        const totalAssets = 26;
        let successCount = 0;

        for (let i = 0; i < totalAssets; i++) {
          const fileIds = ALPHABET_FILE_IDS[i];
          if (!fileIds) continue;

          try {
            const imageUrl = getGoogleDriveUrl(fileIds.image);
            const filePath = getCachedImagePath(i);
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            if (!fileInfo.exists) {
              await FileSystem.downloadAsync(imageUrl, filePath);
            }
            successCount++;
          } catch (err) {
            console.warn(`Image ${i + 1} failed`, err);
          }

          setProgress(Math.round((successCount / totalAssets) * 100));
        }

        if (successCount === totalAssets) {
          await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
        }

        setAssetsReady(true);
      } catch (err: any) {
        setError(`Asset initialization failed: ${err.message}`);
        setAssetsReady(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAssets();
  }, []);

  return { isLoading, progress, error, assetsReady };
};
