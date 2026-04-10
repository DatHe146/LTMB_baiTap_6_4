import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Link ảnh online cho gọn project
const successImg = 'https://cdn-icons-png.flaticon.com/512/11104/11104253.png'; // Icon đơn hàng thành công
const failedImg = 'https://cdn-icons-png.flaticon.com/512/7517/7517173.png'; // Icon đơn hàng thất bại

export default function OrderStatusScreen() {
  const router = useRouter();
  
  // Lấy tham số status từ URL
  const { status } = useLocalSearchParams(); 
  const isSuccess = status === 'success';

  return (
    <SafeAreaView style={styles.container}>
      {/* Vùng nền mờ xung quanh */}
      <View style={styles.overlay} />

      {/* Thẻ thông báo chính */}
      <View style={styles.alertCard}>
        <Image 
          source={{ uri: isSuccess ? successImg : failedImg }} 
          style={styles.icon} 
          resizeMode="contain" 
        />
        
        {/* Nội dung thông báo dựa trên trạng thái */}
        {isSuccess ? (
          <View style={styles.textCenter}>
            <Text style={styles.title}>Your Order has been accepted</Text>
            <Text style={styles.subTitle}>Your items has been placed and is on it's way to being processed</Text>
          </View>
        ) : (
          <View style={styles.textCenter}>
            <Text style={styles.title}>Oops! Order Failed</Text>
            <Text style={styles.subTitle}>Something went wrong. Please check your network and try again.</Text>
          </View>
        )}

        {/* Nút bấm ở dưới */}
        <View style={styles.buttonContainer}>
          {isSuccess ? (
            <>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.primaryBtnText}>Track Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.secondaryBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.primaryBtn} onPress={() => router.back()}>
                <Text style={styles.primaryBtnText}>Please Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.secondaryBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' }, // Nền đen mờ 50%
  alertCard: { backgroundColor: '#fff', width: '85%', borderRadius: 18, padding: 30, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  icon: { width: 150, height: 150, marginBottom: 30 },
  textCenter: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 20 },
  subTitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', lineHeight: 22 },
  buttonContainer: { width: '100%' },
  primaryBtn: { backgroundColor: '#53B175', height: 60, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  primaryBtnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  secondaryBtn: { height: 60, justifyContent: 'center', alignItems: 'center' },
  secondaryBtnText: { color: '#181725', fontSize: 18, fontWeight: '600' }
});