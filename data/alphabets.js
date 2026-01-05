// alphabet-learning/data/alphabets.js
import { getGoogleDriveUrl, getCachedImagePath } from '@/hooks/useAssetManager';

// Google Drive file IDs for images and audio
export const ALPHABET_FILE_IDS = {
  0: { image: '1BBtOOvHOBuQhDa830douR6L2frJi5pGy', audio: '1apple_aud_id' },
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

// Colors for the alphabet cards
const COLORS = [
  '#FF6666','#FFB266','#FFFF66','#66FF66','#66FFFF','#6666FF',
  '#FF66FF','#FF9966','#99FF66','#66FF99','#66FFFF','#6699FF',
  '#9966FF','#FF66CC','#FF6666','#FFB266','#FFFF66','#66FF66',
  '#66FFFF','#6666FF','#FF66FF','#FF9966','#99FF66','#66FF99',
  '#66FFFF','#6699FF'
];

// Array of alphabet objects
export const ALPHABETS = [
  { id:0, letter:'A', name:'Apple', color:COLORS[0], imageUrl:getCachedImagePath(0), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[0].audio) },
  { id:1, letter:'B', name:'Ball', color:COLORS[1], imageUrl:getCachedImagePath(1), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[1].audio) },
  { id:2, letter:'C', name:'Cat', color:COLORS[2], imageUrl:getCachedImagePath(2), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[2].audio) },
  { id:3, letter:'D', name:'Dog', color:COLORS[3], imageUrl:getCachedImagePath(3), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[3].audio) },
  { id:4, letter:'E', name:'Elephant', color:COLORS[4], imageUrl:getCachedImagePath(4), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[4].audio) },
  { id:5, letter:'F', name:'Fish', color:COLORS[5], imageUrl:getCachedImagePath(5), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[5].audio) },
  { id:6, letter:'G', name:'Grape', color:COLORS[6], imageUrl:getCachedImagePath(6), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[6].audio) },
  { id:7, letter:'H', name:'House', color:COLORS[7], imageUrl:getCachedImagePath(7), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[7].audio) },
  { id:8, letter:'I', name:'Ice Cream', color:COLORS[8], imageUrl:getCachedImagePath(8), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[8].audio) },
  { id:9, letter:'J', name:'Jellyfish', color:COLORS[9], imageUrl:getCachedImagePath(9), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[9].audio) },
  { id:10, letter:'K', name:'Kite', color:COLORS[10], imageUrl:getCachedImagePath(10), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[10].audio) },
  { id:11, letter:'L', name:'Lion', color:COLORS[11], imageUrl:getCachedImagePath(11), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[11].audio) },
  { id:12, letter:'M', name:'Monkey', color:COLORS[12], imageUrl:getCachedImagePath(12), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[12].audio) },
  { id:13, letter:'N', name:'Nest', color:COLORS[13], imageUrl:getCachedImagePath(13), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[13].audio) },
  { id:14, letter:'O', name:'Orange', color:COLORS[14], imageUrl:getCachedImagePath(14), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[14].audio) },
  { id:15, letter:'P', name:'Penguin', color:COLORS[15], imageUrl:getCachedImagePath(15), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[15].audio) },
  { id:16, letter:'Q', name:'Queen', color:COLORS[16], imageUrl:getCachedImagePath(16), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[16].audio) },
  { id:17, letter:'R', name:'Rainbow', color:COLORS[17], imageUrl:getCachedImagePath(17), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[17].audio) },
  { id:18, letter:'S', name:'Sun', color:COLORS[18], imageUrl:getCachedImagePath(18), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[18].audio) },
  { id:19, letter:'T', name:'Tiger', color:COLORS[19], imageUrl:getCachedImagePath(19), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[19].audio) },
  { id:20, letter:'U', name:'Umbrella', color:COLORS[20], imageUrl:getCachedImagePath(20), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[20].audio) },
  { id:21, letter:'V', name:'Violin', color:COLORS[21], imageUrl:getCachedImagePath(21), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[21].audio) },
  { id:22, letter:'W', name:'Whale', color:COLORS[22], imageUrl:getCachedImagePath(22), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[22].audio) },
  { id:23, letter:'X', name:'Xylophone', color:COLORS[23], imageUrl:getCachedImagePath(23), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[23].audio) },
  { id:24, letter:'Y', name:'Yoyo', color:COLORS[24], imageUrl:getCachedImagePath(24), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[24].audio) },
  { id:25, letter:'Z', name:'Zebra', color:COLORS[25], imageUrl:getCachedImagePath(25), soundUrl:getGoogleDriveUrl(ALPHABET_FILE_IDS[25].audio) },
];
