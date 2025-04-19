import { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Tabs } from 'expo-router';
import { CategoryProvider } from '../context/CategoryContext';
import { Text } from 'react-native';
import { ProjectProvider } from '../context/ProjectContext';
import { ItemProvider } from "../context/ItemsContext";


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await Font.loadAsync({
        MaterialCommunityIcons: require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    load();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <PaperProvider>
      <CategoryProvider>
      <ItemProvider>
        <ProjectProvider>
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

              return (
                <Text style={{ fontSize: size, color }}>
                  {iconName === 'bag' ? '👜' : iconName === 'folder' ? '📁' : '⭕'}
                </Text>
              );
            },
            tabBarActiveTintColor: '#ff6f61',
            tabBarInactiveTintColor: '#888',
          })}
        >
          <Tabs.Screen name="index" options={{ title: 'Stash' }} />
          <Tabs.Screen name="second" options={{ title: 'Projects' }} />
          <Tabs.Screen name="stash/add-item" options={{ href: null }} />
          <Tabs.Screen name="stash/add-category" options={{ href: null }} />
          <Tabs.Screen name="stash/add-project" options={{ href: null }} />
        </Tabs>
        </ProjectProvider>
        </ItemProvider>
        </CategoryProvider>
    </PaperProvider>
  );
}
