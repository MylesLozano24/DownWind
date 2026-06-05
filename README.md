# Downwind

Stay connected where service ends.

Downwind is an Expo React Native TypeScript MVP prototype for iPhone beta testing in Expo Go. It uses simulated-only hunter, group, map, status, and device data.

## What is included

- Bottom tab navigation for Map, Group, Status, Device, and Settings
- Simulated hunter and group location cards
- Status buttons for Sitting, Walking, Tracking, Leaving, Need Help, and SOS
- SOS confirmation modal
- Simulated device status for ESP32, LoRa, GPS lock, Bluetooth, and battery
- Local storage for user status and settings with AsyncStorage
- Clean TypeScript structure across `screens`, `components`, `data`, `types`, `storage`, and `navigation`

## Not included yet

This MVP intentionally does not include real Bluetooth, Supabase, Mapbox, LoRa, backend auth, GPS, or hardware integrations. The Device screen is a UI simulation only.

## Install

Use Node.js 22.13 or newer for Expo SDK 56.

```bash
npm install
```

If Expo asks to align package versions, run:

```bash
npx expo install --fix
```

## Run in Expo Go on iPhone

```bash
npm start
```

Then scan the QR code with the Expo Go app on your iPhone. If your phone cannot reach the development computer over LAN, start Expo with a tunnel:

```bash
npx expo start --tunnel
```

## TestFlight beta on iPhone

Expo Go is the fastest way to test this simulated MVP. For a real beta app install through TestFlight, you need a paid Apple Developer account and an Expo account.

The simplest guided path is:

```bash
npx testflight
```

That command walks through EAS project setup, iOS signing, building, and submitting to TestFlight. After Apple finishes processing the build, open App Store Connect, go to TestFlight, and add internal or external testers.

The manual EAS path is:

```bash
npm install -g eas-cli
eas login
eas build --platform ios
eas submit --platform ios
```

When real Bluetooth or other native hardware integrations are added later, use a development build or TestFlight build instead of Expo Go.

## Scripts

```bash
npm run typecheck
npm run ios
npm run android
npm run web
```

## Project structure

```text
src/
  components/
  context/
  data/
  navigation/
  screens/
  storage/
  theme/
  types/
```
