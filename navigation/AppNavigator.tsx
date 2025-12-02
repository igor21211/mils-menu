import FavoriteScreen from '@/screens/FavoriteScreen';
import MealDetailedScreen from '@/screens/MealDetailedScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoryScreen from '../screens/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import { CATEGORIES, MEALS } from '../utils/dummy-data';
import { Ionicons } from '@expo/vector-icons';
// import FavoriteContextProvider from '@/store/context/favorite-context'; // ЗАКОММЕНТИРОВАНО - используем Redux
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';
    
export type RootStackParamList = {
  Main: undefined;
  Category: { id: string };
  Categories: undefined;
  MealDetailed: { id: string };
  Favorite: undefined;
};

type DrawerParamList = {
  Home: undefined;
  Favorite: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Категории',
          headerStyle: { backgroundColor: '#3D9696' },
          headerTintColor: '#fff',
          drawerContentStyle: { backgroundColor: '#3D9696' },
          drawerActiveBackgroundColor: '#d9d9d9',
          drawerActiveTintColor: '#dd2c00',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),  
        }}
      />
      <Drawer.Screen 
        name="Favorite" 
        component={FavoriteScreen}
        options={{
          title: 'Избранное',
          headerStyle: { backgroundColor: '#3D9696' },
          sceneStyle: { backgroundColor: '#3D9696' }, 
          drawerContentStyle: { backgroundColor: '#3D9696' },
          drawerActiveBackgroundColor: '#d9d9d9',
          drawerActiveTintColor: '#dd2c00',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
          headerTintColor: '#fff',
        }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigatorContent = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => {
          const category = CATEGORIES.find(cat => cat.id === route.params.id);
          return {
            title: category?.title || 'Категория',
            headerShown: true,
            headerStyle: { backgroundColor: category?.color || '#fff' },
            headerTintColor: '#fff',
          };
        }}
      />
      <Stack.Screen 
        name="MealDetailed" 
        component={MealDetailedScreen}
        options={({ route }) => {
          const meal = MEALS.find(meal => meal.id === route.params.id);
          return {
            title: meal?.title || 'Детали блюда',
            headerShown: true,
            headerStyle: { backgroundColor: '#3D9696' },
            headerTintColor: '#fff',
          };
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigatorContent />
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigator;

