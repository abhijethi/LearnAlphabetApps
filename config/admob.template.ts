// config/admob.ts
// Template for AdMob integration
// Copy this to actual file when ready to integrate ads

const AD_UNIT_IDS = {
  // Test Unit IDs (use these during development)
  TEST_BANNER: {
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  },
  
  // Production Unit IDs (replace with your actual IDs)
  // Get these from https://admob.google.com
  PRODUCTION_BANNER: {
    ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyyyy',
    android: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyyyyyy',
  },
};

export default AD_UNIT_IDS;

// Usage in app/(tabs)/index.tsx:
/*
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import AD_UNIT_IDS from '@/config/admob';

// In your component JSX:
<View style={styles.adPlaceholder}>
  <BannerAd
    unitId={
      Platform.OS === 'ios' 
        ? AD_UNIT_IDS.TEST_BANNER.ios
        : AD_UNIT_IDS.TEST_BANNER.android
    }
    size={BannerAdSize.BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}
  />
</View>

// Installation:
// npm install react-native-google-mobile-ads

// App.json configuration:
{
  "plugins": [
    [
      "react-native-google-mobile-ads",
      {
        "isMobileAdsManagerStartRequired": true,
        "androidAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz",
        "iOSAppId": "ca-app-pub-xxxxxxxxxxxxxxxx~zzzzzzzzzz"
      }
    ]
  ]
}
*/
