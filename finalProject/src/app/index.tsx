import { FlatList, View } from "react-native";
import { useContext, useState } from "react";
import { useRouter } from "expo-router";
import { Text, Divider, TextInput } from "react-native-paper";
import { CategoryContext } from "../context/CategoryContext";
import { ItemContext } from "../context/ItemsContext";
import ItemCard from "../components/ItemCard";
import { FABStack } from "../components/Buttons";
import sharedStyles from "../components/style";


export default function Index() {
  const { categories } = useContext(CategoryContext);
  const { items } = useContext(ItemContext);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');


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
        <TextInput
          mode="outlined"
          label="Search Stash"
          placeholder="e.g., yarn, buttons, mittens..."
          value={searchText}
          onChangeText={setSearchText}
          style={{
            borderRadius: 12,
            backgroundColor: '#fafafa',
            fontSize: 16,
            marginLeft: 16,
            marginRight: 16,
            marginBottom: 16,
          }}
          theme={{
            colors: {
              primary: '#ff6f61',
              outline: '#ddd',
            },
          }}
          left={<TextInput.Icon icon="magnify" />}
          underlineColor="transparent"
        />

      <FlatList
        data={items.filter(item =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )}
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
        onAddItem={() => router.push({
          pathname: "/stash/add-item",
          params: { _reset: Date.now().toString() } // force uniqueness
        })
        }
        labelItem="Add Item"
        colorItem="#ff6f61"
      />

    </View>
  );
}