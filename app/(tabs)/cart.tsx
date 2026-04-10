import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Modal, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const cartItems = [
  { id: '1', name: 'Bell Pepper Red', price: 4.99, unit: '1kg', image: { uri: 'https://cdn-icons-png.flaticon.com/512/765/765544.png' } },
  { id: '2', name: 'Egg Chicken Red', price: 1.99, unit: '4pcs', image: { uri: 'https://cdn-icons-png.flaticon.com/512/837/837165.png' } },
  { id: '3', name: 'Organic Bananas', price: 3.00, unit: '12kg', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2909/2909808.png' } },
  { id: '4', name: 'Ginger', price: 2.99, unit: '250gm', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2149/2149841.png' } },
];

export default function CartScreen() {
  const router = useRouter();
  // Bước 1: Tạo trạng thái để ẩn/hiện bảng Checkout
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  const handlePlaceOrder = () => {
    setCheckoutVisible(false); // Đóng bảng checkout
    const isSuccess = Math.random() > 0.5; 
    router.push(`/orderStatus?status=${isSuccess ? 'success' : 'failed'}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>My Cart</Text>
      
      {/* GIỮ NGUYÊN GIAO DIỆN DANH SÁCH CŨ (ẢNH 2) */}
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
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* NÚT BẤM ĐỂ HIỆN BẢNG CHECKOUT */}
      <TouchableOpacity style={styles.checkoutBtn} onPress={() => setCheckoutVisible(true)}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <View style={styles.totalBadge}><Text style={styles.totalText}>$12.96</Text></View>
      </TouchableOpacity>

      {/* --- GIAO DIỆN ẢNH 3: BẢNG CHECKOUT HIỆN ĐÈ LÊN --- */}
      <Modal
        visible={isCheckoutVisible}
        transparent={true}
        animationType="slide"
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCheckoutVisible(false)}>
          <View style={styles.checkoutSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetBody}>
              <CheckoutRow label="Delivery" value="Select Method" />
              <CheckoutRow label="Pament" value="" icon={<FontAwesome5 name="cc-visa" size={18} color="blue" />} />
              <CheckoutRow label="Promo Code" value="Pick discount" />
              <CheckoutRow label="Total Cost" value="$13.97" />
              
              <Text style={styles.termsText}>
                By placing an order you agree to our <Text style={styles.boldText}>Terms</Text> And <Text style={styles.boldText}>Conditions</Text>
              </Text>
              
              <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// Component phụ cho từng dòng trong Checkout
const CheckoutRow = ({ label, value, icon }: any) => (
  <View style={styles.sheetRow}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowRight}>
      {icon}
      <Text style={styles.rowValue}>{value}</Text>
      <Ionicons name="chevron-forward" size={18} color="black" />
    </View>
  </View>
);

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
  totalText: { color: '#fff', fontSize: 12 },

  // Styles cho Modal (Ảnh 3)
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  checkoutSheet: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F2F3F2', paddingBottom: 20 },
  sheetTitle: { fontSize: 24, fontWeight: 'bold' },
  sheetBody: { marginTop: 10 },
  sheetRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  rowLabel: { fontSize: 18, color: '#7C7C7C', fontWeight: '500' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  termsText: { fontSize: 14, color: '#7C7C7C', marginTop: 25, lineHeight: 22 },
  boldText: { color: '#181725', fontWeight: 'bold' },
  placeOrderBtn: { backgroundColor: '#53B175', height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 25 },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});