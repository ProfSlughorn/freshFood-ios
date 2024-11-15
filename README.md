# Here is the mobile app for fresh food

![alt text](image.png)

# how to run
```shell
npx expo start --clear
# Stop the current server (Ctrl+C)
# Clear metro bundler cache
expo start -c

```

# Setup
To install libraries

```shell
npx expo install expo-notifications
expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npx expo install react-native-svg

```


# build
```
npx expo install expo-dev-client
npx expo prebuild -p ios
```

# clean and build project for iOS
```shell
# Remove existing iOS folder
rm -rf ios

# Generate new iOS files
npx expo prebuild -p ios

# Install pods
cd ios
pod install
cd ..
```