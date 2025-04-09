
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.stylesavant08',
  appName: 'style-savant-08',
  webDir: 'dist',
  server: {
    url: 'https://06db660a-936a-4b08-8e27-8ad4affbc3e0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    captureInput: true
  }
};

export default config;
