
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { chatList } from "./types";

interface ProgressDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProject: string | null;
  onProgressChange: (value: number[]) => void;
}

export const ProgressDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedProject, 
  onProgressChange 
}: ProgressDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Progress (%)</DialogTitle>
        </DialogHeader>
        {selectedProject && (
          <div className="py-4">
            <Slider
              defaultValue={[chatList[selectedProject].progress]}
              max={100}
              step={1}
              onValueChange={onProgressChange}
            />
            <div className="mt-2 text-center text-sm text-gray-600">
              {chatList[selectedProject].progress}%
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

