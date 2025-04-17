import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";

export default function SecondScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4", paddingTop: 50 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 30, color: "#333" }}>{/* Unicode for hamburger icon */}
        </Text>
        
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#333" }}>Project Tracker</Text>
        
        <Text style={{ fontSize: 30, color: "#333" }}>
          {'+'}
        </Text>
      </View>

      {/* Project List */}
      <FlatList
        data={[
          { 
            key: 'Project 1', 
            category: 'Sewing Project', 
            image: 'https://via.placeholder.com/50', 
            status: 'In Progress', 
            dateStarted: '2025-01-01', 
            isGift: true 
          },
          { 
            key: 'Project 2', 
            category: 'Crochet Project', 
            image: 'https://via.placeholder.com/50', 
            status: 'Completed', 
            dateStarted: '2025-02-15', 
            isGift: false 
          },
          { 
            key: 'Project 3', 
            category: 'Cricut Project', 
            image: 'https://via.placeholder.com/50', 
            status: 'Not Started', 
            dateStarted: '2025-03-10', 
            isGift: true 
          }
        ]}
        renderItem={({ item }) => (
          <View 
            style={{ 
              marginHorizontal: 20,
              marginBottom: 15,
              backgroundColor: "#fff", 
              borderRadius: 10, 
              padding: 15,
              shadowColor: '#000', 
              shadowOpacity: 0.1, 
              shadowRadius: 8, 
              elevation: 5 
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Project Image */}
              <Image 
                source={{ uri: item.image }} 
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 15 }} 
              />
              {/* Project Details */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: "#333" }}>{item.category}</Text>
                <Text style={{ fontSize: 14, color: "#777" }}>Status: {item.status}</Text>
                <Text style={{ fontSize: 14, color: "#777" }}>Date Started: {item.dateStarted}</Text>
                <Text style={{ fontSize: 14, color: item.isGift ? "#4CAF50" : "#F44336" }}>
                  {item.isGift ? 'Gift ✔️' : 'Not a Gift ❌'}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
