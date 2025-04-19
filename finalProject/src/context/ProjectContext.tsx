import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Project {
  id: string;
  title: string;
  isGift: boolean;
  dateStarted: string;
  supplies: string;
  imageUri: string | null;
  status: string;
  categoryId?: string;
  categoryColor?: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
});

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const stored = await AsyncStorage.getItem('projects');
      if (stored) setProjects(JSON.parse(stored));
    };
    loadProjects();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === project.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = project;
        return updated;
      } else {
        return [...prev, project];
      }
    });
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};