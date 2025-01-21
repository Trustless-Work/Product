export interface ProjectConfig {
    value: string;
    label: string;
    apiToken: string;
    spaceId: string;
  }
  
  export interface ProjectContextType {
    projects: ProjectConfig[];
    selectedProject: ProjectConfig | null;
    setSelectedProject: (project: ProjectConfig | null) => void;
  }

  export interface MessageInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    onStop: () => void;
  }