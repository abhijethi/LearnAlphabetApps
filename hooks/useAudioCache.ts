import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

const CACHE_DIR = `${FileSystem.cacheDirectory}alphabet-sounds/`;

export const useAudioCache = (remoteUrl: string) => {
  const [cachedPath, setCachedPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadAudio = async () => {
    try {
      if (!remoteUrl) return null;

      setLoading(true);

      // Create cache directory
      const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
      }

      // Generate filename from URL
      const filename = `sound-${remoteUrl.split('/').pop()}.mp3`;
      const cachedFilePath = `${CACHE_DIR}${filename}`;

      // Check if already cached
      const fileInfo = await FileSystem.getInfoAsync(cachedFilePath);
      if (fileInfo.exists) {
        setCachedPath(cachedFilePath);
        setLoading(false);
        return cachedFilePath;
      }

      // Download and cache
      const downloadResumable = FileSystem.createDownloadResumable(
        remoteUrl,
        cachedFilePath
      );

      const result = await downloadResumable.downloadAsync();
      if (result?.uri) {
        setCachedPath(result.uri);
        setError(null);
        setLoading(false);
        return result.uri;
      }
    } catch (err: any) {
      const errorMsg = `Failed to download audio: ${err.message}`;
      setError(errorMsg);
      setLoading(false);
      console.warn(errorMsg);
      return null;
    }
  };

  return { cachedPath, loading, error, downloadAudio };
};
