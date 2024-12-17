import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const noSelectClass = "select-none";

function NodeModal({
  isOpen,
  onClose,
  node,
  initialPosition,
  expandEntityChildren,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Ensure the modal stays within the viewport
        const maxX = window.innerWidth - 280; // Assuming modal width is 280px
        const maxY = window.innerHeight - 200; // Assuming modal height is 200px

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!node) return null;

  const hasChildren =
    node.data.hasOwnProperty("childCount") && node.data.childCount > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[280px] p-0 bg-secondary border border-border ${noSelectClass}`}
        style={{
          position: "fixed",
          top: `${position.y}px`,
          left: `${position.x}px`,
          transform: "translate(0, 0)",
          margin: 0,
        }}
      >
        <DialogHeader
          className="cursor-move p-3 bg-muted"
          onMouseDown={handleMouseDown}
        >
          <DialogTitle className="text-sm font-semibold">
            {node.data.label}
          </DialogTitle>
          {hasChildren && (
            <Button
              className="w-min"
              onClick={() => expandEntityChildren(node.id)}
            >
              Expand children: <span>{node.data.childCount}</span>
            </Button>
          )}
        </DialogHeader>
        <div className="p-3 text-xs">
          <div className="font-medium mb-1">
            Type: <span className="font-normal">{node.data.type}</span>
          </div>
          <div className="font-medium mb-1">Metadata:</div>
          <ul className="list-none pl-0 space-y-1 border border-border rounded p-2 bg-slate-300">
            {node.data.metadata.map((item, index) => (
              <li key={index} className="flex px-2">
                <span className="font-medium mr-1">{item.title}:</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate"
                >
                  {item.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NodeModal;
