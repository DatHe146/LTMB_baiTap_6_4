import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Component con cho từng dòng thông tin Checkout
const CheckoutRow = ({ label, value, icon, showArrow = true }: any) => (
  <TouchableOpacity style={styles.checkoutRow} activeOpacity={0.7}>
    <View style={styles.rowLeft}>
      {icon && <View style={styles.rowIcon}>{icon}</View>}
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <View style={styles.rowRight}>
      <Text style={styles.rowValue}>{value}</Text>
      {showArrow && <Ionicons name="chevron-forward" size={18} color="#181725" />}
    </View>
  </TouchableOpacity>
);

export default function CheckoutScreen() {
  const router = useRouter();

  // Logic xử lý khi bấm "Place Order"
  const handlePlaceOrder = () => {
    // Giả lập logic thành công/thất bại ngẫu nhiên (50/50)
    const isSuccess = Math.random() > 0.5; 
    
    // Đóng màn hình Checkout hiện tại
    router.back(); 

    // Mở màn hình thông báo trạng thái với tham số status
    router.push(`./orderStatus?status=${isSuccess ? 'success' : 'failed'}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Modal Checkout */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={28} color="#181725" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <CheckoutRow label="Delivery" value="Select Method" />
        <CheckoutRow label="Payment" value="" icon={<FontAwesome5 name="cc-visa" size={18} color="#181725" />} />
        <CheckoutRow label="Promo Code" value="Pick Discount" />
        <CheckoutRow label="Total Cost" value="$13.97" showArrow={false} />
        
        {/* Phần điều khoản */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> and{' '}
            <Text style={styles.termsLink}>Conditions</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* Nút Place Order */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  closeBtn: { position: 'absolute', right: 20 },
  content: { flex: 1, padding: 25 },
  checkoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowIcon: { marginRight: 15 },
  rowLabel: { fontSize: 18, color: '#7C7C7C', fontWeight: '500' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 16, color: '#181725', fontWeight: '600', marginRight: 10 },
  termsContainer: { marginTop: 30, marginBottom: 20 },
  termsText: { fontSize: 14, color: '#7C7C7C', lineHeight: 22 },
  termsLink: { color: '#181725', fontWeight: '600' },
  footer: { padding: 25 },
  placeOrderBtn: { backgroundColor: '#53B175', height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});