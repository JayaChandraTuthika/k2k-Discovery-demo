import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function EntityEditModal({
  entity,
  position,
  onClose,
  onSave,
  onDelete,
}) {
  const [label, setLabel] = useState(entity.data.label);
  const [modalPosition, setModalPosition] = useState(position);

  useEffect(() => {
    setLabel(entity.data.label);
    setModalPosition(position);
  }, [entity, position]);

  const handleDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX - modalPosition.x;
    const startY = e.clientY - modalPosition.y;

    const handleDrag = (e) => {
      setModalPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return (
    <div
      className="fixed bg-card border border-border rounded-lg shadow-lg p-3 w-64 cursor-move"
      style={{
        left: modalPosition.x,
        top: modalPosition.y,
      }}
      onMouseDown={handleDragStart}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">Edit Entity</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 cursor-pointer"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        <div>
          <Label htmlFor="entity-label" className="text-xs">
            Label
          </Label>
          <Input
            id="entity-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="h-7 text-sm"
          />
        </div>
        <div>
          <Label className="text-xs">Type</Label>
          <div className="text-xs text-muted-foreground">
            {entity.data.type}
          </div>
        </div>
        {entity.data.relatedItems && entity.data.relatedItems.length > 0 && (
          <div>
            <Label className="text-xs">Related Items</Label>
            <ScrollArea className="h-24 rounded-md border">
              <div className="p-2">
                {entity.data.relatedItems.map((item, index) => (
                  <div key={index} className="text-xs py-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.title}
                    </a>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onDelete(entity.id)}
          >
            Delete
          </Button>
          <Button
            size="sm"
            className="text-xs"
            onClick={() => onSave(entity.id, { ...entity.data, label })}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
