
import { useState } from "react";
import { FileIcon, DownloadIcon, TrashIcon, UploadIcon } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
}

const FileList = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "site-plan.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedAt: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      name: "progress-photo.jpg",
      size: "1.8 MB",
      type: "image/jpeg",
      uploadedAt: new Date(Date.now() - 3600000),
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type,
      uploadedAt: new Date(),
    };

    setFiles([...files, newFile]);
    toast.success("File uploaded successfully!");
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
    toast.success("File deleted successfully!");
  };

  const handleDownload = (file: FileItem) => {
    // In a real app, you'd download the file from your server here
    toast.success(`Downloading ${file.name}...`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Project Files</h3>
        <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
          <UploadIcon className="h-4 w-4" />
          Upload File
          <Input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileIcon className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">{file.name}</h4>
                <p className="text-sm text-gray-500">
                  {file.size} • {file.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload(file)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <DownloadIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
