import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta la barra superior en todas las pantallas
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="proyectos" />
      <Stack.Screen name="personal" />
      <Stack.Screen name="personalProyecto" />
      <Stack.Screen name="personalDetalles" />
      <Stack.Screen name="proyectosPersonal" />
      <Stack.Screen name="proyectoDetalles" />
    </Stack>
  );
}
