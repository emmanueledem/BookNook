import { Stack, Link, router } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useBookStore } from '@/store/bookStore';
import { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCartStore } from '@/store/cartStore';
import { Snackbar } from 'react-native-paper';
import { BookPrice } from '@/components/bookPrice';

export default function Home() {
  const {
    books,
    loading,
    loadingMore,
    fetchBooks,
    loadMore,
  } = useBookStore();


  const [searchQuery, setSearchQuery] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [snackVisible, setSnackVisible] = useState(false);


  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return books;

    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    });
  }, [books, searchQuery]);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));


  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><ActivityIndicator size="large" /></View>;
  }

  const renderItem = ({ item, index }: any) => (

    <Animated.View
      style={animatedStyle}
      entering={FadeInDown.delay(index * 70)}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}

        onPressOut={() => {
          scale.value = withSpring(1);
        }}

        onPress={() => {
          router.push({
            pathname: '/book-details',
            params: { id: item.id },
          })
        }
        }
        style={styles.card}>
        <Image
          source={item.image}
          style={styles.image}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
        />
        <View style={styles.bookInfo}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.author}>
            {item.author}
          </Text>

          <Text style={styles.rating}>
            ⭐ {item.rating} ({item.reviews})
          </Text>

          <View style={styles.actionRow}>
            <BookPrice price={item.price} />


            <Pressable
              onPress={(e) => {
                e.stopPropagation();
                addToCart(item);
                setSnackVisible(true);
              }}
              style={styles.addButton}
            >
              <Ionicons
                name="cart"
                color="#fff"
                size={18}
              />

              <Text style={styles.addButtonText}>
                Add
              </Text>
            </Pressable>


          </View>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.heading}>Discover Books</Text>
        <Pressable
          onPress={() => router.push('/all-cart-items')}
          style={styles.cart}>
          <Ionicons
            name="cart-outline"
            size={28}
          />

          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalItems}
              </Text>
            </View>
          )}
        </Pressable>
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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchBooks}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                No books found
              </Text>

              <Text style={styles.emptySubtitle}>
                Try searching with another keyword.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              style={{
                marginVertical: 24,
              }}
            />
          ) : null
        }
      />
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2500}
        style={styles.snackBarStyle}
      >
        Added to cart
      </Snackbar>
    </SafeAreaView>
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

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  image: {
    width: '100%',
    height: 240,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
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

  rating: {
    fontSize: 15,
    color: '#444',
  },

  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  emptySubtitle: {
    marginTop: 8,
    color: '#666',
  },

  actionRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4CAF50',
  },

  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  snackBarStyle: {
    backgroundColor: '#4CAF50',
  },
});