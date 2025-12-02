import { FlatList, StyleSheet, Text, View } from 'react-native';
// import { FavoritesContext } from '@/store/context/favorite-context'; // ЗАКОММЕНТИРОВАНО - используем Redux
// import { useContext } from 'react';
import MealItem from '@/components/MealItem';
import Meal from '@/utils/models/meal';
import { MEALS } from '@/utils/dummy-data';
import { useAppSelector } from '@/redux/hooks';

const FavoriteScreen = () => {
  // Redux hook вместо Context API
  const favorites = useAppSelector((state) => state.favorites.favorites);
  
  const favoriteMeals = MEALS.filter((meal: Meal) => favorites.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>У вас пока нет избранных блюд</Text>
        <Text style={styles.emptySubText}>Добавьте блюда в избранное, нажав на ❤️</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMeals}
        renderItem={({ item }) => <MealItem meal={item} />}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
export default FavoriteScreen;