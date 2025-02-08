
import { useState } from "react";
import { PlusIcon, SaveIcon, TrashIcon } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const ReceiptForm = () => {
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: "1", name: "", quantity: 1, price: 0 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: "", quantity: 1, price: 0 },
    ]);
  };

  const updateItem = (id: string, field: keyof ReceiptItem, value: string | number) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(newItems);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the receipt to your backend
    toast.success("Receipt saved successfully!");
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <Input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, "name", e.target.value)}
              placeholder="Item name"
              className="sm:col-span-2"
            />
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
              placeholder="Qty"
              min="1"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={item.price}
                onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                placeholder="Price"
                min="0"
                step="0.01"
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Item
        </button>
        <div className="flex justify-between items-center pt-4 border-t">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <SaveIcon className="h-4 w-4" />
            Save Receipt
          </button>
          <div className="text-lg font-medium">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReceiptForm;
