/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#154E98";
const tintColorDark = "#fff";

export const Colors = {
  primary: "#154E98",
  secondary: "#007AFF",
  // Team specific colors
  teamRed: "#B71C1C",
  teamGreen: "#16C47F",

  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    grey1: "#5F6674",
    grey2: "#99A2A8",
    grey3: "#E2E7E9",
    greySoft: "#F5F6F7",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
