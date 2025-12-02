import { CATEGORIES } from "@/utils/dummy-data";
import { FlatList, StyleSheet } from "react-native";
import CategoriesItem from "./CategoriesItem";

const CategoriesScreen = () => {
  return (
    <FlatList
      data={CATEGORIES}
      style={styles.container}
      renderItem={({ item }) => <CategoriesItem id={item.id} title={item.title} color={item.color} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CategoriesScreen;