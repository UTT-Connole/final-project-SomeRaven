import { useState, useContext, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { CategoryContext } from '../../context/CategoryContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SubmitButton } from '../../components/Buttons';
import sharedStyles from '../../components/style';
import { ColorWheel } from 'react-native-color-wheel';
import tinycolor from 'tinycolor2';

export const unstable_settings = {
  tabBarHidden: true,
};

export default function AddCategoryScreen() {
  const { addCategory, updateCategory } = useContext(CategoryContext);
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditing = Boolean(params.id);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState('');

  useEffect(() => {
    if (isEditing) {
      setName(params.name?.toString() ?? '');
      setColor(params.color?.toString() ?? '');
      setFields(params.fields ? JSON.parse(params.fields.toString()) : []);
    } else {
      setName('');
      setColor('');
      setFields([]);
    }
    setNewField('');
  }, [params.id]); // ✅ only re-run if the ID changes
  

  const handleAddField = () => {
    if (newField.trim()) {
      setFields([...fields, newField.trim()]);
      setNewField('');
    }
  };

  const handleSubmit = () => {
    if (!name || !color) {
      alert('Please fill out name and color');
      return;
    }

    if (isEditing) {
      updateCategory({
        id: params.id!.toString(),
        name,
        color,
        fields,
      });
      alert('Category updated!');
    } else {
      addCategory(name, color, fields);
      alert('Category added!');
    }

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        {isEditing ? 'Edit Category' : 'Add New Category'}
      </Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="e.g., Crochet"
        style={{ marginBottom: 15 }}
      />

      <Text variant="labelLarge" style={{ marginBottom: 10 }}>Pick a Color</Text>
      <ColorWheel
        initialColor={color || '#ff6f61'}
        onColorChangeComplete={(hsv) => {
          const hex = tinycolor(hsv).toHexString();
          setColor(hex);
        }}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />

      <TextInput
        label="Color (Hex)"
        value={color}
        onChangeText={setColor}
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
