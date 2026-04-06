import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CheckboxRow = ({ label, isChecked, onPress }: { label: string, isChecked: boolean, onPress: () => void }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
    </View>
    <Text style={[styles.checkboxLabel, isChecked && { color: '#53B175' }]}>{label}</Text>
  </TouchableOpacity>
);

export default function FilterScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState({ eggs: true, noodles: false, chips: false, fastfood: false });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="close" size={28} color="black" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <CheckboxRow label="Eggs" isChecked={categories.eggs} onPress={() => setCategories({...categories, eggs: !categories.eggs})} />
        <CheckboxRow label="Noodles & Pasta" isChecked={categories.noodles} onPress={() => setCategories({...categories, noodles: !categories.noodles})} />
        <CheckboxRow label="Chips & Crisps" isChecked={categories.chips} onPress={() => setCategories({...categories, chips: !categories.chips})} />
        <CheckboxRow label="Fast Food" isChecked={categories.fastfood} onPress={() => setCategories({...categories, fastfood: !categories.fastfood})} />

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
        <CheckboxRow label="Cocola" isChecked={true} onPress={() => {}} />
        <CheckboxRow label="Ifad" isChecked={false} onPress={() => {}} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={() => router.back()}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 25, backgroundColor: '#F2F3F2' },
  sectionTitle: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B1B1B1', justifyContent: 'center', alignItems: 'center', marginRight: 15, backgroundColor: '#fff' },
  checkboxChecked: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  footer: { padding: 20, backgroundColor: '#F2F3F2' },
  applyButton: { backgroundColor: '#53B175', height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  applyButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});