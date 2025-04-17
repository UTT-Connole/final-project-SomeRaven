import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CategoryProvider } from '../context/CategoryContext';

export default function Layout() {
  return (
    <CategoryProvider>
      <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'index') {
            iconName = 'bag';
          } else if (route.name === 'second') {
            iconName = 'folder';
          } else {
            iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6f61',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Stash' }} />
      <Tabs.Screen name="second" options={{ title: 'Projects' }} />
      <Tabs.Screen name="stash/add-item" options={{ href: null }} />
      <Tabs.Screen name="stash/add-category" options={{ href: null }} />

    </Tabs>
    </CategoryProvider>
  );
}
