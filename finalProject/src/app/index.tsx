import { FlatList, View } from "react-native";
import { useContext } from "react";
import { useRouter } from "expo-router";
import { Text, Divider } from "react-native-paper";
import { CategoryContext } from "../context/CategoryContext";
import { ItemContext } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";
import { FABStack } from "../components/Buttons";
import sharedStyles from "../components/style";

export default function Index() {
  const { categories } = useContext(CategoryContext);
  const { items } = useContext(ItemContext);
  const router = useRouter();

  const renderEmptyState = () => (
    <View style={sharedStyles.emptyContainer}>
      <Text variant="titleMedium" style={sharedStyles.emptyTitle}>
        You don't have any stash items yet.
      </Text>
      <Text variant="bodyMedium" style={sharedStyles.emptySubtitle}>
        Tap the ➕ button to add your first project or supply!
      </Text>
    </View>
  );

  const handleItemPress = (item: any) => {
    router.push({
      pathname: '/stash/add-item',
      params: {
        id: item.id?.toString() ?? '',
        name: item.name ?? '',
        image: item.image ?? '',
        categoryId: item.categoryId ?? '',
        ...Object.fromEntries(
          Object.entries(item).filter(
            ([key]) => !['id', 'name', 'image', 'categoryId'].includes(key)
          )
        )
      }
    });
  };

  return (
    <View style={sharedStyles.screenContainer}>
      <View style={sharedStyles.pageHeader}>
        <Text variant="headlineMedium" style={sharedStyles.titleText}>
          My Stash
        </Text>
        <Text variant="bodySmall" style={sharedStyles.subtitleText}>
          Everything you’re working with — in one place.
        </Text>
      </View>

      <Divider style={sharedStyles.divider} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        contentContainerStyle={sharedStyles.listContent}
        renderItem={({ item }) => {
          const category = categories.find((c) => c.id === item.categoryId);
          return (
            <ItemCard
              name={item.name}
              image={item.image}
              categoryName={category?.name || 'Unknown'}
              categoryColor={category?.color || '#ccc'}
              onPress={() => handleItemPress(item)}
            />
          );
        }}
        ListEmptyComponent={renderEmptyState}
      />

      <FABStack
        onAddItem={() => router.push("/stash/add-item")}
        onAddCategory={() => router.push("/stash/add-category")}
        labelItem="Add Item"
        colorItem="#ff6f61"
      />
    </View>
  );
}