// Import Library

import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated
} from 'react-native';


// ==================================================
// DATA PROFILE
// ==================================================

const PROFILE = {
  name: 'Moh.Farid Ilham Ghifari',
  title: 'Mahasiswa Informatika Semester 5',
  email: 'faridilham0302@gmail.com',
  phone: '083156623352',
  location: 'Subang, Jawa Barat',
  bio: 'Mahasiswa Informatika UINSSC',
  avatar: '',
  avatarOffline: './assets/foto gw.jpeg'
};


// ==================================================
// DATA SKILLS
// ==================================================

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },

  // 3 SKILL BARU SESUAI TUGAS
  { id: '7', name: 'HTML & CSS', level: 85, color: '#E44D26' },
  { id: '8', name: 'PHP', level: 70, color: '#777BB4' },
  { id: '9', name: 'MySQL', level: 75, color: '#00758F' },
];


// ==================================================
// DATA PENGALAMAN & PENDIDIKAN
// ==================================================

const SECTIONS = [
  {
    title: '💼 Pengalaman / Organisasi',
    data: [
      {
        id: 'e1',
        role: 'Head of Creative Economy',
        company: 'HIMAFOR UIN Siber Syekh Nurjati Cirebon',
        period: '2026 – Sekarang',
        desc: 'Bertanggung jawab dalam perencanaan kegiatan ekonomi kreatif, penjualan produk, serta mencari peluang kerja sama dan sponsor untuk kegiatan organisasi.'
      },
      {
        id: 'e2',
        role: 'Mahasiswa Informatika',
        company: 'Proyek Perkuliahan',
        period: '2024 – Sekarang',
        desc: 'Mengerjakan berbagai proyek perkuliahan seperti pengembangan aplikasi mobile, website, basis data, dan proyek teknologi informasi lainnya.'
      },
    ],
  },

  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'UIN Siber Syekh Nurjati Cirebon',
        period: '2024 – Sekarang',
        desc: 'Mempelajari pemrograman, basis data, pengembangan aplikasi, jaringan komputer, serta berbagai teknologi informasi.'
      },
      {
        id: 'd2',
        role: 'Pendidikan Menengah',
        company: 'Sekolah Menengah',
        period: 'Sebelum 2024',
        desc: 'Menyelesaikan pendidikan menengah sebelum melanjutkan pendidikan ke Program Studi Informatika.'
      },
    ],
  },
];


// ==================================================
// DATA SOSIAL MEDIA
// ==================================================

const SOCIAL = [
  { id: 's1', label: 'GitHub', icon: '🧑‍💻', url: 'https://github.com/Rith32-ig' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'linkedin.com/in/fulan' },
  { id: 's3', label: 'Portfolio', icon: '🌐', url: 'fulan.dev' },
];


// ==================================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList untuk render tiap skill
// Props: item -> { name, level, color }
// ==================================================

const SkillCard = ({ item }) => (
  // View -> container kartu
  <View style={styles.skillCard}>

    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>

      {/* Text -> nama skill */}
      <Text style={styles.skillName}>
        {item.name}
      </Text>

      <Text style={styles.skillPercent}>
        {item.level}%
      </Text>

    </View>


    {/* Progress bar */}
    <View style={styles.progressBg}>

      <View
        style={[
          styles.progressFill,
          {
            width: `${item.level}%`,
            backgroundColor: item.color
          }
        ]}
      />

    </View>

  </View>
);


// ==================================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
// Props: item -> { role, company, period }, onPress
// ==================================================

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >

    {/* Titik timeline */}
    <View style={styles.timelineDot} />


    {/* Konten teks */}
    <View style={styles.timelineContent}>

      <Text style={styles.timelineRole}>
        {item.role}
      </Text>

      <Text style={styles.timelineCompany}>
        {item.company}
      </Text>

      <Text style={styles.timelinePeriod}>
        {item.period}
      </Text>

      <Text style={styles.timelineHint}>
        Ketuk untuk detail →
      </Text>

    </View>

  </TouchableOpacity>
);


// ==================================================
// APP
// ==================================================

export default function App() {

  // ==================================================
  // STATE
  // ==================================================

  // Switch: apakah user Open to Work?
  const [openToWork, setOpenToWork] = useState(true);


  // Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  // TextInput
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');


  // ActivityIndicator
  const [sending, setSending] = useState(false);


  // Pressable
  const [pressing, setPressing] = useState(false);


  // ==================================================
  // STATE TAB NAVIGASI
  // ==================================================

  const [activeTab, setActiveTab] = useState('Info');


  // ==================================================
  // ANIMATED API
  // ==================================================

  const avatarScale = useRef(
    new Animated.Value(0.7)
  ).current;


  // Animasi avatar saat aplikasi dibuka
  useEffect(() => {

    Animated.spring(
      avatarScale,
      {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true
      }
    ).start();

  }, []);


  // ==================================================
  // HANDLER FUNCTIONS
  // ==================================================

  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {

    setSelectedItem(item);

    setModalVisible(true);

  };


  // Dipanggil saat tombol Kirim Pesan ditekan
  const handleSend = () => {

    // Validasi input
    if (!senderName.trim() || !message.trim()) {

      Alert.alert(
        '⚠️ Peringatan',
        'Nama dan pesan tidak boleh kosong!'
      );

      return;
    }


    setSending(true);


    // Simulasi delay 2 detik
    setTimeout(() => {

      const namaPengirim = senderName;

      setSending(false);

      setSenderName('');

      setMessage('');


      Alert.alert(
        '✅ Berhasil',
        `Pesan dari ${namaPengirim} telah terkirim!`
      );

    }, 2000);
  };


  // ==================================================
  // RETURN
  // ==================================================

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#2563EB"
      />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >


        {/* ==================================================
            HEADER PROFILE
        ================================================== */}

        <View style={styles.header}>


          {/* ==================================================
              ANIMASI AVATAR
          ================================================== */}

          <Animated.View
            style={[
              styles.photoContainer,
              {
                transform: [
                  {
                    scale: avatarScale
                  }
                ]
              }
            ]}
          >

            <Image
              source={require('./assets/foto gw.jpeg')}
              style={styles.photo}
            />

          </Animated.View>


          <Text style={styles.name}>
            {PROFILE.name}
          </Text>


          <Text style={styles.title}>
            {PROFILE.title}
          </Text>


          <Text style={styles.university}>
            UIN Siber Syekh Nurjati Cirebon
          </Text>


          <Text style={styles.bio}>
            {PROFILE.bio}
          </Text>


          {/* ==================================================
              OPEN TO WORK
          ================================================== */}

          <View style={styles.workContainer}>

            <Text style={styles.workText}>

              {openToWork
                ? '🟢 Open to Work'
                : '⚪ Tidak tersedia'}

            </Text>


            <Switch
              value={openToWork}
              onValueChange={setOpenToWork}
            />

          </View>

        </View>


        {/* ==================================================
            TAB NAVIGASI
        ================================================== */}

        <View style={styles.tabContainer}>


          {/* TAB INFO */}

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Info' &&
              styles.activeTab
            ]}
            onPress={() => setActiveTab('Info')}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Info' &&
                styles.activeTabText
              ]}
            >
              Info
            </Text>

          </TouchableOpacity>


          {/* TAB SKILLS */}

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Skills' &&
              styles.activeTab
            ]}
            onPress={() => setActiveTab('Skills')}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Skills' &&
                styles.activeTabText
              ]}
            >
              Skills
            </Text>

          </TouchableOpacity>


          {/* TAB KONTAK */}

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Kontak' &&
              styles.activeTab
            ]}
            onPress={() => setActiveTab('Kontak')}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Kontak' &&
                styles.activeTabText
              ]}
            >
              Kontak
            </Text>

          </TouchableOpacity>

        </View>


        {/* ==================================================
            TAB INFO
        ================================================== */}

        {activeTab === 'Info' && (

          <View>

            {/* INFORMASI PRIBADI */}

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                📌 Informasi Pribadi
              </Text>


              <Text style={styles.info}>
                👤 {PROFILE.name}
              </Text>


              <Text style={styles.info}>
                🎓 {PROFILE.title}
              </Text>


              <Text style={styles.info}>
                📧 {PROFILE.email}
              </Text>


              <Text style={styles.info}>
                📱 {PROFILE.phone}
              </Text>


              <Text style={styles.info}>
                📍 {PROFILE.location}
              </Text>

            </View>


            {/* PENDIDIKAN & PENGALAMAN */}

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                📚 Pendidikan & Pengalaman
              </Text>


              <SectionList

                sections={SECTIONS}

                keyExtractor={(item) => item.id}

                renderSectionHeader={({ section }) => (

                  <Text style={styles.subTitle}>
                    {section.title}
                  </Text>

                )}

                renderItem={({ item }) => (

                  <TimelineCard
                    item={item}
                    onPress={handleCardPress}
                  />

                )}

                scrollEnabled={false}

              />

            </View>

          </View>

        )}


        {/* ==================================================
            TAB SKILLS
        ================================================== */}

        {activeTab === 'Skills' && (

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              🛠️ Skills
            </Text>


            <Text style={styles.skillDescription}>
              Beberapa kemampuan yang sedang dipelajari
              dan dikembangkan.
            </Text>


            <FlatList

              data={SKILLS}

              keyExtractor={(item) => item.id}

              renderItem={({ item }) => (
                <SkillCard item={item} />
              )}

              scrollEnabled={false}

            />

          </View>

        )}


        {/* ==================================================
            TAB KONTAK
        ================================================== */}

        {activeTab === 'Kontak' && (

          <KeyboardAvoidingView

            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : 'height'
            }

          >

            {/* ==================================================
                SOSIAL MEDIA
            ================================================== */}

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                🌐 Sosial Media
              </Text>


              {SOCIAL.map((item) => (

                <View
                  key={item.id}
                  style={styles.socialItem}
                >

                  <Text style={styles.socialIcon}>
                    {item.icon}
                  </Text>


                  <View>

                    <Text style={styles.socialLabel}>
                      {item.label}
                    </Text>


                    <Text style={styles.socialUrl}>
                      {item.url}
                    </Text>

                  </View>

                </View>

              ))}

            </View>


            {/* ==================================================
                FORM KONTAK
            ================================================== */}

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                ✉️ Hubungi Saya
              </Text>


              <TextInput
                style={styles.input}
                placeholder="Nama Anda"
                value={senderName}
                onChangeText={setSenderName}
              />


              <TextInput
                style={[
                  styles.input,
                  styles.messageInput
                ]}
                placeholder="Tulis pesan..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
              />


              {/* PRESSABLE */}

              <Pressable

                onPress={handleSend}

                onPressIn={() =>
                  setPressing(true)
                }

                onPressOut={() =>
                  setPressing(false)
                }

                style={[
                  styles.button,
                  pressing &&
                  styles.buttonPressed
                ]}

              >

                {sending ? (

                  <ActivityIndicator
                    color="#FFFFFF"
                  />

                ) : (

                  <Text style={styles.buttonText}>
                    📩 Kirim Pesan
                  </Text>

                )}

              </Pressable>

            </View>

          </KeyboardAvoidingView>

        )}


        {/* ==================================================
            FOOTER
        ================================================== */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>
            © 2026 {PROFILE.name}
          </Text>


          <Text style={styles.footerSubText}>
            CV Mobile App • React Native
          </Text>

        </View>


      </ScrollView>


      {/* ==================================================
          MODAL DETAIL
      ================================================== */}

      <Modal

        visible={modalVisible}

        transparent={true}

        animationType="slide"

        onRequestClose={() =>
          setModalVisible(false)
        }

      >

        <View style={styles.modalBackground}>


          <View style={styles.modalBox}>


            {selectedItem && (

              <>

                <Text style={styles.modalTitle}>
                  {selectedItem.role}
                </Text>


                <Text style={styles.modalCompany}>
                  {selectedItem.company}
                </Text>


                <Text style={styles.modalPeriod}>
                  {selectedItem.period}
                </Text>


                <View style={styles.modalLine} />


                <Text style={styles.modalDesc}>
                  {selectedItem.desc}
                </Text>


                <Button

                  title="Tutup"

                  onPress={() =>
                    setModalVisible(false)
                  }

                />

              </>

            )}

          </View>

        </View>

      </Modal>


    </View>
  );
}


// ==================================================
// STYLE
// ==================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F1F5F9'
  },


  // ==================================================
  // HEADER
  // ==================================================

  header: {
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },


  photoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#FFFFFF',
    padding: 4,
    marginBottom: 15
  },


  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 55
  },


  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center'
  },


  title: {
    fontSize: 16,
    color: '#DBEAFE',
    marginTop: 5,
    textAlign: 'center'
  },


  university: {
    fontSize: 14,
    color: '#BFDBFE',
    marginTop: 5,
    textAlign: 'center'
  },


  bio: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20
  },


  // ==================================================
  // OPEN TO WORK
  // ==================================================

  workContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderRadius: 20
  },


  workText: {
    color: '#1E293B',
    marginRight: 5
  },


  // ==================================================
  // TAB
  // ==================================================

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    padding: 4,
    elevation: 2
  },


  tabButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 9
  },


  activeTab: {
    backgroundColor: '#2563EB'
  },


  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B'
  },


  activeTabText: {
    color: '#FFFFFF'
  },


  // ==================================================
  // CARD
  // ==================================================

  card: {
    backgroundColor: '#FFFFFF',
    margin: 12,
    padding: 16,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4
  },


  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15
  },


  info: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 11
  },


  // ==================================================
  // SKILL
  // ==================================================

  skillDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginBottom: 15
  },


  skillCard: {
    marginBottom: 15
  },


  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },


  skillName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155'
  },


  skillPercent: {
    fontSize: 13,
    color: '#64748B'
  },


  progressBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden'
  },


  progressFill: {
    height: '100%',
    borderRadius: 10
  },


  // ==================================================
  // TIMELINE
  // ==================================================

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
    marginTop: 5
  },


  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10
  },


  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginTop: 5,
    marginRight: 10
  },


  timelineContent: {
    flex: 1
  },


  timelineRole: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B'
  },


  timelineCompany: {
    fontSize: 13,
    color: '#475569',
    marginTop: 3
  },


  timelinePeriod: {
    fontSize: 12,
    color: '#2563EB',
    marginTop: 3
  },


  timelineHint: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 5
  },


  // ==================================================
  // SOCIAL MEDIA
  // ==================================================

  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10
  },


  socialIcon: {
    fontSize: 25,
    marginRight: 12
  },


  socialLabel: {
    fontWeight: 'bold',
    color: '#1E293B'
  },


  socialUrl: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3
  },


  // ==================================================
  // FORM INPUT
  // ==================================================

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF'
  },


  messageInput: {
    height: 100,
    textAlignVertical: 'top'
  },


  // ==================================================
  // BUTTON
  // ==================================================

  button: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },


  buttonPressed: {
    backgroundColor: '#1D4ED8'
  },


  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },


  // ==================================================
  // FOOTER
  // ==================================================

  footer: {
    alignItems: 'center',
    paddingVertical: 20
  },


  footerText: {
    color: '#64748B',
    fontSize: 12
  },


  footerSubText: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4
  },


  // ==================================================
  // MODAL
  // ==================================================

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },


  modalBox: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },


  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B'
  },


  modalCompany: {
    fontSize: 14,
    color: '#475569',
    marginTop: 5
  },


  modalPeriod: {
    fontSize: 13,
    color: '#2563EB',
    marginTop: 5
  },


  modalLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 15
  },


  modalDesc: {
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
    marginBottom: 15
  }

});