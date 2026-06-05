import type { DeviceMetric } from "../types";

export const connectedDeviceName = "Hunter Radar ESP32 A2";

export const simulatedDeviceMetrics: DeviceMetric[] = [
  {
    id: "esp32",
    label: "ESP32",
    value: "Online",
    detail: "Firmware HR-MVP-0.1",
    tone: "ok"
  },
  {
    id: "bluetooth",
    label: "Bluetooth",
    value: "Simulated",
    detail: "No BLE radio calls in this MVP",
    tone: "warn"
  },
  {
    id: "lora",
    label: "LoRa",
    value: "Ready",
    detail: "915 MHz mesh placeholder",
    tone: "ok"
  },
  {
    id: "gps",
    label: "GPS Lock",
    value: "3D lock",
    detail: "12 satellites simulated",
    tone: "ok"
  },
  {
    id: "battery",
    label: "Battery",
    value: "82%",
    detail: "Estimated 9h 20m remaining",
    tone: "ok"
  }
];
