// ==================================================
// IMPORT LIBRARY
// ==================================================

import React, { useState, useEffect, useRef } from 'react';

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
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

// ==================================================
// DATA PROFILE
// POIN 1 - Ganti data profil dengan data pribadi
// ==================================================

const PROFILE = {
  name: 'Moh.Farid Ilham Ghifari',
  title: 'Mahasiswa Informatika Semester 5',
  email: 'faridilham0302@gmail.com',
  phone: '083156623352',
  location: 'Subang, Jawa Barat',
  bio: 'Mahasiswa Informatika UINSSC yang tertarik pada teknologi, aplikasi mobile, dan pengembangan sistem.',
  avatar: '',
  avatarOffline: require('./assets/foto gw.jpeg'),
};

// ==================================================
// DATA SKILLS
// POIN 2 - Minimal 3 skill baru dengan warna berbeda
// ==================================================

const SKILLS = [
  // Skill dari kode asli
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },

  // 3 skill tambahan untuk tugas
  { id: '7', name: 'Python', level: 75, color: '#3776AB' },
  { id: '8', name: 'C++', level: 70, color: '#00599C' },
  { id: '9', name: 'UI/UX Design', level: 78, color: '#FF61F6' },
];

// ==================================================
// DATA PENGALAMAN & PENDIDIKAN
// POIN 3 - Tambah pengalaman organisasi dan pendidikan
// ==================================================

const SECTIONS = [
  {
    title: '💼 Pengalaman / Organisasi',
    data: [
      {
        id: 'e1',
        role: 'Kepala Departemen Creative Economy',
        company: 'HIMAFOR - Himpunan Mahasiswa Informatika',
        period: '2026 – Sekarang',
        desc: 'Bertanggung jawab dalam perencanaan kegiatan ekonomi kreatif, penjualan produk, serta mencari peluang kerja sama dan sponsor untuk kegiatan organisasi.',
      },
      {
        id: 'e2',
        role: 'Anggota Himpunan Mahasiswa Informatika',
        company: 'HIMAFOR',
        period: '2025 – Sekarang',
        desc: 'Berpartisipasi dalam kegiatan dan program kerja organisasi serta membantu pelaksanaan berbagai kegiatan mahasiswa Informatika.',
      },
    ],
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 – Sekarang',
        desc: 'Mahasiswa Program Studi Informatika yang mempelajari pemrograman, pengembangan aplikasi, basis data, jaringan, dan teknologi informasi.',
      },
      {
        id: 'd2',
        role: 'Sekolah Menengah Atas',
        company: 'Pendidikan Menengah',
        period: 'Sebelum 2024',
        desc: 'Menyelesaikan pendidikan menengah sebelum melanjutkan pendidikan ke Program Studi Informatika.',
      },
    ],
  },
];

// ==================================================
// DATA SOSIAL MEDIA
// ==================================================

const SOCIAL = [
  {
    id: 's1',
    label: 'GitHub',
    icon: '🧑‍💻',
    url: 'github.com/fulan',
  },
  {
    id: 's2',
    label: 'LinkedIn',
    icon: '💼',
    url: 'linkedin.com/in/fulan',
  },
  {
    id: 's3',
    label: 'Portfolio',
    icon: '🌐',
    url: 'fulan.dev',
  },
];

// ==================================================
// SUB-COMPONENT: SkillCard
// Dipakai oleh FlatList
// ==================================================

const SkillCard = ({ item }) => (
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
            backgroundColor: item.color,
          },
        ]}
      />
    </View>
  </View>
);

// ==================================================
// SUB-COMPONENT: TimelineCard
// Dipakai oleh SectionList
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
  // STATE DARI KODE ASLI
  // ==================================================

  // 11. Switch -> apakah Open to Work
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 7. TextInput
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // 13. ActivityIndicator
  const [sending, setSending] = useState(false);

  // 10. Pressable
  const [pressing, setPressing] = useState(false);

  // ==================================================
  // TAMBAHAN TUGAS PENGEMBANGAN
  // ==================================================

  // POIN 5 - Tab navigasi sederhana
  const [activeTab, setActiveTab] = useState('Info');

  // POIN 6 - Animated API
  const avatarScale = useRef(new Animated.Value(1)).current;

  // ==================================================
  // POIN 6 - ANIMASI FOTO PROFILE
  // ==================================================

  useEffect(() => {

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(avatarScale, {
          toValue: 1.08,
          duration: 800,
          useNativeDriver: true,
        }),

        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };

  }, [avatarScale]);

  // ==================================================
  // HANDLER MODAL
  // ==================================================

  const handleCardPress = (item) => {

    setSelectedItem(item);

    setModalVisible(true);

  };

  // ==================================================
  // HANDLER KIRIM PESAN
  // ==================================================

  const handleSend = () => {

    // Validasi input
    if (!senderName.trim() || !message.trim()) {

      Alert.alert(
        '⚠️ Peringatan',
        'Nama dan pesan tidak boleh kosong!'
      );

      return;
    }

    // Tampilkan loading
    setSending(true);

    // Simulasi proses kirim
    setTimeout(() => {

      setSending(false);

      const currentName = senderName;

      setSenderName('');
      setMessage('');

      Alert.alert(
        '✅ Berhasil',
        `Pesan dari ${currentName} telah terkirim!`
      );

    }, 2000);

  };

  // ==================================================
  // RENDER
  // ==================================================

  return (

    // ==================================================
    // POIN 4 - KeyboardAvoidingView
    // Form tidak tertutup keyboard
    // ==================================================

    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* ==================================================
          POIN 15 - SafeAreaView
          Area aman dari notch dan home bar
      ================================================== */}

      <SafeAreaView style={styles.safeArea}>

        {/* ==================================================
            POIN 14 - StatusBar
        ================================================== */}

        <StatusBar
          backgroundColor="#1a1a2e"
          barStyle="light-content"
        />

        {/* ==================================================
            HEADER BAR
        ================================================== */}

        <View style={styles.headerBar}>

          <Text style={styles.headerTitle}>
            📄 Curriculum Vitae
          </Text>

          {/* Toggle Open to Work */}

          <View style={styles.switchRow}>

            <Text style={styles.switchLabel}>
              {openToWork ? '🟢 Open' : '🔴 Busy'}
            </Text>

            {/* 11. Switch */}

            <Switch
              value={openToWork}
              onValueChange={setOpenToWork}
              trackColor={{
                false: '#555',
                true: '#4ade80',
              }}
              thumbColor={
                openToWork ? '#fff' : '#aaa'
              }
            />

          </View>

        </View>

        {/* ==================================================
            POIN 5 - TAB NAVIGASI
            Info / Skills / Kontak
            Menggunakan TouchableOpacity
        ================================================== */}

        <View style={styles.tabContainer}>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Info' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('Info')}
            activeOpacity={0.8}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Info' && styles.tabTextActive,
              ]}
            >
              👤 Info
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Skills' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('Skills')}
            activeOpacity={0.8}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Skills' && styles.tabTextActive,
              ]}
            >
              🛠️ Skills
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Kontak' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('Kontak')}
            activeOpacity={0.8}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === 'Kontak' && styles.tabTextActive,
              ]}
            >
              ✉️ Kontak
            </Text>

          </TouchableOpacity>

        </View>

        {/* ==================================================
            SCROLLVIEW
        ================================================== */}

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ==================================================
              TAB INFO
          ================================================== */}

          {activeTab === 'Info' && (

            <>

              {/* ==================================================
                  SECTION PROFILE
              ================================================== */}

              <View style={styles.profileSection}>

                {/* ==================================================
                    3. Image
                    POIN 6 - Animated API
                ================================================== */}

                <Animated.View
                  style={[
                    styles.avatarContainer,
                    {
                      transform: [
                        {
                          scale: avatarScale,
                        },
                      ],
                    },
                  ]}
                >

                  <Image
                    source={PROFILE.avatar
                      ? { uri: PROFILE.avatar }
                      : PROFILE.avatarOffline
                    }
                    style={styles.avatar}
                    resizeMode="cover"
                  />

                </Animated.View>


                {/* Conditional rendering Open to Work */}

                {openToWork && (

                  <View style={styles.badge}>

                    <Text style={styles.badgeText}>
                      ✅ Open to Work
                    </Text>

                  </View>

                )}


                {/* 2. Text */}

                <Text style={styles.profileName}>
                  {PROFILE.name}
                </Text>

                <Text style={styles.profileTitle}>
                  {PROFILE.title}
                </Text>

                <Text style={styles.profileBio}>
                  {PROFILE.bio}
                </Text>


                {/* Info kontak horizontal */}

                <View style={styles.contactRow}>

                  <Text style={styles.contactItem}>
                    📧 {PROFILE.email}
                  </Text>

                  <Text style={styles.contactItem}>
                    📍 {PROFILE.location}
                  </Text>

                </View>

                <Text style={styles.contactItem}>
                  📱 {PROFILE.phone}
                </Text>


                {/* ==================================================
                    SOCIAL MEDIA
                    9. TouchableOpacity
                ================================================== */}

                <View style={styles.socialRow}>

                  {SOCIAL.map((s) => (

                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() =>
                        Alert.alert(
                          '🔗 Link',
                          s.url
                        )
                      }
                      activeOpacity={0.8}
                    >

                      <Text style={styles.socialIcon}>
                        {s.icon}
                      </Text>

                      <Text style={styles.socialLabel}>
                        {s.label}
                      </Text>

                    </TouchableOpacity>

                  ))}

                </View>


                {/* ==================================================
                    10. Pressable
                    Tombol Download CV
                ================================================== */}

                <Pressable
                  style={({ pressed }) => [
                    styles.downloadBtn,
                    pressed &&
                      styles.downloadBtnPressed,
                  ]}
                  onPressIn={() => setPressing(true)}
                  onPressOut={() => setPressing(false)}
                  onPress={() =>
                    Alert.alert(
                      '⬇️ Download',
                      'CV sedang diunduh...'
                    )
                  }
                >

                  <Text style={styles.downloadBtnText}>

                    {pressing
                      ? '⏳ Mengunduh...'
                      : '⬇️ Download CV (PDF)'}

                  </Text>

                </Pressable>

              </View>


              {/* ==================================================
                  RIWAYAT
                  SectionList
              ================================================== */}

              <View style={styles.sectionBox}>

                <Text style={styles.sectionTitle}>
                  📋 Riwayat
                </Text>

                <Text style={styles.sectionSubtitle}>
                  ↳ SectionList: data dikelompokkan per kategori.
                  Ketuk kartu untuk Modal detail.
                </Text>


                {/* 6. SectionList */}

                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}

                  renderItem={({ item }) => (

                    <TimelineCard
                      item={item}
                      onPress={handleCardPress}
                    />

                  )}

                  renderSectionHeader={({
                    section: { title },
                  }) => (

                    <View style={styles.sectionHeader}>

                      <Text style={styles.sectionHeaderText}>
                        {title}
                      </Text>

                    </View>

                  )}

                  scrollEnabled={false}

                  ItemSeparatorComponent={() => (
                    <View
                      style={{ height: 10 }}
                    />
                  )}

                  SectionSeparatorComponent={() => (
                    <View
                      style={{ height: 16 }}
                    />
                  )}

                />

              </View>

            </>

          )}


          {/* ==================================================
              TAB SKILLS
          ================================================== */}

          {activeTab === 'Skills' && (

            <View style={styles.sectionBox}>

              <Text style={styles.sectionTitle}>
                🛠️ Keahlian
              </Text>

              <Text style={styles.sectionSubtitle}>
                ↳ FlatList: menampilkan list data secara efisien
              </Text>


              {/* 5. FlatList */}

              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (
                  <SkillCard item={item} />
                )}

                scrollEnabled={false}

                ItemSeparatorComponent={() => (
                  <View style={{ height: 8 }} />
                )}

              />

            </View>

          )}


          {/* ==================================================
              TAB KONTAK
              POIN 4 - KeyboardAvoidingView
          ================================================== */}

          {activeTab === 'Kontak' && (

            <View style={styles.sectionBox}>

              <Text style={styles.sectionTitle}>
                ✉️ Hubungi Saya
              </Text>

              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>


              {/* ==================================================
                  7. TextInput - Nama
              ================================================== */}

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />


              {/* ==================================================
                  7. TextInput - Pesan
              ================================================== */}

              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                ]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />


              {/* ==================================================
                  Kondisi loading / tombol kirim
              ================================================== */}

              {sending ? (

                <View style={styles.loadingRow}>

                  {/* 13. ActivityIndicator */}

                  <ActivityIndicator
                    size="large"
                    color="#7c3aed"
                  />

                  <Text style={styles.loadingText}>
                    Mengirim pesan...
                  </Text>

                </View>

              ) : (

                /* 8. Button */

                <Button
                  title="✉️ Kirim Pesan"
                  color="#7c3aed"
                  onPress={handleSend}
                />

              )}

            </View>

          )}


          {/* Jarak bawah */}

          <View style={{ height: 40 }} />

        </ScrollView>


        {/* ==================================================
            MODAL DETAIL
        ================================================== */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() =>
            setModalVisible(false)
          }
        >
          {/* Overlay */}
          <View style={styles.modalOverlay}>
            {/* Kotak dialog */}
            <View style={styles.modalBox}>
              {/* Render hanya jika ada item */}
              {selectedItem && (
                <>
                  <Text style={styles.modalTitle}>
                    {selectedItem.role}
                  </Text>
                  <Text style={styles.modalCompany}>
                    {selectedItem.company}
                  </Text>
                  <Text style={styles.modalPeriod}>
                    🗓️ {selectedItem.period}
                  </Text>
                  <View
                    style={styles.modalDivider}
                  />
                  <Text style={styles.modalDesc}>
                    {selectedItem.desc}
                  </Text>
                </>
              )}
              {/* Tombol tutup modal */}
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() =>
                  setModalVisible(false)
                }
              >

                <Text
                  style={styles.modalCloseBtnText}
                >
                  ✕ Tutup
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </Modal>

      </SafeAreaView>

    </KeyboardAvoidingView>

  );
}


// ==================================================
// STYLE SHEET
// ==================================================

const styles = StyleSheet.create({

  // ==================================================
  // CONTAINER
  // ==================================================

  keyboardContainer: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },


  // ==================================================
  // HEADER
  // ==================================================

  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchLabel: {
    color: '#ffffff',
    fontSize: 13,
    marginRight: 5,
  },


  // ==================================================
  // TAB
  // ==================================================

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#334155',
  },

  tabButtonActive: {
    backgroundColor: '#7c3aed',
  },

  tabText: {
    color: '#cbd5e1',
    fontWeight: '600',
    fontSize: 13,
  },

  tabTextActive: {
    color: '#ffffff',
  },


  // ==================================================
  // PROFILE
  // ==================================================

  profileSection: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginTop: 18,
    alignItems: 'center',
  },

  avatarContainer: {
    width: 125,
    height: 125,
    borderRadius: 65,
    padding: 4,
    backgroundColor: '#7c3aed',
    marginBottom: 10,
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },

  badge: {
    backgroundColor: '#166534',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },

  badgeText: {
    color: '#dcfce7',
    fontSize: 12,
    fontWeight: 'bold',
  },

  profileName: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },

  profileTitle: {
    color: '#a78bfa',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },

  profileBio: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 10,
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
  },

  contactItem: {
    color: '#cbd5e1',
    fontSize: 12,
    marginHorizontal: 6,
    marginVertical: 3,
  },


  // ==================================================
  // SOCIAL MEDIA
  // ==================================================

  socialRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 8,
  },

  socialBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },

  socialIcon: {
    fontSize: 18,
  },

  socialLabel: {
    color: '#ffffff',
    fontSize: 11,
    marginTop: 2,
  },


  // ==================================================
  // DOWNLOAD BUTTON
  // ==================================================

  downloadBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 16,
  },

  downloadBtnPressed: {
    opacity: 0.6,
    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  downloadBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },


  // ==================================================
  // SECTION
  // ==================================================

  sectionBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },

  sectionHeader: {
    backgroundColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 4,
  },

  sectionHeaderText: {
    color: '#c4b5fd',
    fontSize: 14,
    fontWeight: 'bold',
  },


  // ==================================================
  // SKILL CARD
  // ==================================================

  skillCard: {
    backgroundColor: '#0f172a',
    padding: 13,
    borderRadius: 10,
  },

  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  skillName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  skillPercent: {
    color: '#94a3b8',
    fontSize: 12,
  },

  progressBg: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },


  // ==================================================
  // TIMELINE
  // ==================================================

  timelineCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: '#7c3aed',
    marginTop: 5,
    marginRight: 12,
  },

  timelineContent: {
    flex: 1,
  },

  timelineRole: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  timelineCompany: {
    color: '#a78bfa',
    fontSize: 13,
    marginTop: 4,
  },

  timelinePeriod: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },

  timelineHint: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 8,
  },


  // ==================================================
  // TEXT INPUT
  // ==================================================

  textInput: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 12,
    fontSize: 14,
  },

  textArea: {
    minHeight: 110,
    paddingTop: 12,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  loadingText: {
    color: '#cbd5e1',
    marginLeft: 10,
    fontSize: 14,
  },


  // ==================================================
  // MODAL
  // ==================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 22,
    minHeight: 280,
  },

  modalTitle: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: 'bold',
  },

  modalCompany: {
    color: '#a78bfa',
    fontSize: 15,
    marginTop: 6,
  },

  modalPeriod: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 8,
  },

  modalDivider: {
    height: 1,
    backgroundColor: '#475569',
    marginVertical: 15,
  },

  modalDesc: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
  },

  modalCloseBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
  },

  modalCloseBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

});
```
