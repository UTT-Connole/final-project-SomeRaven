import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CategoryContext } from '../../context/CategoryContext';

export const unstable_settings = {
  tabBarHidden: true, // hides this from the tab bar
};

export default function AddCategoryScreen() {
  const { addCategory } = useContext(CategoryContext);
  const router = useRouter();

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState('');

  const handleAddField = () => {
    if (newField.trim()) {
      setFields([...fields, newField.trim()]);
      setNewField('');
    }
  };

  const handleSubmit = () => {
    if (name && color) {
      addCategory(name, color, fields);
      setName('');
      setColor('');
      setFields([]);
      alert('Category added!');
      router.back();
    } else {
      alert('Please fill out name and color');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Category</Text>

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g., Crochet"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <Text>Color</Text>
      <TextInput
        value={color}
        onChangeText={setColor}
        placeholder="e.g., #ffcc00"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <Text>Add Custom Fields</Text>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TextInput
          value={newField}
          onChangeText={setNewField}
          placeholder="e.g., Yarn Type"
          style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 8 }}
        />
        <TouchableOpacity
          onPress={handleAddField}
          style={{
            marginLeft: 10,
            backgroundColor: '#ff6f61',
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {fields.map((field, index) => (
        <Text key={index} style={{ marginBottom: 5 }}>• {field}</Text>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Save Category" onPress={handleSubmit} />
        <View style={{ height: 10 }} />
        <Button title="Cancel" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
