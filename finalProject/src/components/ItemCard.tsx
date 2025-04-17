import { View, Text, TouchableOpacity, Image } from 'react-native';

interface ItemCardProps {
  name: string;
  image: string;
  categoryName: string;
  categoryColor: string;
}

export default function ItemCard({
  name,
  image,
  categoryName,
  categoryColor,
}: ItemCardProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderLeftWidth: 6,
        borderColor: categoryColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 10 }}>
        {name}
      </Text>
      <Text style={{ fontSize: 14, color: "#666" }}>{categoryName}</Text>
    </TouchableOpacity>
  );
}
