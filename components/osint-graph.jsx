"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import { EntityNode } from "./custom-nodes/entity-node";
import { EntityEditModal } from "./entity-edit-modal";
import "reactflow/dist/style.css";

const nodeTypes = {
  entity: EntityNode,
};

const initialNodes = [
  {
    id: "1",
    type: "entity",
    position: { x: 0, y: 0 },
    data: { label: "Initial Entity", type: "person" },
  },
];

const initialEdges = [];

// Mock API function (replace with actual API call)
const fetchRelatedEntities = async (entityId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, (_, i) => ({
    id: `${entityId}-${i}`,
    type: "entity",
    position: { x: 0, y: 0 },
    data: {
      label: `Related to ${entityId}`,
      type: ["person", "email", "website", "phone"][
        Math.floor(Math.random() * 4)
      ],
      relatedItems: [
        {
          title: "LinkedIn Profile",
          url: "https://www.linkedin.com/in/example",
        },
        { title: "Facebook Page", url: "https://www.facebook.com/example" },
        { title: "Twitter Account", url: "https://twitter.com/example" },
        {
          title: "Instagram Profile",
          url: "https://www.instagram.com/example",
        },
      ].slice(0, Math.floor(Math.random() * 4) + 1),
    },
  }));
};

const VERTICAL_SPACING = 150;
const HORIZONTAL_SPACING = 250;

function OsintGraphInner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const { fitView } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    if (reactFlowWrapper.current) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      setSelectedEntity(node);
      setModalPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
    }
  }, []);

  const onCloseModal = () => setSelectedEntity(null);

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

  const addRelatedNodes = useCallback(
    async (sourceId) => {
      const relatedEntities = await fetchRelatedEntities(sourceId);
      const sourceNode = nodes.find((n) => n.id === sourceId);

      const maxY = Math.max(...nodes.map((n) => n.position.y));
      const startY = Math.max(
        maxY + VERTICAL_SPACING,
        sourceNode.position.y + VERTICAL_SPACING
      );

      const newNodes = relatedEntities.map((entity, index) => ({
        ...entity,
        position: {
          x:
            sourceNode.position.x +
            (index - (relatedEntities.length - 1) / 2) * HORIZONTAL_SPACING,
          y: startY,
        },
      }));

      const newEdges = newNodes.map((node) => ({
        id: `e${sourceId}-${node.id}`,
        source: sourceId,
        target: node.id,
      }));

      setNodes((nds) => [...nds, ...newNodes]);
      setEdges((eds) => [...eds, ...newEdges]);

      setTimeout(() => {
        fitView({ duration: 500, padding: 2 });
      }, 50);
    },
    [nodes, setNodes, setEdges, fitView]
  );

  useEffect(() => {
    const pollApi = () => {
      const leafNodes = nodes.filter(
        (node) => !edges.some((edge) => edge.source === node.id)
      );
      if (leafNodes.length > 0) {
        const sourceNode =
          leafNodes[Math.floor(Math.random() * leafNodes.length)];
        addRelatedNodes(sourceNode.id);
      }
    };

    const timeoutId = setTimeout(pollApi, 5000);
    return () => clearTimeout(timeoutId);
  }, [nodes, edges, addRelatedNodes]);

  return (
    <div ref={reactFlowWrapper} className="h-screen w-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
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
  );
}

export default function OsintGraph() {
  return (
    <ReactFlowProvider>
      <OsintGraphInner />
    </ReactFlowProvider>
  );
}
