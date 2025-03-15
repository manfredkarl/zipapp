
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PlusCircle, Package, Tag, ClipboardEdit, BarChart, Receipt, CreditCard, CheckCircle } from "lucide-react";

interface BusinessActionMenuProps {
  onActionSelect: (action: string) => void;
}

export function BusinessActionMenu({ onActionSelect }: BusinessActionMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="mb-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Business Action
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="start">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("service")}
          >
            <Package className="h-4 w-4 mr-2" />
            Add Service
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("offer")}
          >
            <Tag className="h-4 w-4 mr-2" />
            Create Offer
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("order")}
          >
            <ClipboardEdit className="h-4 w-4 mr-2" />
            Update Order
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("progress")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Update Progress
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("invoice")}
          >
            <Receipt className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("payment")}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onActionSelect("closing")}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Close Project
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
