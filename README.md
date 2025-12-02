# 🍝 Mils Menu - React Native Food App

<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
</div>

## 📱 About the Project

**Mils Menu** is a modern mobile application for browsing food recipes, built with React Native and Expo. The app demonstrates best development practices, including navigation, state management with Redux Toolkit, and beautiful UI/UX design.

## ✨ Key Features

- 🍽️ **Recipe Catalog** - Browse dishes by categories (Italian, Quick & Easy, Hamburgers, German, etc.)
- ❤️ **Favorites** - Add and remove dishes to favorites using Redux
- 📖 **Detailed Information** - Complete dish description with ingredients and cooking steps
- 🎨 **Beautiful UI** - Modern design with animations and gradients
- 🔍 **Filters** - Dietary features (Vegan, Vegetarian, Lactose-free, Gluten-free)
- 🎯 **Navigation** - Drawer Navigation and Stack Navigation
- 🌙 **Responsive Design** - iOS and Android support

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/categories.png" width="250" alt="Categories" />
  <img src="./screenshots/meal-list.png" width="250" alt="Meal List" />
  <img src="./screenshots/meal-detail.png" width="250" alt="Meal Details" />
</div>

### Home Screen - Categories
Colorful category cards with intuitive navigation

### Meal List
Elegant display of dishes with photos, difficulty badges, and cooking time

### Meal Details
Complete meal information: photo, ingredients, cooking steps, dietary features

## 🛠️ Tech Stack

### Core
- **React Native** - Cross-platform development
- **Expo** - Tools for rapid development
- **TypeScript** - Type safety

### Navigation
- **React Navigation v7** - Screen navigation
- **Stack Navigator** - Stack-based navigation
- **Drawer Navigator** - Side menu

### State Management
- **Redux Toolkit** - Modern state management
- **React Redux** - Redux integration with React

### UI/UX
- **React Native Gesture Handler** - Gestures and animations
- **React Native Reanimated** - Smooth animations
- **Expo Vector Icons** - Icons

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mils-menu.git
   cd mils-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npx expo start
   ```

4. **Choose platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code in Expo Go on physical device

## 📁 Project Structure

```
mils-menu/
├── app/                          # Application entry point
├── components/                   # Reusable components
│   ├── CategoriesItem.tsx       # Category card
│   ├── CategoriesScreen.tsx     # Categories list
│   └── MealItem.tsx             # Meal card
├── navigation/                   # Navigation configuration
│   └── AppNavigator.tsx         # Main navigator
├── redux/                        # Redux state
│   ├── slices/
│   │   └── favoritesSlice.ts    # Favorites slice
│   ├── store/
│   │   └── store.ts             # Store configuration
│   └── hooks.ts                 # Typed hooks
├── screens/                      # Application screens
│   ├── HomeScreen.tsx           # Home screen
│   ├── CategoryScreen.tsx       # Category screen
│   ├── MealDetailedScreen.tsx   # Meal details
│   └── FavoriteScreen.tsx       # Favorites
├── store/                        # (Commented) Context API
│   └── context/
│       └── favorite-context.tsx # Old Context implementation
├── utils/                        # Utilities and data
│   ├── dummy-data.ts            # Mock data
│   └── models/
│       ├── category.ts          # Category model
│       └── meal.ts              # Meal model
└── assets/                       # Images and resources
```

## 🎓 Educational Value

This project demonstrates:

### 1. **Migration from Context API to Redux Toolkit**
The project contains a commented Context API implementation, allowing comparison of two approaches:
- Context API (simple, built-in)
- Redux Toolkit (powerful, scalable)

### 2. **Modern React Native Patterns**
- Functional components with hooks
- TypeScript for type safety
- Styled components
- Custom hooks

### 3. **Navigation**
- Stack Navigation for hierarchical navigation
- Drawer Navigation for side menu
- Dynamic headers and buttons

### 4. **Redux Best Practices**
- Slices for modular organization
- Typed hooks
- Immutable updates with Immer
- Redux DevTools integration

## 🔧 Core Components

### Redux Store
```typescript
// redux/store/store.ts
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
```

### Favorites Slice
```typescript
// redux/slices/favoritesSlice.ts
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { favorites: [] },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
});
```

### Usage in Components
```typescript
// Get state
const favorites = useAppSelector((state) => state.favorites.favorites);

// Dispatch actions
const dispatch = useAppDispatch();
dispatch(addFavorite(mealId));
```

## 📝 Main Features

### ❤️ Favorites
- Add/remove dishes to favorites
- Persistent storage via Redux
- Visual indication (filled/outline heart icon)
- Dedicated screen for viewing favorites

### 🍽️ Categories
- 8 meal categories
- Color coding
- Meal count per category
- Smooth transitions

### 📖 Meal Details
- High-quality meal photo
- Badges: affordability, complexity, duration
- Dietary features
- Ingredients list
- Step-by-step instructions
- Add to favorites button

## 🎨 UI/UX Features

- **Color Scheme**: Teal (#3D9696) as primary color
- **Typography**: Clear text hierarchy
- **Cards**: Rounded corners, shadows, elevation
- **Animations**: Smooth transitions and feedback
- **Icons**: Ionicons for consistency
- **Responsiveness**: Works on different screen sizes

## 🔜 Future Plans

- [ ] Search meals
- [ ] Filter by dietary features
- [ ] Save favorites to AsyncStorage
- [ ] Add custom recipes
- [ ] Cooking timer
- [ ] Shopping list
- [ ] Dark theme
- [ ] Localization (EN, RU, UA)
- [ ] Recipe API integration
- [ ] Social features (sharing)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project was created for educational purposes.

## 👨‍💻 Author

**Igor Spura**

- GitHub: [@igorspura](https://github.com/igorspura)

## 🙏 Acknowledgments

- [Expo](https://expo.dev) - for excellent development tools
- [React Navigation](https://reactnavigation.org) - for powerful navigation
- [Redux Toolkit](https://redux-toolkit.js.org) - for simplifying Redux
- [React Native](https://reactnative.dev) - for cross-platform development

---

<div align="center">
  Made with ❤️ and ☕
</div>
