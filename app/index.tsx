import React, { useEffect, useRef } from 'react';
import { Alert, BackHandler, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';



// TODO: Change to the actual URL
const uriSource = 'https://www.google.com';

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    // Request location permission on app launch
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (webViewRef.current) {
        // Check if we can go back
        webViewRef.current.injectJavaScript(`
          window.ReactNativeWebView.postMessage(window.history.length > 1);
        `);
      }
      return true;
    });
    return () => backHandler.remove();
  }, []);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);


      // Handle any web events that require native functionality
      // For example: native back button
      const canGoBack = event.nativeEvent.data === 'true';
      if (canGoBack) {
        webViewRef.current?.goBack();
      } else {
        Alert.alert(
          '앱 종료',
          '앱을 종료하시겠습니까?',
          [
            { text: '취소', onPress: () => null, style: 'cancel' },
            { text: '종료', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.error('Message handling error:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WebView
        ref={webViewRef}
        source={{ uri: uriSource }}
        onMessage={handleMessage}
        originWhitelist={['*']}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
