import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import "react-native-reanimated"

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#FCF7ED" />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
