import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  ActivityIndicator, // 1. Importado aquí
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "../services/api";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        Email: email.trim(),
        Contrasena: password,
      });

      if (response.data) {
        const { token } = response.data;
        await SecureStore.setItemAsync("userToken", token);
        router.replace("/proyectos"); // 2. Ruta estándar de tu dashboard
      }
    } catch (error: any) {
      const mensajeError =
        error.response?.data?.error ||
        "Ocurrió un error al conectar con el servidor.";
      Alert.alert("Error de Inicio de Sesión", mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.detalles, styles.botonesFlexBox]}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logoIcon}
        resizeMode="contain"
      />

      {/* Formulario de Login */}
      <View style={styles.formularioContainer}>
        <Text style={styles.Text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@itecor.com"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.Text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Botón de Login */}
      <View style={[styles.botones, styles.botonesFlexBox]}>
        <Pressable
          style={[
            styles.botonLogIn,
            styles.botonesFlexBox,
            loading && styles.botonDeshabilitado,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.logIn}>Log in</Text>
          )}
        </Pressable>
      </View>
    </View> // 3. Cierre del View principal que faltaba
  );
}

const styles = StyleSheet.create({
  botonesFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  detalles: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    gap: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  logoIcon: {
    width: 258,
    height: 79,
  },
  formularioContainer: {
    width: "100%",
    gap: 12,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  botones: {
    width: 160,
    height: 50,
    marginTop: 10,
  },
  botonLogIn: {
    flex: 1,
    borderRadius: 57,
    backgroundColor: "#ff4e00",
    flexDirection: "row",
    maxWidth: "100%",
    width: "100%",
  },
  botonDeshabilitado: {
    opacity: 0.65,
  },
  logIn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  Text: {
    fontSize: 14,
    color: "#333333",
  },
});
