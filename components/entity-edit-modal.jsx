"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EntityEditModal({
  entity,
  position,
  onClose,
  onSave,
  onDelete,
}) {
  const [label, setLabel] = useState(entity.data.label);

  useEffect(() => {
    setLabel(entity.data.label);
  }, [entity]);

  return (
    <div
      className="absolute bg-card border border-border rounded-lg shadow-lg p-4 w-64"
      style={{ left: position.x, top: position.y }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Edit Entity</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="entity-label">Label</Label>
          <Input
            id="entity-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div>
          <Label>Type</Label>
          <div className="text-sm text-muted-foreground">
            {entity.data.type}
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onDelete(entity.id)}>
            Delete
          </Button>
          <Button onClick={() => onSave(entity.id, { ...entity.data, label })}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
