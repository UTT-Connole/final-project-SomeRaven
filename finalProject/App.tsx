import { Slot } from 'expo-router';
import { CategoryProvider } from './src/context/CategoryContext';

export default function App() {
  return (
    <CategoryProvider>
      <Slot />
    </CategoryProvider>
  );
}
