import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Navegación directa a la pantalla explore
    router.push("/proyectos");
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
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@itecor.com"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text>Password</Text>
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

      {/* Botón */}
      <View style={[styles.botones, styles.botonesFlexBox]}>
        <Pressable
          style={[styles.botonLogIn, styles.botonesFlexBox]}
          onPress={handleLogin}
        >
          <Text style={styles.logIn}>Log in</Text>
        </Pressable>
      </View>
    </View>
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
  logIn: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  Text: {
    fontFamily: "Inter",
  },
});
