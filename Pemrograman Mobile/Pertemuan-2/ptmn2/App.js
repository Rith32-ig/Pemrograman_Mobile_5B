import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama: Moh. Farid Ilham Ghifari</Text>
      <Text>Nim: 2488010066</Text>
      <Text>Asal Sekolah: SMAN 1 Cisalak</Text>
      <Text>Cita-cita: Web Developer</Text>
      <Text>Rencana Menggapai Cita-cita: Memperdalam HTML, CSS, JavaScript, dan framework seperti React, kemudian membuat berbagai proyek untuk membangun portofolio.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
