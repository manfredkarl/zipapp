
import { CalendarIcon, UsersIcon } from "lucide-react";

const ProjectHeader = () => {
  return (
    <div className="bg-white shadow animate-fadeIn">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Downtown Plaza Renovation
            </h2>
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
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
