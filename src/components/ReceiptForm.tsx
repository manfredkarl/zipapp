
import { useState } from "react";
import { PlusIcon } from "lucide-react";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

const ReceiptForm = () => {
  const [items, setItems] = useState<ReceiptItem[]>([{ name: "", quantity: 1, price: 0 }]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof ReceiptItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <h3 className="text-lg font-medium mb-4">Create Receipt</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, "name", e.target.value)}
              placeholder="Item name"
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
              placeholder="Quantity"
              min="1"
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
              placeholder="Price"
              min="0"
              step="0.01"
              className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
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
        <div className="flex justify-end pt-4 border-t">
          <div className="text-lg font-medium">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptForm;
