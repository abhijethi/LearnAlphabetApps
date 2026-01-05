// Optimized data structure for better performance
// Images are cached on first launch, audio loads on demand from Google Drive
import { ALPHABET_FILE_IDS, getGoogleDriveUrl, getCachedImagePath } from '@/hooks/useAssetManager';

export const ALPHABETS = [
  { id: 1, letter: 'A', name: 'Apple', getImage: () => ({ uri: getCachedImagePath(0) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[0].audio), color: '#FF6B6B' },
  { id: 2, letter: 'B', name: 'Ball', getImage: () => ({ uri: getCachedImagePath(1) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[1].audio), color: '#FFE66D' },
  { id: 3, letter: 'C', name: 'Cat', getImage: () => ({ uri: getCachedImagePath(2) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[2].audio), color: '#FF9F43' },
  { id: 4, letter: 'D', name: 'Dog', getImage: () => ({ uri: getCachedImagePath(3) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[3].audio), color: '#A65628' },
  { id: 5, letter: 'E', name: 'Elephant', getImage: () => ({ uri: getCachedImagePath(4) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[4].audio), color: '#95A5A6' },
  { id: 6, letter: 'F', name: 'Fish', getImage: () => ({ uri: getCachedImagePath(5) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[5].audio), color: '#FF6348' },
  { id: 7, letter: 'G', name: 'Grape', getImage: () => ({ uri: getCachedImagePath(6) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[6].audio), color: '#9B59B6' },
  { id: 8, letter: 'H', name: 'House', getImage: () => ({ uri: getCachedImagePath(7) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[7].audio), color: '#C0392B' },
  { id: 9, letter: 'I', name: 'Ice Cream', getImage: () => ({ uri: getCachedImagePath(8) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[8].audio), color: '#F39C12' },
  { id: 10, letter: 'J', name: 'Jellyfish', getImage: () => ({ uri: getCachedImagePath(9) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[9].audio), color: '#E74C3C' },
  { id: 11, letter: 'K', name: 'Kite', getImage: () => ({ uri: getCachedImagePath(10) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[10].audio), color: '#3498DB' },
  { id: 12, letter: 'L', name: 'Lion', getImage: () => ({ uri: getCachedImagePath(11) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[11].audio), color: '#F4A460' },
  { id: 13, letter: 'M', name: 'Monkey', getImage: () => ({ uri: getCachedImagePath(12) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[12].audio), color: '#D4A574' },
  { id: 14, letter: 'N', name: 'Nest', getImage: () => ({ uri: getCachedImagePath(13) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[13].audio), color: '#8B7355' },
  { id: 15, letter: 'O', name: 'Orange', getImage: () => ({ uri: getCachedImagePath(14) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[14].audio), color: '#FF8C42' },
  { id: 16, letter: 'P', name: 'Penguin', getImage: () => ({ uri: getCachedImagePath(15) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[15].audio), color: '#2C3E50' },
  { id: 17, letter: 'Q', name: 'Queen', getImage: () => ({ uri: getCachedImagePath(16) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[16].audio), color: '#D35400' },
  { id: 18, letter: 'R', name: 'Rainbow', getImage: () => ({ uri: getCachedImagePath(17) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[17].audio), color: '#9B59B6' },
  { id: 19, letter: 'S', name: 'Sun', getImage: () => ({ uri: getCachedImagePath(18) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[18].audio), color: '#FFD700' },
  { id: 20, letter: 'T', name: 'Tiger', getImage: () => ({ uri: getCachedImagePath(19) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[19].audio), color: '#FF6B35' },
  { id: 21, letter: 'U', name: 'Umbrella', getImage: () => ({ uri: getCachedImagePath(20) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[20].audio), color: '#E74C3C' },
  { id: 22, letter: 'V', name: 'Violin', getImage: () => ({ uri: getCachedImagePath(21) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[21].audio), color: '#8B4513' },
  { id: 23, letter: 'W', name: 'Whale', getImage: () => ({ uri: getCachedImagePath(22) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[22].audio), color: '#1E90FF' },
  { id: 24, letter: 'X', name: 'Xylophone', getImage: () => ({ uri: getCachedImagePath(23) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[23].audio), color: '#FF69B4' },
  { id: 25, letter: 'Y', name: 'Yo-yo', getImage: () => ({ uri: getCachedImagePath(24) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[24].audio), color: '#FFB347' },
  { id: 26, letter: 'Z', name: 'Zebra', getImage: () => ({ uri: getCachedImagePath(25) }), soundUrl: getGoogleDriveUrl(ALPHABET_FILE_IDS[25].audio), color: '#000000' },
];
  