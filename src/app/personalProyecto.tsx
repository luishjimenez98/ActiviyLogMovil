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

// Interfaz para los proyectos asignados a la persona
interface ProyectoPersona {
  id: string;
  nombre: string;
  horasAsignadas: number;
}

// Datos de prueba (Mocks)
const PROYECTOS_PERSONA_MOCK: ProyectoPersona[] = [
  { id: "1", nombre: "Proyecto 1", horasAsignadas: 10 },
  { id: "2", nombre: "Proyecto 2", horasAsignadas: 0 },
  { id: "3", nombre: "Proyecto 3", horasAsignadas: 0 },
];

export default function PersonDetailScreen() {
  const router = useRouter();

  const nombrePersona = "Persona 1";
  const proyectos = PROYECTOS_PERSONA_MOCK;
  const handlePersonalD = () => {
    router.push("/personalDetalles");
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header con Flecha de Regreso a /personal y Logo */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/personal")}
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

      {/* 2. Sección del Título y Resumen */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text style={styles.personName}>{nombrePersona}</Text>
          <Text style={styles.projectCount}>{proyectos.length} proyectos</Text>
        </View>
        <View style={styles.divider} />
      </View>

      {/* 3. Lista de Proyectos de la Persona */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {proyectos.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={handlePersonalD}
          >
            <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.hoursText}>Horas: {item.horasAsignadas}</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  personName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
  },
  projectCount: {
    fontSize: 18,
    color: "#5A5A5A",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#D2D2D2",
    marginTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  hoursText: {
    fontSize: 16,
    color: "#5A5A5A",
    fontWeight: "400",
  },
});
