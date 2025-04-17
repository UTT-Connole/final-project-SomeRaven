import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { useRouter } from "expo-router";
import { CategoryContext } from "../context/CategoryContext";
import ItemCard from "../components/ItemCard";

export default function Index() {
  const { items, categories } = useContext(CategoryContext);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4", paddingTop: 50 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.push("./stash/add-category")}>
          <Text style={{ fontSize: 30, color: "#333" }}>{'\u2630'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
          Stash Tracker
        </Text>
        <TouchableOpacity onPress={() => router.push("./stash/add-item")}>
          <Text style={{ fontSize: 30, color: "#333" }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => {
          const category = categories.find(c => c.id === item.categoryId);
          return (
            <ItemCard
              name={item.name}
              image={item.image}
              categoryName={category?.name || 'Unknown'}
              categoryColor={category?.color || '#ccc'}
            />
          );
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 18, color: "#666" }}>No items found</Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}
