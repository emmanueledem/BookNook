import { Stack, Link, router } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { books } from '@/mock/book';
import { useBookStore } from '@/store/bookStore';
import { useEffect } from 'react';

export default function Home() {
  const {
    books,
    loading,
    error,
    fetchBooks,
  } = useBookStore();


  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><ActivityIndicator size="large" /></View>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderItem = ({ item }: any) => (

    <Pressable
      onPress={() => {
        router.push({
          pathname: '/book-details',
          params: { id: item.id },
        })
      }
      }
      style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.bookInfo}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.author}>{item.author}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.price}</Text>

          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </Pressable>

  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '📚 Book Nook',
        }}
      />

      <View style={styles.header}>
        <Text style={styles.heading}>Discover Books</Text>

        <View style={styles.cart}>
          <Ionicons
            name="cart-outline"
            size={26}
            color="#222"
          />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="Search books..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  cart: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  searchContainer: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 2,
  },

  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },

  bookInfo: {
    padding: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  author: {
    marginTop: 6,
    color: '#666',
    fontSize: 15,
  },

  bottomRow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },

  rating: {
    fontSize: 15,
    color: '#444',
  },
});