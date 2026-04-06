import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const favItems = [
  { id: '1', name: 'Sprite Can', price: 1.50, unit: '325ml', image: require('../../assets/images/sprite.png') },
  { id: '2', name: 'Diet Coke', price: 1.99, unit: '355ml', image: require('../../assets/images/coke.png') },
  { id: '3', name: 'Apple Juice', price: 15.50, unit: '2L', image: require('../../assets/images/juice.png') },
];

export default function FavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Favourite</Text>
      <FlatList
        data={favItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>{item.unit}, Price</Text>
            </View>
            <View style={styles.rightRow}>
              <Text style={styles.price}>${item.price}</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addAllBtn}>
        <Text style={styles.addAllText}>Add All To Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  image: { width: 50, height: 50 },
  info: { flex: 1, marginLeft: 20 },
  name: { fontSize: 16, fontWeight: 'bold' },
  unit: { color: '#7C7C7C' },
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  addAllBtn: { backgroundColor: '#53B175', height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  addAllText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});