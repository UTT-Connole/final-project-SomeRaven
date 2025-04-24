// Updated screen: app/categories.tsx — now styled like Projects/Stash
import { useContext } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CategoryContext } from '../context/CategoryContext';
import sharedStyles from '../components/style';
import { FAB } from 'react-native-paper';


export default function CategoriesScreen() {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const router = useRouter();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Category?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCategory(id) },
    ]);
  };

  const renderEmptyState = () => (
    <View style={sharedStyles.emptyContainer}>
      <Text variant="titleMedium" style={sharedStyles.emptyTitle}>
        No categories yet.
      </Text>
      <Text variant="bodyMedium" style={sharedStyles.emptySubtitle}>
        Tap ➕ to add your first category!
      </Text>
    </View>
  );

  return (
    <View style={sharedStyles.screenContainer}>
      <View style={sharedStyles.pageHeader}>
        <Text variant="headlineMedium" style={sharedStyles.titleText}>
          Categories
        </Text>
        <Text variant="bodySmall" style={sharedStyles.subtitleText}>
          Organize your stash by creating custom category types.
        </Text>
      </View>

      <Divider style={sharedStyles.divider} />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={sharedStyles.listContent}
        renderItem={({ item }) => (
          <View
            style={[sharedStyles.card, { borderColor: item.color || '#ccc' }]}
          >
            <Text
              variant="titleMedium"
              style={[sharedStyles.cardTitle, { color: item.color || '#333' }]}
            >
              {item.name}
            </Text>

            <Text style={sharedStyles.cardMeta}>
              Fields: {item.fields.length > 0 ? item.fields.join(', ') : 'No custom fields'}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <IconButton
                icon="pencil"
                onPress={() =>
                  router.push({
                    pathname: '/stash/add-category',
                    params: {
                      id: item.id,
                      name: item.name,
                      color: item.color,
                      fields: JSON.stringify(item.fields),
                    },
                  })
                }
              />
              <IconButton
                icon="delete"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={renderEmptyState}
      />
      <FAB
        icon="plus"
        label="Add Category"
        onPress={() =>
            router.push({
            pathname: '/stash/add-category',
            params: { _reset: Date.now().toString() }
            })
        }
        style={{
            position: 'absolute',
            right: 20,
            bottom: 30,
            backgroundColor: '#607d8b',
        }}
        color="white"
        />

    </View>
  );
}