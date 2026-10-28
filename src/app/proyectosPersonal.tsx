import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Interfaz para el personal asignado al proyecto
interface PersonalHoras {
  id: string;
  nombre: string;
  horas: number;
}

// Datos de prueba (Mocks)
const PERSONAL_MOCK: PersonalHoras[] = [
  { id: "1", nombre: "Persona 1", horas: 10 },
  { id: "2", nombre: "Persona 2", horas: 10 },
  { id: "3", nombre: "Persona 3", horas: 5 },
];

export default function ProjectPersonalSummaryScreen() {
  const router = useRouter();

  const proyectoNombre = "Proyecto 1";
  const personalList = PERSONAL_MOCK;

  // Cálculo dinámico del total de horas
  const totalHoras = personalList.reduce((acc, item) => acc + item.horas, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header con Flecha de Regreso a /explore (Proyectos) y Logo */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/proyectos")}
        >
          <Ionicons name="arrow-back-outline" size={26} color="#000" />
        </Pressable>

        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 2. Sección del Título y Acción 'Ver Detalles' */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text style={styles.projectTitle}>{proyectoNombre}</Text>

          <Pressable onPress={() => router.push("/proyectoDetalles")}>
            <Text style={styles.detailsButtonText}>Ver Detalles</Text>
          </Pressable>
        </View>
        <View style={styles.divider} />
      </View>

      {/* 3. Tabla de Personal y Horas */}
      <View style={styles.tableContainer}>
        {/* Encabezado de la Tabla */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCellTextBold}>Personal</Text>
          <Text style={styles.headerCellTextBold}>Horas</Text>
        </View>
        <View style={styles.headerDivider} />

        {/* Listado de Personal */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {personalList.map((item) => (
            <View key={item.id} style={styles.rowContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.rowTextName}>{item.nombre}</Text>
                <Text style={styles.rowTextHours}>{item.horas} h</Text>
              </View>
              <View style={styles.rowDivider} />
            </View>
          ))}

          {/* Fila del Total */}
          <View style={styles.rowContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{totalHoras} h</Text>
            </View>
            <View style={styles.totalDivider} />
          </View>
        </ScrollView>
      </View>
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
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
    padding: 4,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 45,
  },
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  projectTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
  },
  detailsButtonText: {
    fontSize: 16,
    color: "#5A5A5A",
    fontWeight: "400",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#D2D2D2",
    marginTop: 10,
  },
  tableContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerCellTextBold: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000000",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#D2D2D2",
    marginBottom: 6,
  },
  rowContainer: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowTextName: {
    fontSize: 18,
    color: "#000000",
  },
  rowTextHours: {
    fontSize: 18,
    color: "#5A5A5A",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#E9EAEC",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  totalLabel: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000000",
  },
  totalValue: {
    fontSize: 18,
    color: "#5A5A5A",
  },
  totalDivider: {
    height: 1,
    backgroundColor: "#D2D2D2",
  },
});
