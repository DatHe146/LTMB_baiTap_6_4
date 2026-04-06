import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cartItems = [
  { id: '1', name: 'Bell Pepper Red', price: 4.99, unit: '1kg', image: require('../../assets/images/pepper.png') },
  { id: '2', name: 'Egg Chicken Red', price: 1.99, unit: '4pcs', image: require('../../assets/images/egg_red.png') },
  { id: '3', name: 'Organic Bananas', price: 3.00, unit: '12kg', image: require('../../assets/images/banana.png') },
];

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity><Ionicons name="close" size={20} color="#B3B3B3" /></TouchableOpacity>
              </View>
              <Text style={styles.unit}>{item.unit}, Price</Text>
              <View style={styles.row}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.qBtn}><Ionicons name="remove" size={20} color="#B3B3B3" /></TouchableOpacity>
                  <Text style={styles.quantity}>1</Text>
                  <TouchableOpacity style={[styles.qBtn, { borderColor: '#53B175' }]}><Ionicons name="add" size={20} color="#53B175" /></TouchableOpacity>
                </View>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <View style={styles.totalBadge}><Text style={styles.totalText}>$12.96</Text></View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  cartItem: { flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  image: { width: 70, height: 70 },
  info: { flex: 1, marginLeft: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  unit: { color: '#7C7C7C', marginVertical: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qBtn: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  quantity: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#53B175', height: 65, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  totalBadge: { backgroundColor: '#489E67', padding: 5, borderRadius: 5, marginLeft: 15 },
  totalText: { color: '#fff', fontSize: 12 }
});