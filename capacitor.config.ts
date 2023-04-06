import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'card-delivery-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
  server: {
    cleartext: true,
    allowNavigation: ['https://localhost:8080/'],
  },
};

export default config;
