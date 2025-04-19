import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'VilaVerdeIonic',
  webDir: 'www',
  plugins: {
    StatusBar: {
      backgroundColor: '#2e7d32',
      style: 'light',
      overlaysWebView: false
    },
    SplashScreen: {
      launchAutoHide: true,
      showSpinner: false
    }
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
