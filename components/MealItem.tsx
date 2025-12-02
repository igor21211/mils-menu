import Meal from "@/utils/models/meal";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MealItemProps {
  meal: Meal;
}

const MealItem = ({ meal }: MealItemProps) => {
  const { title, imageUrl, affordability, complexity, duration } = meal;
  const navigation = useNavigation<NavigationProp>();
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

  return (
    <Pressable onPress={() => navigation.navigate('MealDetailed', { id: meal.id })} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.badge, { backgroundColor: getAffordabilityColor(affordability) }]}>
              {affordability}
            </Text>
            <Text style={[styles.badge, { backgroundColor: getComplexityColor(complexity) }]}>
              {complexity}
            </Text>
          </View>
          <Text style={styles.duration}>
            {duration}m
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    minHeight: 40,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  duration: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
});

export default MealItem;