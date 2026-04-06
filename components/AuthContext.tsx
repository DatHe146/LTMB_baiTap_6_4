import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Định nghĩa kiểu dữ liệu (cho TypeScript khỏi báo lỗi)
interface User {
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string) => void;
  logout: () => void;
}

// 2. Tạo Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Tạo Provider (Cung cấp dữ liệu cho toàn bộ App)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (phoneNumber: string) => {
    setUser({ phone: phoneNumber });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook để các màn hình khác lấy dữ liệu dễ dàng
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được dùng trong AuthProvider');
  }
  return context;
};