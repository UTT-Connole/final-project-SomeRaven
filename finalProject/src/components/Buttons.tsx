import React from 'react';
import { View } from 'react-native';
import { Button, FAB } from 'react-native-paper';

interface SubmitButtonProps {
  label?: string;
  onPress: () => void;
}

export const SubmitButton = ({ label = "Save", onPress }: SubmitButtonProps) => (
  <Button mode="contained" onPress={onPress} style={{ marginTop: 20 }}>
    {label}
  </Button>
);

interface ImageButtonsProps {
  onPickImage: () => void;
  onTakePhoto: () => void;
}

export const ImagePickerButtons = ({ onPickImage, onTakePhoto }: ImageButtonsProps) => (
  <>
    <Button icon="image" mode="outlined" onPress={onPickImage} style={{ marginBottom: 10 }}>
      Choose from Gallery
    </Button>
    <Button icon="camera" mode="outlined" onPress={onTakePhoto} style={{ marginBottom: 15 }}>
      Take a Photo
    </Button>
  </>
);

interface FABStackProps {
  onAddItem: () => void;
  onAddCategory: () => void;
  labelItem?: string;
  colorItem?: string;
}

export const FABStack = ({ onAddItem, onAddCategory, labelItem = "Add", colorItem = "#ff6f61" }: FABStackProps) => (
  <View style={{ position: "absolute", bottom: 30, right: 20, alignItems: "flex-end" }}>
    <FAB
      icon="shape-outline"
      small
      label="Add Category"
      style={{ backgroundColor: "#9e9e9e", marginBottom: 10 }}
      onPress={onAddCategory}
      color="white"
    />
    <FAB
      icon="plus"
      label={labelItem}
      style={{ backgroundColor: colorItem }}
      onPress={onAddItem}
      color="white"
    />
  </View>
);