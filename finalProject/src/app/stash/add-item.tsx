import { useContext, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { CategoryContext } from '../../context/CategoryContext';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  // Completely opt out of being part of the tab bar
  initialRouteName: 'index',
  tabBarHidden: true,
};

export default function AddItemScreen() {
    
  const { categories, addItem } = useContext(CategoryContext);
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (field: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!name || !categoryId) {
      alert('Please select a category and give the item a name.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      image,
      categoryId,
      ...fieldValues,
    };

    addItem(newItem);
    alert('Item added!');
    router.back();
  };

  const selectedCategory = categories.find(cat => cat.id === categoryId);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Item</Text>

      <Text>Item Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g., Red Yarn"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <Text>Image URL</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="https://..."
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <Text>Category</Text>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => setCategoryId(cat.id)}
          style={{
            padding: 10,
            marginVertical: 5,
            borderWidth: 1,
            borderColor: categoryId === cat.id ? '#ff6f61' : '#ccc',
            borderRadius: 8,
          }}
        >
          <Text>{cat.name}</Text>
        </TouchableOpacity>
      ))}

      {selectedCategory && selectedCategory.fields.length > 0 && (
        <>
          <Text style={{ marginTop: 20 }}>Custom Fields</Text>
          {selectedCategory.fields.map(field => (
            <View key={field} style={{ marginBottom: 10 }}>
              <Text>{field}</Text>
              <TextInput
                value={fieldValues[field] || ''}
                onChangeText={value => handleFieldChange(field, value)}
                style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
              />
            </View>
          ))}
        </>
      )}

      <Button title="Save Item" onPress={handleSubmit} />
    </ScrollView>
  );
}
