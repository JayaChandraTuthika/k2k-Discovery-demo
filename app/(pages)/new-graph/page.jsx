"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { FaUser, FaBuilding, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";

const CustomNode = ({ data }) => {
  const Icon = data.icon || FaUser;
  return (
    <div className="custom-node bg-secondary text-slate-950 rounded-sm p-2 text-sm">
      <Handle type="target" position={Position.Left} />
      <div onClick={data.onClick} className="flex gap-2 justify-center items-center">
        <Icon className="node-icon" />
        <span className="node-label">{data.label}</span>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "root",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Root", icon: FaUser, isExpanded: false },
  },
];

const initialEdges = [];

const OSINTGraphInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodesRef = useRef(nodes);
  const isProcessingRef = useRef(false);

  const { fitView } = useReactFlow();

  // const toggleChildrenVisibility = useCallback(
  //   (nodeId, expandFlag) => {
  //     if (isProcessingRef.current) return;
  //     isProcessingRef.current = true;

  //     let testNodes = [];
  //     console.log("updating");

  //     setNodes((nds) => {
  //       //   console.log("first nodes", nds);
  //       const updatedNodes = nds.map((node) => {
  //         if (node.id === nodeId) {
  //           // Toggle the expanded state of the clicked node
  //           node.data = { ...node.data, isExpanded: true };
  //         }
  //         // console.log("parent", node.parentNode, nodeId);
  //         if (node.parentNode === nodeId) {
  //           // Toggle visibility of immediate children
  //           console.log(node.hidden);
  //           node.hidden = false;
  //         }
  //         return node;
  //       });

  //       // Recursively hide all descendants if the parent is being collapsed
  //       const hideDescendants = (parentId, shouldHide) => {
  //         updatedNodes.forEach((node) => {
  //           if (node.parentNode === parentId) {
  //             node.hidden = shouldHide;
  //             if (node.data.isExpanded && shouldHide) {
  //               node.data.isExpanded = false;
  //               hideDescendants(node.id, true);
  //             }
  //           }
  //         });
  //       };
  //       const clickedNode = updatedNodes.find((n) => n.id === nodeId);
  //       if (clickedNode && !clickedNode.data.isExpanded) {
  //         hideDescendants(nodeId, true);
  //       }
  //       // testNodes = updatedNodes;
  //       return updatedNodes;
  //     });
  //     // console.log("updated set",nodes);

  //     setEdges((eds) =>
  //       eds.map((edge) => {
  //         const sourceNode = testNodes.find((n) => n.id === edge.source);
  //         const targetNode = testNodes.find((n) => n.id === edge.target);

  //         if (sourceNode && targetNode) {
  //           if (edge.source === nodeId) {
  //             // This is an edge from the clicked node to its child
  //             edge.hidden = !sourceNode.data.isExpanded;
  //           } else if (edge.target === nodeId) {
  //             // This is an edge from a parent to the clicked node
  //             // We don't want to hide this edge
  //             edge.hidden = false;
  //           } else if (targetNode.parentNode === nodeId) {
  //             // This is an edge between children of the clicked node
  //             edge.hidden = !sourceNode.data.isExpanded;
  //           }
  //         }

  //         return edge;
  //       })
  //     );
  //     setTimeout(() => {
  //       isProcessingRef.current = false;
  //     }, 0);
  //   },
  //   [setNodes, setEdges]
  // );

  const fillAllNodes = () => {
    fitView({
      duration: 2000, // Animation duration in milliseconds
      padding: 0.2,
      includeHiddenNodes: false,
    });
  };
  const toggleChildrenVisibility = useCallback(
    (nodeId) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      setNodes((currentNodes) => {
        // console.log("updated nodes");
        const updatedNodes = currentNodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, isExpanded: !node.data.isExpanded },
            };
          }
          if (node.parentNode === nodeId) {
            return { ...node, hidden: !node.hidden };
          }
          return node;
        });

        const hideDescendants = (parentId, shouldHide) => {
          return updatedNodes.map((node) => {
            if (node.parentNode === parentId) {
              const newNode = {
                ...node,
                hidden: shouldHide,
                data: { ...node.data, isExpanded: shouldHide ? false : node.data.isExpanded },
              };
              if (newNode.data.isExpanded && shouldHide) {
                return hideDescendants(node.id, true);
              }
              return newNode;
            }
            return node;
          });
        };

        const clickedNode = updatedNodes.find((n) => n.id === nodeId);
        if (clickedNode && !clickedNode.data.isExpanded) {
          return hideDescendants(nodeId, true);
        }

        return updatedNodes;
      });

      setEdges((currentEdges) => {
        console.log("Nodes ref", nodesRef.current);
        return currentEdges.map((edge) => {
          const sourceNode = nodesRef.current.find((n) => n.id === edge.source);
          const targetNode = nodesRef.current.find((n) => n.id === edge.target);
          // console.log("source", sourceNode);
          // console.log("target", targetNode);
          if (sourceNode && targetNode) {
            if (edge.source === nodeId) {
              console.log(sourceNode.data.isExpanded);
              return { ...edge, hidden: sourceNode.data.isExpanded };
            } else if (edge.target === nodeId) {
              return { ...edge, hidden: false };
            } else if (targetNode.parentNode === nodeId) {
              return { ...edge, hidden: !sourceNode.data.isExpanded };
            }
          }

          return edge;
        });
      });
      fillAllNodes();
      // Reset the processing flag after a short delay
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 0);
    },
    [setNodes, setEdges]
  );

  const onNodeClick = (event, node) => {
    console.log("Clicked");
    if (node && node.id) {
      toggleChildrenVisibility(node.id);
    }
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: "bezier" }, eds)), [setEdges]);

  const layoutNodes = (nodes, parentX = 0, parentY = 0, level = 0, parentId = null) => {
    const nodeWidth = 110; // Updated nodeWidth value
    const nodeHeight = 30;
    const horizontalSpacing = 60;
    const verticalSpacing = 30;
    let newNodes = [];
    let newEdges = [];

    nodes.forEach((node, index, array) => {
      const x = level * horizontalSpacing + nodeWidth;
      const middleIndex = Math.floor(array.length / 2);
      const yOffset = (index - middleIndex) * (nodeHeight + verticalSpacing);
      const y = parentY + yOffset;

      const newNode = {
        ...node,
        type: "custom",
        position: { x, y },
        data: {
          ...node.data,
          isExpanded: false,
          onClick: () => onNodeClick(null, { id: node.id, data: node.data }),
          id: node.id,
        },
        parentNode: parentId,
        hidden: level > 1,
      };

      newNodes.push(newNode);

      if (parentId) {
        newEdges.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: "bezier",
          animated: true,
          style: { stroke: "#888" },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#888" },
          hidden: level > 1,
        });
      }

      if (node.children && node.children.length > 0) {
        const [childNodes, childEdges] = layoutNodes(node.children, x, y, level + 1, node.id);
        newNodes = [...newNodes, ...childNodes];
        newEdges = [...newEdges, ...childEdges];
      }
    });

    return [newNodes, newEdges];
  };

  const fetchData = useCallback(async () => {
    const mockData = {
      id: "root",
      data: { label: "John Doe", icon: FaUser },
      children: [
        {
          id: "1",
          data: { label: "Acme Corp", icon: FaBuilding },
          children: [
            { id: "1-1", data: { label: "acme.com", icon: FaGlobe } },
            { id: "1-2", data: { label: "info@acme.com", icon: FaEnvelope } },
          ],
        },
        {
          id: "2",
          data: { label: "Personal", icon: FaUser },
          children: [
            { id: "2-1", data: { label: "john@email.com", icon: FaEnvelope } },
            { id: "2-2", data: { label: "+1 123-456-7890", icon: FaPhone } },
          ],
        },
        {
          id: "3",
          data: { label: "Social", icon: FaUser },
          children: [
            { id: "3-1", data: { label: "Twitter", icon: FaGlobe } },
            { id: "3-2", data: { label: "LinkedIn", icon: FaGlobe } },
          ],
        },
      ],
    };

    const [newNodes, newEdges] = layoutNodes([mockData]);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [setNodes, setEdges]);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fetchData]);

  const fitViewOptions = {
    duration: 1000,
    padding: 0.2,
    includeHiddenNodes: false,
  };

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    fitView(fitViewOptions);
  }, [nodes, fitView]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={{ type: "bezier" }}
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      <style jsx>{`
        .custom-node {
          padding: 5px;
          border-radius: 5px;
          background: white;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          font-size: 12px;
        }
        .node-icon {
          margin-right: 5px;
        }
        .node-label {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

const OSINTGraph = () => (
  <ReactFlowProvider>
    <OSINTGraphInner />
  </ReactFlowProvider>
);

export default OSINTGraph;
