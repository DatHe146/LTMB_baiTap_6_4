import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


// Định nghĩa kiểu dữ liệu để hết lỗi TypeScript
interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: any;
}

const products: Product[] = [
  { id: '1', name: 'Egg Chicken Red', price: 1.99, unit: '4pcs', image: require('../../assets/images/egg_red.png') },
  { id: '2', name: 'Egg Chicken White', price: 1.50, unit: '180g', image: require('../../assets/images/egg_white.png') },
  { id: '3', name: 'Egg Pasta', price: 15.99, unit: '30gm', image: require('../../assets/images/pasta.png') },
  { id: '4', name: 'Egg Noodles', price: 15.99, unit: '2L', image: require('../../assets/images/noodles.png') },
];

const ProductCard = ({ item }: { item: Product }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.productImage} resizeMode="contain" />
    <Text style={styles.productName}>{item.name}</Text>
    <Text style={styles.productUnit}>{item.unit}, Price</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ShopScreen() {
  const router = useRouter(); // Thêm dòng này để điều hướng

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Container bọc cả Search và Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#181725" />
            <TextInput 
              placeholder="Search Store" 
              style={styles.searchInput} 
              placeholderTextColor="#7C7C7C"
            />
          </View>
          
          {/* Nút Filter - Nhấn vào sẽ mở Modal Filter */}
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => router.push('/filter')}
          >
            <Ionicons name="options-outline" size={24} color="#181725" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 15 
  },
  header: { 
    marginVertical: 20 
  },
  // Row chứa cả thanh Search và nút Filter
  searchRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  searchContainer: { 
    flex: 1, // Chiếm toàn bộ không gian còn lại
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F2F3F2', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 50 
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16,
    color: '#181725' 
  },
  filterButton: { 
    marginLeft: 15, // Khoảng cách giữa search và filter
    padding: 5
  },
  row: { 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  // Thẻ sản phẩm (Card)
  card: { 
    width: '48%', 
    backgroundColor: '#fff', 
    borderRadius: 18, 
    borderColor: '#E2E2E2', 
    padding: 15, 
    borderWidth: 1 
  },
  productImage: { 
    width: '100%', 
    height: 80, 
    marginBottom: 15 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#181725' 
  },
  productUnit: { 
    color: '#7C7C7C', 
    marginBottom: 10,
    fontSize: 14 
  },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 5 
  },
  productPrice: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#181725' 
  },
  addButton: { 
    backgroundColor: '#53B175', 
    width: 35, 
    height: 35, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});