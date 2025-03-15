
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Order } from "@/hooks/use-chat-messages";

interface OrderFormProps {
  onSend: (order: Order) => void;
  onCancel: () => void;
}

export function OrderForm({ onSend, onCancel }: OrderFormProps) {
  const [orderStatus, setOrderStatus] = useState<Order["status"]>("accepted");

  const handleSend = () => {
    onSend({
      id: `order-${Date.now()}`,
      offerId: "o1", // In a real app, we'd use the latest offer ID
      status: orderStatus,
      acceptedAt: new Date()
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Update Order</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="order-status">Order Status</Label>
          <select
            id="order-status"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={orderStatus}
            onChange={e => setOrderStatus(e.target.value as Order["status"])}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSend}>
          Send
        </Button>
      </DialogFooter>
    </>
  );
}
