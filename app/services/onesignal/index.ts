import { OneSignal } from "react-native-onesignal";

import { Configs } from "../../constants";

export class FcmService {
  static initialize() {
    OneSignal.initialize(Configs.oneSignalAppId);
    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener("click", (event) => {
      console.log("OneSignal: notification clicked:", event);
    });
  }

  static login(userId: string) {
    OneSignal.login(userId);
  }

  static logOut() {
    OneSignal.logout();
  }
}
