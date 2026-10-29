import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../services/api";

interface Proyecto {
  Id_proyecto: number;
  nombre: string;
  codigo_acceso: string;
  horas_asignadas: number;
  horas_aumentadas: number;
  horas_registradas: string | number;
  estado: string;
}

export default function ProyectosScreen() {
  const router = useRouter();
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [busqueda, setBusqueda] = useState<string>("");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  // Cargar proyectos desde el backend
  const fetchProyectos = async () => {
    try {
      const response = await api.post("/proyectos", {});

      if (response.data && Array.isArray(response.data.proyectos)) {
        setProyectos(response.data.proyectos);
      } else {
        setProyectos([]);
      }
    } catch (error: any) {
      console.error("Error al obtener proyectos:", error);
      setProyectos([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filtro seguro verificando que proyectos sea un arreglo
  const proyectosFiltrados = (Array.isArray(proyectos) ? proyectos : []).filter(
    (p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.codigo_acceso?.toString().includes(busqueda),
  );

  useEffect(() => {
    fetchProyectos();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProyectos();
  };

  const handlePersonal = () => {
    setMenuVisible(false);
    router.push("/personal");
  };

  const handleProyectos = (proyectoId: number) => {
    router.push("/proyectosPersonal");
  };

  const handleCerrarSesion = async () => {
    setMenuVisible(false);
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/");
  };

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

      {/* 3. Lista de Proyectos o Indicador de Carga */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff4e00" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#ff4e00"]}
            />
          }
        >
          {proyectosFiltrados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron proyectos.</Text>
            </View>
          ) : (
            proyectosFiltrados.map((item) => {
              const horasTotales =
                item.horas_asignadas + (item.horas_aumentadas || 0);

              return (
                <Pressable
                  key={item.Id_proyecto}
                  style={styles.card}
                  onPress={() => handleProyectos(item.Id_proyecto)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            item.estado === "En proceso"
                              ? "#D1FADF"
                              : "#ffbbbb",
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardText}>
                      Horas: {item.horas_registradas}/{horasTotales}
                    </Text>
                    <Text style={styles.cardText}>
                      Código: {item.codigo_acceso}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      )}

      {/* 4. Modal del Menú Lateral */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
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

            <Pressable
              style={[styles.menuItem, styles.menuItemActive]}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="folder-open-outline" size={22} color="#ff4e00" />
              <Text style={[styles.menuItemText, styles.menuItemTextActive]}>
                Proyectos
              </Text>
            </Pressable>

            <Pressable style={styles.menuItem} onPress={handlePersonal}>
              <Ionicons name="people-outline" size={22} color="#333" />
              <Text style={styles.menuItemText}>Personal</Text>
            </Pressable>

            <View style={styles.divider} />

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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888888",
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
    padding: 20,
    paddingBottom: 30,
    gap: 40,
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
  statusBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
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
