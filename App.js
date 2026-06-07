import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Linking, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [selectedService, setSelectedService] = useState({ title: '', desc: '' });
  const [address, setAddress] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const HomeScreen = () => (
    <View style={styles.flexContainer}>
      <ScrollView>
        <View style={styles.navBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>📍 Riyadh, KSA</Text>
          </View>
          <View style={styles.secondaryBadge}>
            {/* تم استخدام secondaryBadgeText ليظهر النص أبيض على الخلفية الزرقاء */}
            <Text style={styles.secondaryBadgeText}>👑 Dalal Aisha</Text>
          </View>
        </View>
        <Text style={styles.mainTitle}>The Highest Standard of Clean</Text>
        <Text style={styles.sectionTitle}>Our Premium Services</Text>
        {[
          { title: 'Premium Home Cleaning', desc: 'Sparkling clean for apartments & villas' },
          { title: 'Office Cleaning', desc: 'Professional care for corporate workspaces' },
          { title: 'Deep Cleaning', desc: 'Total sanitization.' }
        ].map((service, index) => (
          <TouchableOpacity key={index} style={styles.coloredCard} onPress={() => { setSelectedService(service); setScreen('Details'); }}>
            <Text style={styles.serviceText}>{service.title}</Text>
            <Text style={styles.subText}>{service.desc}</Text>
          </TouchableOpacity>
        ))}
        <Image source={require('./assets/cleaning/cleaning1.jpg')} style={styles.bottomImage} resizeMode="cover" />
      </ScrollView>
    </View>
  );

  const DetailsScreen = () => (
    <View style={styles.flexContainer}>
      <ScrollView contentContainerStyle={styles.contentPadding}>
        <TouchableOpacity onPress={() => setScreen('Home')}><Text style={styles.backLink}>← Back</Text></TouchableOpacity>
        <Text style={styles.mainTitle}>{selectedService.title}</Text>
        <Text style={styles.priceText}>Starting from 35 SAR / Hr</Text>
        <Text style={styles.label}>About the Service</Text>
        <Text style={styles.subText}>{selectedService.desc}</Text>
        <Text style={styles.sectionLabel}>What is Included?</Text>
        {["Professional Crew", "Eco-Friendly Detergents", "Deep Sanitization", "Vacuuming"].map((item, i) => (
          <Text key={i} style={styles.checkText}>✅ {item}</Text>
        ))}
        <TouchableOpacity style={styles.bookBtn} onPress={() => setScreen('Booking')}>
          <Text style={styles.bookBtnText}>Proceed to Book Now 📅</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const BookingScreen = () => (
    <View style={styles.flexContainer}>
      <ScrollView contentContainerStyle={styles.contentPadding}>
        <TouchableOpacity onPress={() => setScreen('Details')}><Text style={styles.backLink}>← Back to Details</Text></TouchableOpacity>
        <Text style={styles.mainTitle}>Booking Details</Text>
        <Text style={styles.serviceSubtitle}>Service: {selectedService.title}</Text>
        
        <Text style={styles.label}>Select Service Duration</Text>
        <View style={styles.row}>
          {[3, 4, 6].map((hours, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.optionBtn, hoveredIndex === index && styles.hoveredOptionBtn]}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Text style={hoveredIndex === index ? styles.activeText : styles.optionText}>
                {hours} Hours
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Select Riyadh District</Text>
        <View style={styles.districtContainer}>
          {['Al-Yasmin', 'Al-Sahafa', 'Al-Olaya', 'Al-Narjis', 'Al-Hittin'].map((dist) => (
            <TouchableOpacity key={dist} style={styles.districtBtn}><Text style={styles.distText}>{dist}</Text></TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Preferred Date & Time</Text>
        <TextInput style={styles.input} placeholder="e.g., Monday at 10:00 AM" />
        <Text style={styles.label}>Street Name, Villa / Apartment No.</Text>
        <TextInput style={styles.input} placeholder="e.g., King Fahd Rd, Block 3, Apt 12" onChangeText={setAddress} />
        <TouchableOpacity style={styles.bookBtn} onPress={() => Linking.openURL(`https://wa.me/966567221680?text=Booking: ${selectedService.title}, Address: ${address}`)}>
          <Text style={styles.bookBtnText}>Confirm & Book via WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return screen === 'Home' ? <HomeScreen /> : screen === 'Details' ? <DetailsScreen /> : <BookingScreen />;
}

const styles = StyleSheet.create({
  flexContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  contentPadding: { padding: 20 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 30 },
  badge: { backgroundColor: '#E0E7FF', padding: 10, borderRadius: 20 },
  secondaryBadge: { backgroundColor: '#1E3A8A', padding: 10, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#1E3A8A' },
  secondaryBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' }, // نص أبيض للشارة الغامقة
  mainTitle: { fontSize: 26, fontWeight: 'bold', color: '#1E3A8A', padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', paddingHorizontal: 20, color: '#1E40AF' },
  coloredCard: { backgroundColor: '#FFFFFF', padding: 20, margin: 20, borderRadius: 16, borderWidth: 1, borderColor: '#1E3A8A' },
  serviceText: { fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' },
  subText: { color: '#475569', marginTop: 5 },
  backLink: { color: '#1E3A8A', fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 8 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', color: '#1E3A8A', marginBottom: 8, marginTop: 15 },
  checkText: { marginBottom: 8, fontSize: 15 },
  priceText: { fontSize: 16, marginBottom: 20, color: '#1E3A8A', fontWeight: 'bold' },
  bookBtn: { backgroundColor: '#1E3A8A', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  bookBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', marginBottom: 20 },
  optionBtn: { flex: 1, padding: 14, backgroundColor: '#E2E8F0', alignItems: 'center', marginHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1' },
  optionText: { color: '#475569' },
  hoveredOptionBtn: { backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' },
  activeText: { fontWeight: 'bold', color: '#FFF' },
  input: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#1E3A8A', marginBottom: 20 },
  districtContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  districtBtn: { padding: 10, backgroundColor: '#E2E8F0', borderRadius: 8, margin: 4 },
  distText: { fontSize: 12, color: '#1E3A8A' },
  bottomImage: { width: width - 40, height: 220, marginHorizontal: 20, borderRadius: 16, marginBottom: 40, borderWidth: 1, borderColor: '#1E3A8A' }
});