// // File: app/components/BannerAdView.native.tsx
// import React from 'react';
// import { Platform, View, StyleSheet } from 'react-native';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';

// // Use your real AdMob banner ID here
// const BANNER_AD_UNIT_ID = 'ca-app-pub-3724300583179720/5752816639';

// // Optional: fallback for debug/testing
// const adUnitId = __DEV__ ? TestIds.BANNER : BANNER_AD_UNIT_ID;

// const BannerAdView = () => {
//   return (
//     <View style={styles.container}>
//       <BannerAd
//         unitId={adUnitId}
//         size={BannerAdSize.FULL_BANNER}
//         requestOptions={{
//           requestNonPersonalizedAdsOnly: true,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default BannerAdView;
