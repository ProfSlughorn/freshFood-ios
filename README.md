# Here is the mobile app for fresh food

![alt text](image.png)

# how to run
```shell
npx expo start --clear
# Stop the current server (Ctrl+C)
# Clear metro bundler cache
#expo start -c

```

# Setup
To install libraries

```shell
npx expo install expo-notifications
expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npx expo install react-native-svg

```

# production release

```shell
npm install -g eas-cli
eas login
```

## iOS iPhone

Firstly add below in `eas.json`
```json
"build": {
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "production": {}
```
Then run below shell
```shell
eas login
eas build -p ios --profile preview
```

## Android

```shell
keytool -genkey -v -keystore my-release-key.keystore -alias fresh_food_auth_key -keyalg RSA -keysize 2048 -validity 10000
abcd1234

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 10,000 days
	for: CN=todd zhang, OU=ito5002-tp6-24, O=monash, L=Sydney, ST=NSW, C=AU
[Storing my-release-key.keystore]

apksigner sign --ks my-release-key.keystore --ks-key-alias fresh_food_auth_key /Users/todd.zhang/Downloads/freshFood.apk
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