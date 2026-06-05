# Hunter Radar

Hunter Radar is an Expo React Native TypeScript MVP prototype for iPhone beta testing in Expo Go. It uses simulated-only hunter, group, map, status, and device data.

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
