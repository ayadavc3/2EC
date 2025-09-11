import {
    getAnalytics,
    logEvent,
    setAnalyticsCollectionEnabled,
    setUserId,
    setUserProperties as setUserPropertiesFirebase,
    setUserProperty,
} from "@react-native-firebase/analytics";

const analytics = getAnalytics();

type AuthMethods = "email" | "google" | "phone" | "facebook";

class Analytics {
  static async initialize() {
    await setAnalyticsCollectionEnabled(analytics, true);
  }

  static async setUserProperties(user: any) {
    const name = user.user_metadata.display_name || "Unnamed";
    const phone = user.phone || "no phone";
    const email = user.email || "no email";

    await setUserId(analytics, user.id);
    await setUserPropertiesFirebase(analytics, {
      name,
      phone,
      email,
    });
  }

  static async logAppOpen() {
    await logEvent(analytics, "app_open" as any);
  }

  // Track screen views
  static async logScreenView(screenName: string, screenClass: string) {
    await logEvent(analytics, "screen_view" as any, {
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  }

  // Track custom events
  static async logCustomEvent(eventName: string, parameters = {}) {
    await logEvent(analytics, eventName as any, parameters);
  }

  // Track user properties
  static async setUserProperty(name: string, value: string) {
    await setUserProperty(analytics, name, value);
  }

  // Set user ID
  static async setUserId(userId: string) {
    await setUserId(analytics, userId);
  }

  // Login event
  static async logLogin(method: AuthMethods) {
    await logEvent(analytics, "login", {
      method,
    });
  }

  // Sign up event
  static async logSignUp(method: AuthMethods) {
    await logEvent(analytics, "sign_up", {
      method,
    });
  }
}

export { Analytics };
