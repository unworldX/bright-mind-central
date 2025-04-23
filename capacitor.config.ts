
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0bb7c516f3e94c77921f1218eb96d3ea',
  appName: 'Student Library',
  webDir: 'dist',
  server: {
    url: "https://0bb7c516-f3e9-4c77-921f-1218eb96d3ea.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  ios: {
    contentInset: "always",
    scheme: "app.lovable.studentlibrary",
    limitsNavigationsToAppBoundDomains: true
  }
};

export default config;
