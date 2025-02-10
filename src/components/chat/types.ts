
export interface MainProject {
  name: string;
  type: 'main';
  subProjects: string[];
  progress: number;
}

export interface SubProject {
  name: string;
  type: 'sub';
  parentId: string;
  progress: number;
}

export type Project = MainProject | SubProject;

export const chatList: Record<string, Project> = {
  main: {
    name: "Downtown Plaza Renovation",
    type: "main",
    subProjects: ["1", "2", "3"],
    progress: 35
  } as MainProject,
  "1": {
    name: "Plaza Foundation Renovation",
    type: "sub",
    parentId: "main",
    progress: 65
  } as SubProject,
  "2": {
    name: "Landscaping & Gardens",
    type: "sub",
    parentId: "main",
    progress: 25
  } as SubProject,
  "3": {
    name: "Fountain Installation",
    type: "sub",
    parentId: "main",
    progress: 10
  } as SubProject
};

