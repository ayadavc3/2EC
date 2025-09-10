import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";
import { useEffect } from "react";
import { nativeBuildVersion } from "expo-application";

// import { Sentry } from "@/services/sentry";
import { RemoteConfig } from "../services/firebase";

export function useConfigSync() {
  const { data } = useQuery({
    queryKey: ["update-maintenance"],
    queryFn: RemoteConfig.getConfigValue,
    throwOnError: (error, query) => {
    //   Sentry.captureException(error);
      return false;
    },
    enabled: !__DEV__,
    refetchInterval: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (!data) return;

    const version = data.version;
    const versionCode = parseInt(data.version_code.toString());
    const currentVersionCode = parseInt(nativeBuildVersion ?? "1");

    if (Platform.OS !== "android") {
      if (versionCode > currentVersionCode) {
        router.replace("/update");
      }
    } else {
      const remote = Number(version.split(".").join(""));
      const current = Number(version.split(".").join(""));

      if (remote > current) {
        router.replace("/update");
      }
    }

    if (data.maintenance_mode) {
      router.replace("/maintenance");
    }
  }, [data]);
}
