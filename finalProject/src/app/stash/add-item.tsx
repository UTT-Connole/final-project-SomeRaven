import { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, TextInput, Menu } from 'react-native-paper';
import { CategoryContext } from '../../context/CategoryContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerButtons, SubmitButton } from '../../components/Buttons';
import { ItemContext } from '../../context/ItemsContext';
import sharedStyles from '../../components/style';

export const unstable_settings = {
  tabBarHidden: true,
};

export default function AddItemScreen() {
  const { categories } = useContext(CategoryContext);
  const { addItem } = useContext(ItemContext);
  const router = useRouter();
  const params = useLocalSearchParams();

  const isEditing = Boolean(params.id);

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setName(params.name?.toString() ?? '');
      setImage(params.image?.toString() ?? '');
      setCategoryId(params.categoryId?.toString() ?? null);

      const knownKeys = ['id', 'name', 'image', 'categoryId'];
      const newFields: { [key: string]: string } = {};
      Object.entries(params).forEach(([key, value]) => {
        if (!knownKeys.includes(key)) {
          newFields[key] = value?.toString() ?? '';
        }
      });
      setFieldValues(newFields);
    } else {
      setName('');
      setImage('');
      setCategoryId(null);
      setFieldValues({});
    }
  }, [params.id]);

  const handleFieldChange = (field: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [field]: value }));
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access the camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !categoryId) {
      alert('Please select a category and give the item a name.');
      return;
    }

    const newItem = {
      id: params.id?.toString() ?? Date.now().toString(),
      name,
      image,
      categoryId,
      ...fieldValues,
    };

    console.log('[SUBMIT ITEM]', newItem);
    addItem(newItem);
    alert('Item saved!');
    router.back();
  };

  const selectedCategory = categories.find(cat => cat.id === categoryId);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        {isEditing ? "Edit Item" : "Add New Item"}
      </Text>

      <TextInput
        label="Item Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 15 }}
      />

      <ImagePickerButtons onPickImage={handlePickImage} onTakePhoto={handleTakePhoto} />

      {image ? (
        <Image
          source={{ uri: image }}
          style={sharedStyles.imagePreview}
          resizeMode="cover"
        />
      ) : null}

      <Text variant="labelLarge" style={{ marginBottom: 5 }}>Category</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Text
            onPress={() => {
              if (categories.length === 0) router.push("/stash/add-category");
              else setMenuVisible(true);
            }}
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 15,
              color: categories.length === 0 ? 'red' : '#000',
            }}
          >
            {categories.length === 0 ? "No categories yet – Tap to add one" : selectedCategory?.name || "Select a Category"}
          </Text>
        }
      >
        {categories.map(cat => (
          <Menu.Item
            key={cat.id}
            onPress={() => {
              setCategoryId(cat.id);
              setMenuVisible(false);
            }}
            title={cat.name}
          />
        ))}
      </Menu>

      {selectedCategory && selectedCategory.fields.length > 0 && (
        <>
          <Text variant="labelLarge" style={{ marginTop: 20 }}>Custom Fields</Text>
          {selectedCategory.fields.map(field => (
            <TextInput
              key={field}
              label={field}
              value={fieldValues[field] || ''}
              onChangeText={(value) => handleFieldChange(field, value)}
              style={{ marginBottom: 10 }}
            />
          ))}
        </>
      )}

      <SubmitButton label="Save Item" onPress={handleSubmit} />
    </ScrollView>
  );
}
