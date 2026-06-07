import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hello! 👋</Text>
        <Text style={styles.titleText}>Ready for a clean space?</Text>
      </View>

      <TouchableOpacity style={styles.card}>
        <Text style={{fontSize: 30}}>🏡</Text>
        <View style={{marginLeft: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Home Cleaning</Text>
          <Text style={{color: '#6C757D'}}>Deep & regular cleaning</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={{fontSize: 30}}>🏢</Text>
        <View style={{marginLeft: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Office Cleaning</Text>
          <Text style={{color: '#6C757D'}}>For your workspace</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { marginTop: 60, marginBottom: 30 },
  welcomeText: { fontSize: 16, color: '#6C757D' },
  titleText: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 15, elevation: 3 }
});