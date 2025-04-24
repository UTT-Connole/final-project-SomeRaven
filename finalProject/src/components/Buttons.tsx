import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, FAB, Menu } from 'react-native-paper';

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
  labelItem?: string;
  colorItem?: string;
}

export const FABStack = ({
  onAddItem,
  labelItem = "Add",
  colorItem = "#ff6f61",
}: FABStackProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={{ position: "absolute", bottom: 30, right: 20, alignItems: "flex-end" }}>
      <FAB
        icon="plus"
        label={labelItem}
        style={{ backgroundColor: colorItem }}
        onPress={onAddItem}
        color="white"
      />
    </View>
  );
};
