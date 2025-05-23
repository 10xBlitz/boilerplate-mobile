# WebView Wrapper Boilerplate

This is a simple boilerplate for a WebView wrapper using React Native and Expo. It allows you to easily integrate a WebView into your React Native app.

## ✨ Features

- 🔥 Minimal setup with best practices for scalable React Native apps
- 🌐 WebView integration for displaying web content
- 🚀 Customizable message handling for WebView events
- 🧪 Ready for testing and rapid prototyping

## 🚀 Getting Started

1. Clone the project 
   ```bash
   https://github.com/10xBlitz/boilerplate-mobile.git
   ```
2. Open boilerplate-mobile
   ```bash
   cd boilerplate-mobile
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the app
   ```bash
   npm run android
   ```

## 📱 Building an APK

To build an APK using React Native CLI instead of Expo, follow these steps:

1. Navigate to the `android` directory
   ```bash
   cd android
   ```

2. Build the APK
   ```bash
   ./gradlew assembleRelease
   ```

5. The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`

## 📁 Project Structure

```
├── app/
│   ├── index.tsx
│   └── _layout.tsx
├── public/
├── .env
├── package.json
├── tsconfig.json
├── README.md
```

### _layout.tsx

The `_layout.tsx` file is used to define the layout structure of your app. It can be used to set up navigation, themes, or any other global configurations that should be applied across multiple screens.

## 🛠️ Usage Examples

- Open the app in a development build, Android emulator, iOS simulator, or Expo Go.
- The WebView is set up to load a specified URI. You can modify the `uriSource` variable in the `Index` component to point to your desired web content.

  ```tsx
  // app/index.tsx

  //// TODO: Change to the actual URL
  const uriSource = 'https://www.google.com';
  ```

- The `handleMessage` function can be customized to handle messages from the WebView.

  ```tsx
  // app/index.tsx
  
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
  ```

## 🔧 Troubleshooting

If you encounter issues with Expo, ensure that you have installed the Expo CLI globally:

```bash
npm install -g expo-cli
```

If you still face problems, try clearing the cache:

```bash
expo r -c
```

## 📚 Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
