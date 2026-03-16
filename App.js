import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, Alert, ScrollView, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// --- DEV SORU BANKASI ---
const QUESTION_BANK = {
  easy: [
    { q: "HTML'de link oluşturmak için hangi etiket kullanılır?", a: "<a>", options: ["<a>", "<link>", "<href>"] },
    { q: "CSS'de arka plan rengi hangi özellik ile değiştirilir?", a: "background-color", options: ["color", "background-color", "bg"] },
    { q: "JavaScript'te sabit bir değişken tanımlamak için hangisi kullanılır?", a: "const", options: ["var", "let", "const"] },
    { q: "Hangi HTML etiketi en büyük başlığı temsil eder?", a: "<h1>", options: ["<h6>", "<h1>", "<head>"] },
    { q: "JavaScript'te bir uyarı kutusu çıkarmak için ne kullanılır?", a: "alert()", options: ["console.log()", "alert()", "msg()"] },
    { q: "Hangi sembol CSS'de ID seçicisi olarak kullanılır?", a: "#", options: [".", "#", "*"] },
    { q: "HTML dosyasının kök etiketi hangisidir?", a: "<html>", options: ["<body>", "<head>", "<html>"] },
    { q: "JS'de '5' == 5 ifadesinin sonucu nedir?", a: "true", options: ["true", "false", "undefined"] },
    { q: "Resim eklemek için kullanılan HTML etiketi hangisidir?", a: "<img>", options: ["<src>", "<img>", "<pic>"] },
    { q: "Hangisi geçerli bir JavaScript veri tipidir?", a: "Boolean", options: ["Float", "Boolean", "Double"] }
  ],
  hard: [
    { q: "React'te bileşen yüklendiğinde (mount) çalışan hook hangisidir?", a: "useEffect", options: ["useState", "useEffect", "useMemo"] },
    { q: "Hangisi bir 'State Management' kütüphanesi değildir?", a: "Axios", options: ["Redux", "Zustand", "Axios"] },
    { q: "React Native'de görünümü sarmalayan temel bileşen hangisidir?", a: "<View>", options: ["<div>", "<View>", "<Container>"] },
    { q: "JavaScript'te 'asynchronous' işlemleri yönetmek için hangisi kullanılır?", a: "Promise", options: ["Function", "Promise", "Object"] },
    { q: "HTTP 404 hatasının anlamı nedir?", a: "Not Found", options: ["Server Error", "Not Found", "Forbidden"] },
    { q: "Hangi algoritma 'First-In-First-Out' (FIFO) prensibiyle çalışır?", a: "Queue", options: ["Stack", "Queue", "Heap"] },
    { q: "SQL'de bir tablodan veri çekmek için hangi komut kullanılır?", a: "SELECT", options: ["GET", "EXTRACT", "SELECT"] },
    { q: "Docker ne için kullanılır?", a: "Konteynerizasyon", options: ["Veritabanı", "Konteynerizasyon", "CSS Framework"] },
    { q: "API'lerde 'Stateless' yapı neyi ifade eder?", a: "Durum bilgisizliği", options: ["Yavaş çalışma", "Durum bilgisizliği", "Veri şifreleme"] },
    { q: "React'te 'Virtual DOM'un temel amacı nedir?", a: "Performans optimizasyonu", options: ["Görsel tasarım", "Performans optimizasyonu", "Veri depolama"] }
  ]
};

export default function App() {
  const [money, setMoney] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [employees, setEmployees] = useState(0);
  const [parts, setParts] = useState({ kasa: false, monitor: false, klavye: false, mouse: false, kulaklik: false });
  const [quizVisible, setQuizVisible] = useState(false);
  const [currentQ, setCurrentQ] = useState(null);
  const [currentDiff, setCurrentDiff] = useState('');

  // Pasif Gelir Motoru
  useEffect(() => {
    const ticker = setInterval(() => {
      if (employees > 0) setMoney(prev => prev + (employees * 5));
    }, 1000);
    return () => clearInterval(ticker);
  }, [employees]);

  // Seviye Atlama
  useEffect(() => {
    if (xp >= 100 * level) {
      setLevel(prev => prev + 1);
      setXp(0);
      Alert.alert("LEVEL UP! 🚀", `Tebrikler, Seviye ${level + 1} oldun!`);
    }
  }, [xp]);

  const isPcComplete = Object.values(parts).every(p => p === true);
  const progressPercent = (xp / (100 * level)) * 100;

  const buyPart = (name, price) => {
    if (money >= price && !parts[name]) {
      setMoney(prev => prev - price);
      setParts(prev => ({ ...prev, [name]: true }));
    } else if (parts[name]) Alert.alert("Zaten Sahipsin!");
    else Alert.alert("Para Yetersiz!");
  };

  const handleAnswer = (ans) => {
    setQuizVisible(false);
    if (ans === currentQ.a) {
      const gain = currentDiff === 'easy' ? 50 : 120;
      setMoney(prev => prev + gain);
      setXp(prev => prev + (gain / 2));
      setEnergy(prev => Math.max(0, prev - 10));
      Alert.alert("DOĞRU ✅", `+$${gain} kazandın.`);
    } else {
      setEnergy(prev => Math.max(0, prev - 25));
      Alert.alert("BUG 🐞", "Enerjin düştü!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.background}>
        
        {/* Üst Dashboard */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>DEV-IMPIRE TYCOON</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Text style={styles.statEmoji}>💰</Text><Text style={styles.statText}>${money}</Text></View>
            <View style={styles.statItem}><Text style={styles.statEmoji}>⚡</Text><Text style={[styles.statText, {color: '#e74c3c'}]}>%{energy}</Text></View>
            <View style={styles.statItem}><Text style={styles.statEmoji}>👥</Text><Text style={[styles.statText, {color: '#3498db'}]}>{employees}</Text></View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollMain}>
          
          {/* XP Level Bar - ANA ODAK */}
          <View style={styles.levelContainer}>
             <View style={styles.levelHeader}>
                <Text style={styles.levelLabel}>SEVİYE {level}</Text>
                <Text style={styles.xpLabel}>{xp}/{100*level} XP</Text>
             </View>
             <View style={styles.barOuter}>
                <View style={[styles.barInner, {width: `${progressPercent}%`}]} />
             </View>
          </View>

          {/* Proje Merkezi */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🎯 PROJE MERKEZİ</Text>
            <View style={styles.btnRow}>
              <TouchableOpacity style={[styles.mainBtn, {borderColor: '#4cd137'}]} onPress={() => {
                setCurrentQ(QUESTION_BANK.easy[Math.floor(Math.random()*10)]);
                setCurrentDiff('easy'); setQuizVisible(true);
              }}>
                <Text style={[styles.mainBtnText, {color: '#4cd137'}]}>Junior Görevi</Text>
                <Text style={styles.btnSub}>Düşük Risk | +50$</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.mainBtn, {borderColor: '#e94560'}]} onPress={() => {
                setCurrentQ(QUESTION_BANK.hard[Math.floor(Math.random()*10)]);
                setCurrentDiff('hard'); setQuizVisible(true);
              }}>
                <Text style={[styles.mainBtnText, {color: '#e94560'}]}>Senior Projesi</Text>
                <Text style={styles.btnSub}>Zor Soru | +120$</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* PC Build Envanteri */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🖥️ PC SETUP (BUILD)</Text>
            <View style={styles.inventory}>
              {['kasa', 'monitor', 'klavye', 'mouse', 'kulaklik'].map((item) => (
                <View key={item} style={[styles.partBox, parts[item] && styles.partActive]}>
                  <Text style={styles.partEmoji}>{item === 'kasa' ? '🖥️' : item === 'monitor' ? '📺' : item === 'klavye' ? '⌨️' : item === 'mouse' ? '🖱️' : '🎧'}</Text>
                  <Text style={styles.partName}>{item.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Market & Ekip */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>🏪 DONANIM & İNSAN KAYNAKLARI</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketScroll}>
              <TouchableOpacity style={styles.shopCard} onPress={() => buyPart('kasa', 400)}><Text style={styles.shopEmoji}>🖥️</Text><Text style={styles.shopPrice}>Kasa $400</Text></TouchableOpacity>
              <TouchableOpacity style={styles.shopCard} onPress={() => buyPart('monitor', 300)}><Text style={styles.shopEmoji}>📺</Text><Text style={styles.shopPrice}>Monitör $300</Text></TouchableOpacity>
              <TouchableOpacity style={styles.shopCard} onPress={() => buyPart('klavye', 150)}><Text style={styles.shopEmoji}>⌨️</Text><Text style={styles.shopPrice}>Klavye $150</Text></TouchableOpacity>
              <TouchableOpacity style={styles.shopCard} onPress={() => buyPart('mouse', 80)}><Text style={styles.shopEmoji}>🖱️</Text><Text style={styles.shopPrice}>Mouse $80</Text></TouchableOpacity>
              <TouchableOpacity style={styles.shopCard} onPress={() => buyPart('kulaklik', 200)}><Text style={styles.shopEmoji}>🎧</Text><Text style={styles.shopPrice}>Kulaklık $200</Text></TouchableOpacity>
            </ScrollView>

            <TouchableOpacity 
              style={[styles.hireBtn, !isPcComplete && styles.lockedBtn]} 
              onPress={() => {
                if(!isPcComplete) return Alert.alert("Kilitli!", "Ekip kurmak için önce kendi PC'ni tamamlamalısın!");
                if(money >= 1000) { setMoney(m=>m-1000); setEmployees(e=>e+1); }
                else Alert.alert("Para Yetersiz!");
              }}>
              <Text style={styles.hireText}>+ YENİ ÇALIŞAN AL ($1000)</Text>
              <Text style={styles.hireSub}>{isPcComplete ? "Saniyede +5$ Getirir" : "PC Parçaları Eksik 🔒"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.coffeeBtn} onPress={() => {if(money >= 50){setMoney(m=>m-50); setEnergy(100);}}}><Text style={styles.coffeeText}>☕ KAHVE MOLASI ($50)</Text></TouchableOpacity>

        </ScrollView>

        <Modal visible={quizVisible} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalContent}>
              <Text style={styles.qText}>{currentQ?.q}</Text>
              {currentQ?.options.map((opt, i) => (
                <TouchableOpacity key={i} style={styles.optBtn} onPress={() => handleAnswer(opt)}><Text style={styles.optText}>{opt}</Text></TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  header: { padding: 20, paddingTop: 40, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center' },
  headerTitle: { color: '#f1c40f', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 15 },
  statItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statEmoji: { fontSize: 16, marginRight: 5 },
  statText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  scrollMain: { padding: 20, paddingBottom: 50 },
  levelContainer: { marginBottom: 25 },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  levelLabel: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  xpLabel: { color: '#bdc3c7', fontSize: 12 },
  barOuter: { height: 16, backgroundColor: '#1a1a2e', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#302b63' },
  barInner: { height: '100%', backgroundColor: '#4cd137' },
  sectionContainer: { marginBottom: 30 },
  sectionTitle: { color: '#bdc3c7', fontSize: 13, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  mainBtn: { width: '48%', backgroundColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 15, borderWidth: 2, alignItems: 'center' },
  mainBtnText: { fontSize: 16, fontWeight: 'bold' },
  btnSub: { color: '#bdc3c7', fontSize: 10, marginTop: 5 },
  inventory: { flexDirection: 'row', justifyContent: 'space-between' },
  partBox: { width: (width-60)/5.5, height: 70, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, alignItems: 'center', justifyContent: 'center', opacity: 0.3 },
  partActive: { opacity: 1, backgroundColor: 'rgba(76, 209, 55, 0.1)', borderColor: '#4cd137', borderWidth: 1 },
  partEmoji: { fontSize: 24 },
  partName: { fontSize: 7, color: '#fff', marginTop: 5, fontWeight: 'bold' },
  marketScroll: { marginBottom: 20 },
  shopCard: { backgroundColor: '#16213e', padding: 15, borderRadius: 15, marginRight: 12, alignItems: 'center', width: 100, borderWidth: 1, borderColor: '#3498db' },
  shopEmoji: { fontSize: 26 },
  shopPrice: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginTop: 8 },
  hireBtn: { backgroundColor: '#2ecc71', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 5 },
  lockedBtn: { backgroundColor: '#34495e', opacity: 0.6 },
  hireText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  hireSub: { color: '#ecf0f1', fontSize: 11, marginTop: 4 },
  coffeeBtn: { backgroundColor: '#d35400', padding: 15, borderRadius: 12, alignItems: 'center' },
  coffeeText: { color: '#fff', fontWeight: 'bold' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center' },
  modalContent: { margin: 25, backgroundColor: '#1a1a2e', padding: 35, borderRadius: 25, borderWidth: 2, borderColor: '#f1c40f' },
  qText: { color: '#fff', fontSize: 20, textAlign: 'center', marginBottom: 30, lineHeight: 28 },
  optBtn: { backgroundColor: '#0f3460', padding: 18, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#302b63' },
  optText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }
});