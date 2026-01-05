import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

/**
 * Expo FileSystem typings are broken in some SDKs.
 * Use runtime-safe access.
 */
const BASE_DIR =
  (FileSystem as any).documentDirectory ||
  (FileSystem as any).cacheDirectory ||
  '';

const CACHE_DIR = `${BASE_DIR}alphabet-sounds/`;

export const useAudioCache = (remoteUrl: string, id: number) => {
  const [cachedPath, setCachedPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadAudio = async () => {
    if (!remoteUrl || loading || cachedPath) return cachedPath;

    try {
      setLoading(true);

      const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(CACHE_DIR, {
          intermediates: true,
        });
      }

      const filePath = `${CACHE_DIR}sound-${id}.mp3`;

      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        setCachedPath(filePath);
        return filePath;
      }

      const result = await FileSystem.downloadAsync(remoteUrl, filePath);
      setCachedPath(result.uri);
      return result.uri;
    } catch (err: any) {
      setError(`Audio download failed: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    downloadAudio();
  }, [remoteUrl]);

  return { cachedPath, loading, error };
};
