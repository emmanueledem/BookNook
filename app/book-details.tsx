import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useBookStore } from '@/store/bookStore';
import { useCartStore } from '@/store/cartStore';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { Snackbar } from 'react-native-paper';

export default function BookDetails() {
  const { id } = useLocalSearchParams();

  const addToCart = useCartStore((state) => state.addToCart);
  const [snackVisible, setSnackVisible] = useState(false);

  const book = useBookStore((state) =>
    state.books.find((book) => book.id === id),
  );

  if (!book) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* HERO */}
        <View style={styles.heroContainer}>
          <Image
            source={book.image}
            style={styles.image}
            contentFit="cover"
            transition={300}
            cachePolicy="memory-disk"
          />

          <View style={styles.imageOverlay} />

          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              style={styles.iconButton}
              onPress={() => router.back()}>
              <Ionicons
                name="chevron-back"
                size={24}
                color="#fff"
              />
            </Pressable>

            <Pressable style={styles.iconButton}>
              <Ionicons
                name="heart-outline"
                size={22}
                color="#fff"
              />
            </Pressable>
          </View>

          {/* HERO CONTENT */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            style={styles.heroContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>
                {book.category}
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              {book.title}
            </Text>

            <Text style={styles.heroAuthor}>
              {book.author}
            </Text>

            <View style={styles.heroMeta}>
              <View style={styles.metaChip}>
                <Ionicons
                  name="star"
                  color="#FFD700"
                  size={16}
                />

                <Text style={styles.metaText}>
                  {book.rating}
                </Text>
              </View>

              <View style={styles.metaChip}>
                <Ionicons
                  name="people-outline"
                  size={16}
                  color="#fff"
                />

                <Text style={styles.metaText}>
                  {book.reviews} Reviews
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* CONTENT */}
        <Animated.View
          entering={FadeInDown.delay(350)}
          style={styles.content}>
          {/* PRICE CARD */}
          <View style={styles.priceCard}>
            <View>
              <Text style={styles.priceLabel}>
                Price
              </Text>

              <Text style={styles.price}>
                ${book.price.toFixed(2)}
              </Text>
            </View>

            <View style={styles.stockBadge}>
              <Ionicons
                name="checkmark-circle"
                color="#4CAF50"
                size={18}
              />

              <Text style={styles.stockText}>
                In Stock
              </Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {book.description}
          </Text>

          {/* REVIEWS */}
          <Text style={styles.sectionTitle}>
            Reader Reviews
          </Text>

          {book.reviewList.length === 0 && (
            <Text style={[styles.description, { textAlign: 'center' }]}>
              No reviews yet.
            </Text>
          )}
          {book.reviewList.map((review) => (
            <Animated.View
              entering={FadeInDown}
              key={review.id}
              style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {review.user.charAt(0)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewUser}>
                    {review.user}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    {Array.from({
                      length: review.rating,
                    }).map((_, index) => (
                      <Ionicons
                        key={index}
                        name="star"
                        color="#FFC107"
                        size={14}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.reviewText}>
                {review.comment}
              </Text>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>
            Total Price
          </Text>

          <Text style={styles.footerPrice}>
            ${book.price.toFixed(2)}
          </Text>
        </View>

        <Pressable
          onPress={() => { addToCart(book), setSnackVisible(true); }}
          style={styles.button}>
          <Ionicons
            name="cart"
            color="#fff"
            size={20}
          />

          <Text style={styles.buttonText}>
            Add to Cart
          </Text>
        </Pressable>
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2500}
        style={styles.snackBarStyle}
      >
        Added to cart
      </Snackbar>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  scrollContent: {
    paddingBottom: 120,
  },

  heroContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 520,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    zIndex: 10,
  },

  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  heroContent: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 18,
  },

  categoryBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },

  heroAuthor: {
    marginTop: 8,
    color: '#E8E8E8',
    fontSize: 18,
  },

  heroMeta: {
    flexDirection: 'row',
    marginTop: 22,
  },

  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 12,
  },

  metaText: {
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },

  content: {
    backgroundColor: '#F6F7FB',
    marginTop: -28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 28,
  },

  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  priceLabel: {
    color: '#888',
    fontSize: 14,
  },

  price: {
    marginTop: 4,

    fontSize: 34,
    fontWeight: '700',

    color: '#111',
  },

  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF8EE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  stockText: {
    marginLeft: 6,
    color: '#4CAF50',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',

    color: '#111',

    marginBottom: 14,
    marginTop: 8,
  },

  description: {
    color: '#666',
    lineHeight: 28,
    fontSize: 16,

    marginBottom: 30,
  },

  reviewCard: {
    backgroundColor: '#fff',

    borderRadius: 18,

    padding: 18,

    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
  },

  avatar: {
    width: 46,
    height: 46,

    borderRadius: 23,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#4CAF50',

    marginRight: 14,
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  reviewUser: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  reviewText: {
    color: '#666',
    lineHeight: 24,
    fontSize: 15,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: Platform.OS == 'ios' ? 18 : 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    elevation: 18,
  },

  footerLabel: {
    color: '#777',
    fontSize: 14,
  },

  footerPrice: {
    marginTop: 4,
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  button: {
    height: 56,
    paddingHorizontal: 28,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  snackBarStyle: {
    backgroundColor: '#4CAF50',
  },

});