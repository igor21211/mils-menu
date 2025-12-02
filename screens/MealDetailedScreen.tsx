import { RootStackParamList } from "@/navigation/AppNavigator";
import { MEALS } from "@/utils/dummy-data";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
// import { FavoritesContext } from "@/store/context/favorite-context"; // ЗАКОММЕНТИРОВАНО - используем Redux
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addFavorite, removeFavorite } from "@/redux/slices/favoritesSlice";

type MealDetailedScreenRouteProp = RouteProp<RootStackParamList, 'MealDetailed'>;
type MealDetailedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MealDetailed'>;

const MealDetailedScreen = () => {
  const route = useRoute<MealDetailedScreenRouteProp>();
  const navigation = useNavigation<MealDetailedScreenNavigationProp>();
  const { id } = route.params;
  
  // Redux hooks вместо Context API
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.includes(id);
  
  const meal = MEALS.find(m => m.id === id);

  useLayoutEffect(() => {
    const handleToggleFavorite = () => {
      if (isFavorite) {
        dispatch(removeFavorite(id));
      } else {
        dispatch(addFavorite(id));
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <Pressable 
          onPress={handleToggleFavorite}
          style={{ marginRight: 15 }}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            color="white" 
            size={24} 
          />
        </Pressable>
      ),
    });
  }, [navigation, isFavorite, id, dispatch]);

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Блюдо не найдено</Text>
      </View>
    );
  }

  const { 
    title, 
    imageUrl, 
    affordability, 
    complexity, 
    duration, 
    ingredients, 
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  } = meal;

  const getAffordabilityColor = (affordability: string) => {
    switch (affordability.toLowerCase()) {
      case 'affordable':
        return '#4CAF50';
      case 'pricey':
        return '#FF9800';
      case 'luxurious':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'simple':
        return '#2196F3';
      case 'challenging':
        return '#F44336';
      case 'hard':
        return '#E91E63';
      default:
        return '#757575';
    }
  };

  const dietaryInfo = [];
  if (isGlutenFree) dietaryInfo.push('Без глютена');
  if (isVegan) dietaryInfo.push('Веган');
  if (isVegetarian) dietaryInfo.push('Вегетарианское');
  if (isLactoseFree) dietaryInfo.push('Без лактозы');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: getAffordabilityColor(affordability) }]}>
            <Text style={styles.badgeText}>{affordability}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getComplexityColor(complexity) }]}>
            <Text style={styles.badgeText}>{complexity}</Text>
          </View>
          <View style={[styles.badge, styles.durationBadge]}>
            <Text style={styles.badgeText}>{duration} мин</Text>
          </View>
        </View>

        {dietaryInfo.length > 0 && (
          <View style={styles.dietaryContainer}>
            <Text style={styles.sectionTitle}>Диетические особенности:</Text>
            <View style={styles.dietaryBadges}>
              {dietaryInfo.map((info, index) => (
                <View key={index} style={styles.dietaryBadge}>
                  <Text style={styles.dietaryBadgeText}>{info}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ингредиенты:</Text>
          <View style={styles.listContainer}>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listItemText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Как приготовить:</Text>
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
    }),
  },
  durationBadge: {
    backgroundColor: '#607D8B',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dietaryContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  dietaryBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  dietaryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
  },
  dietaryBadgeText: {
    color: '#424242',
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3D9696',
    marginTop: 6,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  stepsContainer: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3D9696',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MealDetailedScreen;