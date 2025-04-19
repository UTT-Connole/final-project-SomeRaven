import { useContext } from "react";
import { FlatList, View, TouchableOpacity, Image } from "react-native";
import { Text, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import { ProjectContext } from "../context/ProjectContext";
import { FABStack } from "../components/Buttons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sharedStyles from "../components/style";

export default function SecondScreen() {
  const router = useRouter();
  const { projects } = useContext(ProjectContext);

  const renderEmptyState = () => (
    <View style={sharedStyles.emptyContainer}>
      <Text variant="titleMedium" style={sharedStyles.emptyTitle}>
        No projects yet.
      </Text>
      <Text variant="bodyMedium" style={sharedStyles.emptySubtitle}>
        Tap ➕ to start your first project!
      </Text>
    </View>
  );

  const handleProjectPress = (item: any) => {
    router.push({
      pathname: '/stash/add-project',
      params: {
        id: item.id?.toString() ?? '',
        title: item.title ?? '',
        categoryId: item.categoryId ?? '',
        categoryColor: item.categoryColor ?? '',
        isGift: item.isGift?.toString() ?? 'false',
        dateStarted: item.dateStarted ?? '',
        supplies: item.supplies ?? '',
        status: item.status ?? 'Not Started',
        imageUri: item.imageUri ?? '',
      }
    });
  };

  return (
    <View style={sharedStyles.screenContainer}>
      <View style={sharedStyles.pageHeader}>
        <Text variant="headlineMedium" style={sharedStyles.titleText}>
          Project Tracker
        </Text>
        <Text variant="bodySmall" style={sharedStyles.subtitleText}>
          Track your in-progress and completed work.
        </Text>
      </View>

      <Divider style={sharedStyles.divider} />

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={sharedStyles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProjectPress(item)}>
            <View style={[sharedStyles.card, { borderColor: item.categoryColor || "#ccc" }]}>
              <Text
                variant="titleMedium"
                style={[sharedStyles.cardTitle, { color: item.categoryColor || "#333" }]}
              >
                {item.title}
              </Text>

              <Text>Status: {item.status}</Text>
              <Text>Started: {item.dateStarted}</Text>

              {item.supplies ? (
                <Text style={sharedStyles.cardMeta}>
                  Supplies: {item.supplies}
                </Text>
              ) : null}

              <View style={sharedStyles.giftRow}>
                <MaterialCommunityIcons
                  name={item.isGift ? "gift" : "gift-off"}
                  size={20}
                  color={item.isGift ? "#4CAF50" : "#F44336"}
                />
                <Text style={{ marginLeft: 5 }}>
                  {item.isGift ? "Gift" : "Not a gift"}
                </Text>
              </View>

              {item.imageUri ? (
                <Image
                  source={{ uri: item.imageUri }}
                  style={sharedStyles.imagePreview}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={renderEmptyState}
      />

      <FABStack
        onAddItem={() => router.push("/stash/add-project")}
        onAddCategory={() => router.push("/stash/add-category")}
        labelItem="Add Project"
        colorItem="#2196F3"
      />
    </View>
  );
}