import { useState, useContext } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { CategoryContext } from '../../context/CategoryContext';
import { useRouter } from 'expo-router';
import { SubmitButton } from '../../components/Buttons';
import sharedStyles from '../../components/styles';

export const unstable_settings = {
  tabBarHidden: true,
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
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>Add New Category</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="e.g., Crochet"
        style={{ marginBottom: 15 }}
      />

      <TextInput
        label="Color"
        value={color}
        onChangeText={setColor}
        placeholder="e.g., #ffcc00"
        style={{ marginBottom: 15 }}
      />

      <Text variant="labelLarge">Custom Fields</Text>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <TextInput
          value={newField}
          onChangeText={setNewField}
          placeholder="e.g., Yarn Type"
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            borderColor: '#ccc',
          }}
        />
        <TouchableOpacity
          onPress={handleAddField}
          style={{
            marginLeft: 10,
            backgroundColor: '#ff6f61',
            padding: 10,
            borderRadius: 8,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      </View>

      {fields.map((field, index) => (
        <Text key={index} style={{ marginBottom: 5 }}>• {field}</Text>
      ))}

      <SubmitButton label="Save Category" onPress={handleSubmit} />
    </ScrollView>
  );
}