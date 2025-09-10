import {
  getAll,
  setDefaults,
  getRemoteConfig,
  fetchAndActivate,
  setConfigSettings,
} from "@react-native-firebase/remote-config";

// import { Sentry } from "@/services/sentry";

const remoteConfig = getRemoteConfig();

type IConfigs = {
  version: string;
  version_code: number;
  maintenance_mode: boolean;
};

const defaultConfigs: IConfigs = {
  version: "1.0.0",
  version_code: 0,
  maintenance_mode: false,
};

class RemoteConfig {
  static async initialize() {
    try {
      const minimumFetchIntervalMillis = __DEV__ ? 0 : 1800000;
      await setConfigSettings(remoteConfig, {
        minimumFetchIntervalMillis,
      });

      await setDefaults(remoteConfig, defaultConfigs);

      await fetchAndActivate(remoteConfig);
    } catch (error) {
    //   Sentry.captureException(error);
    }
  }

  static getConfigValue() {
    const configs: IConfigs = { ...defaultConfigs };

    const results = getAll(remoteConfig);
    configs.version = results.version.asString();
    configs.version_code = results.version_code.asNumber();
    configs.maintenance_mode = results.maintenance_mode.asBoolean();

    return configs;
  }
}

export { RemoteConfig };
