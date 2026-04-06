import { Stack } from 'expo-router';
import { AuthProvider } from '../components/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Màn hình Đăng nhập */}
        <Stack.Screen name="index" />
        
        {/* Nhóm các màn hình chính (Shop, Cart, v.v.) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Cấu hình màn hình Filter dưới dạng Modal */}
        <Stack.Screen 
          name="filter" 
          options={{ 
            presentation: 'modal', // Hiệu ứng trượt từ dưới lên
            animation: 'slide_from_bottom', // Đảm bảo hiệu ứng mượt mà trên Android
            headerShown: false 
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}