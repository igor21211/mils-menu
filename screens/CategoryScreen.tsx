import MealItem from '@/components/MealItem';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { CATEGORIES, MEALS } from '@/utils/dummy-data';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  const { id } = route.params;
  
  const category = CATEGORIES.find(cat => cat.id === id);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Category not found</Text>
      </View>
    );
  }

  // Фильтруем блюда по категории - проверяем, содержит ли массив categoryIds выбранный id
  const displayedMeals = MEALS.filter(meal => {
    // Проверяем, что categoryIds существует и является массивом, и содержит выбранный id
    return Array.isArray(meal.categoryIds) && meal.categoryIds.includes(id);
  });

  // Если блюд нет, показываем сообщение
  if (displayedMeals.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: category.color }]}>
        <Text style={styles.emptyText}>Блюда в этой категории не найдены</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: category.color }]}>
      <FlatList
        data={displayedMeals}
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
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default CategoryScreen;

