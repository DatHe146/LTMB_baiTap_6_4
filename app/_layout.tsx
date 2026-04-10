import { Stack } from 'expo-router';
import { AuthProvider } from '../components/AuthContext'; // Đảm bảo file này tồn tại

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Nhóm màn hình chính có Bottom Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Màn hình Checkout (Modal trượt lên) */}
        <Stack.Screen 
          name="checkout" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false 
          }} 
        />

        {/* Màn hình thông báo Thành công/Thất bại (Modal trượt lên) */}
        <Stack.Screen 
          name="orderStatus" 
          options={{ 
            presentation: 'transparentModal', // Nền trong suốt
            animation: 'fade', // Hiệu ứng mờ dần
            headerShown: false 
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}