
import { CalendarIcon, UsersIcon, ChevronRightIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface SubProject {
  id: string;
  name: string;
  status: "planning" | "active" | "completed";
  startDate: string;
  teamSize: number;
  progress: number;
}

const subProjects: SubProject[] = [
  {
    id: "1",
    name: "Plaza Foundation Renovation",
    status: "active",
    startDate: "January 15, 2024",
    teamSize: 4,
    progress: 65,
  },
  {
    id: "2",
    name: "Landscaping & Gardens",
    status: "planning",
    startDate: "February 1, 2024",
    teamSize: 3,
    progress: 25,
  },
  {
    id: "3",
    name: "Fountain Installation",
    status: "planning",
    startDate: "March 1, 2024",
    teamSize: 5,
    progress: 10,
  }
];

const ProjectHeader = () => {
  // Calculate overall project progress
  const overallProgress = Math.round(
    subProjects.reduce((acc, project) => acc + project.progress, 0) / subProjects.length
  );

  return (
    <div className="bg-white shadow animate-fadeIn">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Projects</span>
                <ChevronRightIcon className="h-4 w-4" />
                <span>Downtown Plaza Renovation</span>
              </div>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Downtown Plaza Renovation
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                Active
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              Started January 10, 2024
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <UsersIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              12 team members
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="subprojects" className="w-full">
            <TabsList>
              <TabsTrigger value="subprojects">Sub-Projects</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="subprojects" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subProjects.map((project) => (
                  <Dialog key={project.id}>
                    <DialogTrigger asChild>
                      <div className="rounded-lg border p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{project.name}</h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              project.status === "active"
                                ? "bg-green-100 text-green-800"
                                : project.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-1.5 h-4 w-4" />
                            {project.startDate}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="mr-1.5 h-4 w-4" />
                            {project.teamSize} team members
                          </div>
                          <div className="space-y-1 mt-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{project.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Project Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                project.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : project.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Start Date:</span>
                              <span className="ml-2">{project.startDate}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Team Size:</span>
                              <span className="ml-2">{project.teamSize} members</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Progress:</span>
                              <span className="ml-2">{project.progress}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="overview" className="mt-4">
              <div className="prose max-w-none">
                <p className="text-gray-600">
                  The Downtown Plaza Renovation is a comprehensive urban renewal project aimed at 
                  revitalizing the city center. The project encompasses foundation work, 
                  landscaping improvements, and the installation of a new central fountain.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;

