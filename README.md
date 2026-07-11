# 📚 "The Book Nook App"

The Book Nook App is a simple React Native (Expo) bookstore application built as a technical assessment. It allows users to browse books, search by title/author/category, view detailed information, manage a shopping cart, and persist cart data locally.

---

# Features

## Browse Books

- Display a list of books
- Beautiful card layout
- Smooth list entrance animations using Reanimated
- Optimized image rendering with `expo-image`

## Search

- Search books by:
  - Title
  - Author
  - Category

Search is implemented using **derived state** with `useMemo`, ensuring the filtered list is always calculated from the source data instead of storing duplicate state.

## Book Details

Each book includes:

- Cover image
- Title
- Author
- Category
- Rating
- Price
- Description
- Reviews

## Shopping Cart

Users can:

- Add books to cart
- Increase quantity
- Decrease quantity
- Remove books
- Clear entire cart
- View total price
- View total number of items

Cart updates happen instantly.

## Local Persistence

The shopping cart is stored locally using:

- AsyncStorage

This allows the cart to remain available after restarting the application.

## Checkout Simulation

A mock checkout flow has been implemented.

When Checkout is pressed:

- Loading indicator is displayed
- A simulated payment delay occurs
- Cart is cleared
- User is returned to the Home screen
- Success message is shown

---

# Technical Choices

## Expo

The project uses Expo for easier development, navigation, and cross-platform support.

## Zustand

Zustand is used for global application state:

- Books
- Shopping Cart

Reasons:

- Lightweight
- Minimal boilerplate
- Excellent TypeScript support
- Easy persistence with AsyncStorage

## useMemo

Filtering is implemented with `useMemo`.

Instead of storing filtered books in state, the filtered list is derived from:

- books
- searchQuery

Benefits:

- No duplicated state
- Less chance of inconsistent data
- Better performance by avoiding unnecessary recalculations

## Expo Image

Images are rendered using:

```
expo-image
```

Benefits:

- Better caching
- Faster loading
- Smooth transitions
- Lower memory usage

## React Native Reanimated

Used for:

- Card entrance animations
- Press scaling effects

---

# Pagination

Pagination was implemented inside the mock service.

Each request returns:

```ts
{
  (data, page, totalPages, hasMore);
}
```

The Home screen requests additional pages as the user scrolls.

---

# Unit Testing

The project includes unit tests using:

- Jest
- React Native Testing Library

Example components tested:

- BookPrice
- AddToCartButton

Tests verify:

- Price formatting
- Rounded values
- Zero values
- Button press events

---

# Project Structure

```
app/
components/
mock/
services/
store/
types/
test/
```

---

# Getting Started

## Install dependencies

```bash
npm install
```

or

```bash
yarn
```

---

## Start Development Server

```bash
npx expo start
```

or for a Development Build

```bash
npx expo start --dev-client
```

---

## Run Android

```bash
npx expo run:android
```

---

## Run iOS

```bash
npx expo run:ios
```

---

# Running Tests

Install testing dependencies (if not already installed):

```bash
npm install --save-dev jest jest-expo @testing-library/react-native react-test-renderer
```

Run the tests:

```bash
npm test
```

# Technologies Used

- React Native
- Expo
- Expo Router
- TypeScript
- Zustand
- AsyncStorage
- Expo Image
- React Native Reanimated
- React Native Paper
- Jest
- React Native Testing Library
