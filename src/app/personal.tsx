import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../services/api";

interface Personal {
  Id_personal: number;
  Nombre: string;
  Apellido_paterno: string;
  Total_proyectos: number | string;
}

export default function PersonalScreen() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [persona, setPersonal] = useState<Personal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPersonal = async () => {
    try {
      const response = await api.get("/personal");

      if (response.data && Array.isArray(response.data.personal)) {
        setPersonal(response.data.personal);
      } else {
        setPersonal([]);
      }
    } catch (error: any) {
      console.error("Error al obtener proyectos:", error);
      setPersonal([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const personalFiltrados = (Array.isArray(persona) ? persona : []).filter(
    (p) =>
      p.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.Apellido_paterno.toLowerCase().includes(busqueda.toLowerCase()),
  );
  useEffect(() => {
    fetchPersonal();
  }, []);

  const handleProyectos = () => {
    router.push("/proyectos");
  };
  const handlePersonal = (personal_id: number) => {
    router.push("/personalProyecto");
  };

  const handleCerrarSesion = async () => {
    setMenuVisible(false);
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/");
  };
  function NombreCompleto(nombre: string, apellido: string) {
    return `${nombre} ${apellido}`;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header con Menú y Logo */}
      <View style={styles.header}>
        <Pressable
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu-outline" size={28} color="#000" />
        </Pressable>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 2. Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor="#ABABAB"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        <Ionicons
          name="search-outline"
          size={20}
          color="#ABABAB"
          style={styles.searchIcon}
        />
      </View>

      {/* 3. Lista de Personal */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {personalFiltrados.map((item) => (
          <Pressable
            key={item.Id_personal}
            style={styles.card}
            onPress={() => handlePersonal(item.Id_personal)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                {NombreCompleto(item.Nombre, item.Apellido_paterno)}
              </Text>
              <View />
              <Text style={styles.cardText}>
                {item.Total_proyectos} proyectos
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* 4. Modal del Menú Lateral */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Cierra el menú al tocar fuera */}
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setMenuVisible(false)}
          />

          <View style={styles.menuDrawer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menú</Text>
              <Pressable onPress={() => setMenuVisible(false)}>
                <Ionicons name="close-outline" size={26} color="#000" />
              </Pressable>
            </View>

            {/* Opción 1: Proyectos */}
            <Pressable style={styles.menuItem} onPress={handleProyectos}>
              <Ionicons name="folder-open-outline" size={22} color="#333" />
              <Text style={styles.menuItemText}>Proyectos</Text>
            </Pressable>

            {/* Opción 2: Personal */}
            <Pressable
              style={[styles.menuItem, styles.menuItemActive]}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="people-outline" size={22} color="#ff4e00" />
              <Text style={[styles.menuItemText, styles.menuItemTextActive]}>
                Personal
              </Text>
            </Pressable>

            <View style={styles.divider} />

            {/* Opción 3: Cerrar sesión */}
            <Pressable style={styles.menuItem} onPress={handleCerrarSesion}>
              <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
              <Text style={[styles.menuItemText, { color: "#FF3B30" }]}>
                Cerrar sesión
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 45,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F8FA",
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
  },
  searchIcon: {
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    padding: 16,
    gap: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
  },
  cardText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#807f7f",
  },
  /* Estilos del Menú Modal */
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menuDrawer: {
    width: "75%",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: "#FFF2EC",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  menuItemTextActive: {
    color: "#ff4e00",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
});
