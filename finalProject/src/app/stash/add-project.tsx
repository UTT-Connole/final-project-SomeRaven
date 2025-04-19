import { useState, useContext } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, TextInput, Switch, Menu } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProjectContext } from '../../context/ProjectContext';
import { CategoryContext } from '../../context/CategoryContext';
import { ImagePickerButtons, SubmitButton } from '../../components/Buttons';
import sharedStyles from '../../components/style';

export const unstable_settings = {
  tabBarHidden: true,
};

export default function AddProjectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addProject } = useContext(ProjectContext);
  const { categories } = useContext(CategoryContext);

  const [title, setTitle] = useState(params.title?.toString() ?? `Project - ${new Date().toLocaleDateString()}`);
  const [categoryId, setCategoryId] = useState(params.categoryId?.toString() ?? null);
  const [categoryColor, setCategoryColor] = useState(params.categoryColor?.toString() ?? '#ccc');
  const [isGift, setIsGift] = useState(params.isGift === 'true');
  const [dateStarted, setDateStarted] = useState(params.dateStarted?.toString() ?? new Date().toISOString().split('T')[0]);
  const [supplies, setSupplies] = useState(params.supplies?.toString() ?? '');
  const [imageUri, setImageUri] = useState<string | null>(params.imageUri?.toString() ?? null);
  const [status, setStatus] = useState(params.status?.toString() ?? 'Not Started');
  const [menuVisible, setMenuVisible] = useState(false);
  const [catMenuVisible, setCatMenuVisible] = useState(false);

  const selectedCategory = categories.find(cat => cat.id === categoryId);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
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
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !categoryId) {
      alert('Please enter a title and select a category.');
      return;
    }

    const project = {
      id: params.id?.toString() ?? Date.now().toString(),
      title,
      categoryId,
      categoryColor,
      isGift,
      status,
      dateStarted,
      supplies,
      imageUri,
    };

    addProject(project);
    alert('Project saved!');
    router.replace('/second');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 20, color: categoryColor }}>
        {params.id ? "Edit Project" : "Add New Project"}
      </Text>

      <TextInput
        label="Project Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 15 }}
      />

      <Text variant="labelLarge" style={{ marginBottom: 5 }}>Category</Text>
      <Menu
        visible={catMenuVisible}
        onDismiss={() => setCatMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 15,
            }}
            onPress={() => setCatMenuVisible(true)}
          >
            <Text>{selectedCategory?.name || "Select a Category"}</Text>
          </TouchableOpacity>
        }
      >
        {categories.map(cat => (
          <Menu.Item
            key={cat.id}
            onPress={() => {
              setCategoryId(cat.id);
              setCategoryColor(cat.color);
              setCatMenuVisible(false);
            }}
            title={cat.name}
          />
        ))}
      </Menu>

      <TextInput
        label="Date Started"
        value={dateStarted}
        onChangeText={setDateStarted}
        style={{ marginBottom: 15 }}
      />

      <Text variant="labelLarge" style={{ marginBottom: 5 }}>Status</Text>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={{
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              marginBottom: 15,
            }}
            onPress={() => setMenuVisible(true)}
          >
            <Text>{status}</Text>
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => { setStatus('Not Started'); setMenuVisible(false); }} title="Not Started" />
        <Menu.Item onPress={() => { setStatus('In Progress'); setMenuVisible(false); }} title="In Progress" />
        <Menu.Item onPress={() => { setStatus('Done'); setMenuVisible(false); }} title="Done" />
      </Menu>

      <TextInput
        label="Supplies"
        value={supplies}
        onChangeText={setSupplies}
        multiline
        numberOfLines={4}
        style={{ marginBottom: 15 }}
      />

      <ImagePickerButtons onPickImage={handlePickImage} onTakePhoto={handleTakePhoto} />

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={sharedStyles.imagePreview}
          resizeMode="cover"
        />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ marginRight: 10 }}>Is this a gift?</Text>
        <Switch value={isGift} onValueChange={setIsGift} />
      </View>

      <SubmitButton label="Save Project" onPress={handleSubmit} />
    </ScrollView>
  );
}