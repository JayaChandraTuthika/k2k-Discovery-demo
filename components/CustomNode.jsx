import React from "react";
import { Handle, Position } from "reactflow";

function CustomNode({ data, isConnectable, onClick }) {
  return (
    <div
      className={`px-3 py-2 shadow-md rounded-md bg-white text-sm ${
        data.type === "root" ? "custom-node-root" : "custom-node-child"
      } `}
      onClick={onClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-semibold">{data.label}</div>
      <div className="text-xs text-gray-500">{data.type}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;
