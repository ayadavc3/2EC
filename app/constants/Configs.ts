/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export const Configs = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL as string,
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  oneSignalAppId: process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID as string,
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string,
  serviceUUID: process.env.EXPO_PUBLIC_SERVICE_UUID as string,
  characteristicUUID: process.env.EXPO_PUBLIC_CHARACTERISTIC_UUID as string,
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN as string,
};
