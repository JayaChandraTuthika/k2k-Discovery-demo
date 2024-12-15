"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeMouseHandler,
  XYPosition,
} from "reactflow";
import { EntityNode } from "./custom-nodes/entity-node";
import { EntitySidebar } from "./entity-sidebar";
import { EntityEditModal } from "./entity-edit-modal";
import "reactflow/dist/style.css";

const nodeTypes = {
  entity: EntityNode,
};

const initialNodes = [
  {
    id: "1",
    type: "entity",
    position: { x: 250, y: 0 },
    data: { label: "example@email.com", type: "email" },
  },
  {
    id: "2",
    type: "entity",
    position: { x: 100, y: 100 },
    data: { label: "John Smith", type: "person" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function OsintGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode = {
        id: `${nodes.length + 1}`,
        type: "entity",
        position,
        data: { label: `New ${type}`, type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onNodeClick = useCallback((_, node) => {
    setSelectedEntity(node);

    setModalPosition({ x: node.position.x + 100, y: node.position.y });
  }, []);

  const onCloseModal = () => {
    setSelectedEntity(null);
  };

  const onSaveEntity = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: newData } : node))
    );
    setSelectedEntity(null);
  };

  const onDeleteEntity = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
    setSelectedEntity(null);
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <EntitySidebar onDragStart={onDragStart} />
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background variant="" gap={12} size={1} />
        </ReactFlow>
        {selectedEntity && (
          <EntityEditModal
            entity={selectedEntity}
            position={modalPosition}
            onClose={onCloseModal}
            onSave={onSaveEntity}
            onDelete={onDeleteEntity}
          />
        )}
      </div>
    </div>
  );
}
