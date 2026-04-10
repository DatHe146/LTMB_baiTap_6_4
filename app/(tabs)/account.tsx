import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../components/AuthContext'; // Đảm bảo đường dẫn đúng

// Component con cho từng dòng menu trong Profile
const ProfileMenu = ({ label, icon, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#181725" />
  </TouchableOpacity>
);

export default function AccountScreen() {
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Phần Header Profile (Avatar + Tên) */}
        <View style={styles.profileHeader}>
          <Image source={require('../../assets/images/user_avatar.png')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Heooo</Text>
              <TouchableOpacity><Feather name="edit-2" size={16} color="#53B175" style={{ marginLeft: 10 }} /></TouchableOpacity>
            </View>
            <Text style={styles.userEmail}>{user?.phone || 'Afula, Israel'}</Text>
          </View>
        </View>

        {/* Danh sách Menu */}
        <View style={styles.menuContainer}>
          <ProfileMenu label="Orders" icon={<Feather name="shopping-bag" size={22} color="#181725" />} />
          <ProfileMenu label="My Details" icon={<Feather name="user" size={22} color="#181725" />} />
          <ProfileMenu label="Delivery Address" icon={<MaterialIcons name="location-on" size={22} color="#181725" />} />
          <ProfileMenu label="Payment Methods" icon={<MaterialCommunityIcons name="credit-card-outline" size={22} color="#181725" />} />
          <ProfileMenu label="Promo Cord" icon={<Ionicons name="ticket-outline" size={22} color="#181725" />} />
          <ProfileMenu label="Notifications" icon={<Feather name="bell" size={22} color="#181725" />} />
          <ProfileMenu label="Help" icon={<Feather name="help-circle" size={22} color="#181725" />} />
          <ProfileMenu label="About" icon={<Feather name="info" size={22} color="#181725" />} />
        </View>

        {/* Nút Đăng xuất */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Feather name="log-out" size={22} color="#53B175" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 25, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  avatar: { width: 65, height: 65, borderRadius: 27 },
  userInfo: { marginLeft: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  userEmail: { fontSize: 16, color: '#7C7C7C', marginTop: 3 },
  menuContainer: { paddingHorizontal: 25, marginTop: 10 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuLabel: { fontSize: 18, fontWeight: '600', color: '#181725', marginLeft: 15 },
  logoutBtn: { backgroundColor: '#F2F3F2', height: 65, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 25 },
  logoutIcon: { position: 'absolute', left: 25 },
  logoutText: { color: '#53B175', fontSize: 18, fontWeight: '600' }
});