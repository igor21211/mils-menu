import { RootStackParamList } from '@/navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const CategoriesItem = ({ id, title, color }: { id: string, title: string, color: string }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    // Программная навигация через React Navigation
    navigation.navigate('Category', { id });
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container, 
        { backgroundColor: color }, 
        pressed && { opacity: 0.5 }
      ]} 
      onPress={handlePress}
      android_ripple={{ color: '#ccc' }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '45%',
    margin: 16,
    marginHorizontal: 'auto',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoriesItem;