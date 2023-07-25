import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Platform } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/infrastructure/theme";
import Navigator from "./src/infrastructure/navigation";
// import { ChatContextProvider } from "./src/services/chat/chat.context";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import store from "./src/store";
export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    // library "react-native-popup-menu";
    <MenuProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* <ChatContextProvider> */}
          <Navigator></Navigator>
          {/* </ChatContextProvider> */}
        </Provider>
      </ThemeProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
