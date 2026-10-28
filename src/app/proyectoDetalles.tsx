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

// Interfaz para los registros detallados de horas
interface RegistroDetalle {
  id: string;
  persona: string;
  horas: number;
  fecha: string;
}

// Datos de prueba (Mocks)
const REGISTROS_DETALLE_MOCK: RegistroDetalle[] = [
  { id: "1", persona: "Persona 1", horas: 5, fecha: "21/10/2026" },
  { id: "2", persona: "Persona 2", horas: 5, fecha: "21/10/2026" },
  { id: "3", persona: "Persona 3", horas: 5, fecha: "21/10/2026" },
  { id: "4", persona: "Persona 1", horas: 5, fecha: "20/10/2026" },
  { id: "5", persona: "Persona 2", horas: 5, fecha: "20/10/2026" },
];

export default function ProjectDetailsScreen() {
  const router = useRouter();

  const proyectoNombre = "Proyecto 1";
  const horasRegistradas = "25/75 horas";

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header con Flecha de Regreso a /project-personal-summary y Logo */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/proyectosPersonal")}
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

      {/* 2. Sección del Título del Proyecto y Progresión de Horas */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text style={styles.projectTitle}>{proyectoNombre}</Text>
          <Text style={styles.hoursSubtitle}>{horasRegistradas}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* 3. Tabla de Registros Detallados */}
      <View style={styles.tableContainer}>
        {/* Encabezados de Columna con Ícono de Filtro/Ordenamiento */}
        <View style={styles.tableHeader}>
          {/* Columna Personal */}
          <Pressable style={styles.filterColumnButton} onPress={() => {}}>
            <Text style={styles.headerCellText}>Personal</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#000" />
          </Pressable>

          {/* Columna Horas */}
          <Pressable style={styles.filterColumnButton} onPress={() => {}}>
            <Text style={styles.headerCellText}>Horas</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#000" />
          </Pressable>

          {/* Columna Fecha */}
          <Pressable style={styles.filterColumnButton} onPress={() => {}}>
            <Text style={styles.headerCellText}>Fecha</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#000" />
          </Pressable>
        </View>

        <View style={styles.headerDivider} />

        {/* Filas de Registros */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {REGISTROS_DETALLE_MOCK.map((item) => (
            <View key={item.id} style={styles.rowContainer}>
              <View style={styles.tableRow}>
                <Text style={[styles.rowCellText, styles.personCell]}>
                  {item.persona}
                </Text>
                <Text style={[styles.rowCellText, styles.hoursCell]}>
                  {item.horas} h
                </Text>
                <Text style={[styles.rowCellText, styles.dateCell]}>
                  {item.fecha}
                </Text>
              </View>
              <View style={styles.rowDivider} />
            </View>
          ))}
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
  hoursSubtitle: {
    fontSize: 18,
    color: "#5A5A5A",
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
  filterColumnButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerCellText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000000",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#D2D2D2",
    marginBottom: 4,
  },
  rowContainer: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowCellText: {
    fontSize: 18,
    color: "#000000",
  },
  personCell: {
    flex: 1,
    textAlign: "left",
  },
  hoursCell: {
    width: 70,
    textAlign: "center",
  },
  dateCell: {
    width: 110,
    textAlign: "right",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#E9EAEC",
  },
});
