[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/aMYdDS3S)

# 📦 Stash + Project Tracker

This React Native + Expo app helps users organize crafting supplies and track their creative projects. It’s designed to combine the simplicity of physical journaling with the flexibility of a mobile experience.

---

## ✨ Features

- 🗂️ Create custom categories with custom fields (e.g., Yarn Type, Material, Hook Size)
- 🧶 Add stash items with images (gallery or camera)
- 📋 Track projects with auto-generated titles, supply notes, and status (not started, in progress, done)
- 🎁 Gift toggle to mark if a project is for someone
- ✏️ Edit or update existing items/projects
- 💅 Material Design styling for a clean and professional look
- 📥 Local device image access and photo support

---

## 🖼️ Wireframes

<!-- Add image links below, like: -->
- [Wireframe 1](Android-final-wireframes-4.jpg) 
- [Wireframe 2](Android-final-wireframes-5.jpg)
- [Wireframe 3](Android-final-wireframes-6.jpg)

---

## 🎨 Material Design Implementation

The app uses `react-native-paper` to apply Material Design principles:

- **UI components**: Inputs, buttons, FABs, menus, and toggles are all implemented using material components
- **Visual hierarchy**: Typography styles and card elevation guide the user naturally through each screen
- **Color and feedback**: Each category gets a unique accent color, and tap/hover feedback is consistent and accessible
- **FAB placement**: Primary actions (e.g., add item/project) are consistently positioned and visually emphasized
- **Layout**: Forms, lists, and menus follow a grid-based, responsive structure with clear margin/padding guidelines

This ensures the app feels polished, accessible, and easy to navigate for new users.

---

## 🧠 Tech Stack

- ⚛️ React Native + Expo
- 🎨 `react-native-paper` (Material Design)
- 📷 `expo-image-picker` (camera + gallery)
- 🌐 `expo-router` (file-based routing)
- 📦 Context API for state management
- 💾 AsyncStorage for data persistence

---

## 📱 Device Features

- ✅ Camera access to take item/project photos
- ✅ Image picker for uploading from gallery
- ✅ Local data persistence via AsyncStorage

---

## 🗂️ Folder Structure

```
src/
├── app/
│   ├── index.tsx           # Stash screen
│   ├── second.tsx          # Project tracker
│   └── stash/
│       ├── add-item.tsx
│       ├── add-project.tsx
│       └── add-category.tsx
├── components/
│   ├── ItemCard.tsx
│   ├── Buttons.tsx
│   └── styles.ts
├── context/
│   ├── CategoryContext.tsx
│   ├── ItemsContext.tsx
│   └── ProjectContext.tsx
```

---

## ✅ Future Improvements

- 🗑️ Delete functionality for items, projects, and categories
- 🛠️ Edit categories + update fields after creation
- 🔍 Filters by category, status, or date
- ☁️ Optional cloud sync or external API

---

## 🚀 Try It Yourself

> Clone the repo → `npm install` → `npx expo start`