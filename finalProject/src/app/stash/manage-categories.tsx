import { useContext } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, IconButton, Divider } from 'react-native-paper';
import { CategoryContext } from '../../context/CategoryContext';
import { useRouter } from 'expo-router';

export default function ManageCategories() {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const router = useRouter();

  const handleEdit = (category) => {
    router.push({
      pathname: '/stash/add-category',
      params: {
        id: category.id,
        name: category.name,
        color: category.color,
        fields: JSON.stringify(category.fields),
      }
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Category?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteCategory(id) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        Manage Categories
      </Text>

      {categories.map((cat) => (
        <View
          key={cat.id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            borderLeftWidth: 5,
            borderColor: cat.color || "#ccc",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
            {cat.name}
          </Text>
          <Text style={{ color: "#666", marginBottom: 5 }}>
            Fields: {cat.fields.join(", ") || "None"}
          </Text>

          <Divider style={{ marginVertical: 10 }} />

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <IconButton icon="pencil" onPress={() => handleEdit(cat)} />
            <IconButton icon="delete" onPress={() => handleDelete(cat.id)} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
