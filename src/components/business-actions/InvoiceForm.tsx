
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Invoice } from "@/hooks/use-chat-messages";

interface InvoiceFormProps {
  onSend: (invoice: Invoice) => void;
  onCancel: () => void;
}

export function InvoiceForm({ onSend, onCancel }: InvoiceFormProps) {
  const { toast } = useToast();
  const [invoiceData, setInvoiceData] = useState({
    amount: 0,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    items: [{ description: "", quantity: 1, unitPrice: 0 }]
  });

  const calculateInvoiceTotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const handleSend = () => {
    if (calculateInvoiceTotal() <= 0 || !invoiceData.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please enter valid invoice items and due date",
        variant: "destructive"
      });
      return;
    }
    
    const invoiceItems = invoiceData.items.filter(item => 
      item.description && item.quantity > 0 && item.unitPrice > 0
    );
    
    if (invoiceItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one valid invoice item",
        variant: "destructive"
      });
      return;
    }
    
    onSend({
      id: `invoice-${Date.now()}`,
      orderId: "ord1", // In a real app, we'd use the active order ID
      amount: calculateInvoiceTotal(),
      currency: "USD",
      dueDate: new Date(invoiceData.dueDate),
      status: "pending",
      items: invoiceItems.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.quantity * item.unitPrice
      }))
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Send Invoice</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div>
          <Label htmlFor="invoice-due-date">Due Date</Label>
          <Input 
            id="invoice-due-date"
            type="date" 
            value={invoiceData.dueDate}
            onChange={e => setInvoiceData({...invoiceData, dueDate: e.target.value})}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <Label>Invoice Items</Label>
          <div className="space-y-2 mt-2">
            {invoiceData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 border p-2 rounded-md">
                <Input 
                  className="col-span-5" 
                  placeholder="Description"
                  value={item.description}
                  onChange={e => {
                    const newItems = [...invoiceData.items];
                    newItems[index].description = e.target.value;
                    setInvoiceData({...invoiceData, items: newItems});
                  }}
                />
                <Input 
                  className="col-span-2" 
                  type="number" 
                  min="1"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={e => {
                    const newItems = [...invoiceData.items];
                    newItems[index].quantity = parseInt(e.target.value) || 1;
                    setInvoiceData({...invoiceData, items: newItems});
                  }}
                />
                <Input 
                  className="col-span-3" 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="Price"
                  value={item.unitPrice}
                  onChange={e => {
                    const newItems = [...invoiceData.items];
                    newItems[index].unitPrice = parseFloat(e.target.value) || 0;
                    setInvoiceData({...invoiceData, items: newItems});
                  }}
                />
                <button 
                  type="button"
                  className="col-span-2 text-red-500 flex items-center justify-center"
                  onClick={() => {
                    if (invoiceData.items.length > 1) {
                      setInvoiceData({
                        ...invoiceData, 
                        items: invoiceData.items.filter((_, i) => i !== index)
                      });
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setInvoiceData({
                  ...invoiceData,
                  items: [...invoiceData.items, { description: "", quantity: 1, unitPrice: 0 }]
                });
              }}
            >
              Add Item
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-medium">${calculateInvoiceTotal().toFixed(2)}</span>
          </div>
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
