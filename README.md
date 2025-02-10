# Device Fingerprint

A TypeScript library for generating unique device fingerprints in web browsers.

Modern browser fingerprinting library for visitor identification. Generates unique device IDs using canvas, WebGL, audio and hardware signals. Zero dependencies, TypeScript-first, cross-browser compatible.

## Features

- Written in TypeScript with full type support
- Zero dependencies
- Works in all modern browsers
- Lightweight and performant
- Privacy-focused device fingerprinting

## Installation

`npm install device-fingerprint-ts`

#### or

`yarn add device-fingerprint-ts`

## Usage

```javascript
import { generateFingerprint } from "device-fingerprint";

// Generate a device fingerprint
const fingerprint = await generateFingerprint();
console.log(fingerprint); // Returns a unique identifier for the device
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

Created and maintained by [victor](https://github.com/Vicopem01)
