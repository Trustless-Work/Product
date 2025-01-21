import type { ProjectConfig, ProjectContextType } from "@/types/project";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectConfig | null>(
    null
  );

  useEffect(() => {
    // Initialize projects from environment variables
    const projectConfigs: ProjectConfig[] = [
      {
        value: "kindfi",
        label: "KindFi",
        apiToken: process.env.NEXT_PUBLIC_GITBOOK_KF_API_TOKEN || "",
        spaceId: process.env.NEXT_PUBLIC_GITBOOK_KF_SPACE_ID || "",
      },
      {
        value: "trustless",
        label: "Trustless",
        apiToken: process.env.NEXT_PUBLIC_GITBOOK_TL_API_TOKEN || "",
        spaceId: process.env.NEXT_PUBLIC_GITBOOK_TL_SPACE_ID || "",
      },
    ];

    setProjects(projectConfigs);
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
