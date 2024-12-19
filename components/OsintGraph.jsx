import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dagre from "dagre";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import NodeModal from "./NodeModal";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const nodeWidth = 130;
const nodeHeight = 80;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    }),
    edges,
  };
};

const CustomTooltip = ({ content, children, onClick, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onClick} className={`${className}`}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-emerald-400 text-slate-950">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

function OsintGraph({ initialEntity, pollInterval = 5000, graphId }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const router = useRouter();
  const { fitView } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isInitialRender = useRef(true);
  const [graphStatus, setGraphStatus] = useState("processing");

  const createNodesAndEdges = useCallback(
    (data) => {
      const newNodes = data.entities.map((entity) => ({
        id: entity.id,
        type: "custom",
        data: {
          label: entity.label,
          type: entity.type,
          metadata: entity.metadata,
          childCount: entity.childCount,
        },
        position: { x: 0, y: 0 },
      }));

      const newEdges = data.edges.map((edge) => ({
        id: `e-${edge.sourceId}-${edge.targetId}`,
        source: edge.sourceId,
        target: edge.targetId,
        type: "smoothstep",
        animated: true,
        className: "stroke-muted-foreground",
      }));

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(newNodes, newEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      // Use a timeout to ensure the nodes are rendered before fitting the view
      setTimeout(() => {
        fitView({ duration: 1000, padding: 0.2 });
      }, 50);
    },
    [setNodes, setEdges, fitView]
  );

  const fetchGraphData = useCallback(
    async (graphId, action, entityId) => {
      try {
        // const response = await fetch("/api/graph-data");

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            graphId: graphId,
            action: action,
            entityId: entityId,
          }),
        };
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "fetchGraph",
          options
        );

        const newData = await response.json();
        console.log("from fetch", newData);
        setSelectedNode(null);
        createNodesAndEdges(newData);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    },
    [createNodesAndEdges]
  );

  const checkGraphStatus = useCallback(async () => {
    try {
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     graphId: graphId,
      //   }),
      // };
      // const response = await fetch(
      //   process.env.NEXT_PUBLIC_API_URL + "checkGraphStatus",
      //   options
      // );
      // const data = await response.json();

      // if (data.status) {
      //   setGraphStatus("completed");
      // } else {
      //   setGraphStatus("processing");
      // }
      setGraphStatus("completed");
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  }, [graphStatus]);

  const expandEntity = (entityId) => {
    const actionTypes = "collapse" || "expand" || "root";
    const action = "expand";
    fetchGraphData(graphId, action, entityId);
  };

  const collapseEntity = (entityId) => {
    const actionTypes = "collapse" || "expand" || "root";
    const action = "collapse";
    fetchGraphData(graphId, action, entityId);
  };

  const collapseToRoot = () => {
    const actionTypes = "collapse" || "expand" || "root";
    const action = "root";
    fetchGraphData(graphId, action, "");
  };

  useEffect(() => {
    if (isInitialRender.current) {
      // Initialize with the initial entity
      createNodesAndEdges({ entities: [initialEntity], edges: [] });
      isInitialRender.current = false;
    }

    // Set up polling
    setTimeout(() => {
      fetchGraphData(graphId, "root", "");
    }, pollInterval);
    const interval = setTimeout(checkGraphStatus, 20000);
    return () => clearInterval(interval);
  }, [initialEntity, pollInterval, createNodesAndEdges, fetchGraphData]);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({}), []);

  const onNodeClick = useCallback((event, node) => {
    console.log(nodes);
    setSelectedNode(node);
    setModalPosition({ x: event.clientX, y: event.clientY });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col bg-background graph-bg"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode="strict"
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        onNodeClick={onNodeClick}
      >
        <Background gap={12} size={1} className="bg-background" />
        <Controls className="bg-card border border-border rounded-lg !bottom-4 !left-4" />
        {/* <MiniMap
          className="bg-card border border-border rounded-lg !bottom-4 !right-4"
          nodeColor="#888"
          maskColor="rgb(0, 0, 0, 0.1)"
        /> */}
      </ReactFlow>
      <NodeModal
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        node={selectedNode}
        initialPosition={modalPosition}
        expandEntity={expandEntity}
        collapseEntity={collapseEntity}
      />
      <div className="graph-header">
        <h1>OSINT Graph for {initialEntity.label}</h1>
        <CustomTooltip
          className="bg-secondary collapse-all-btn"
          onClick={collapseToRoot}
          content="Go back to Root nodes"
        >
          Collapse all
        </CustomTooltip>
      </div>
      {graphStatus === "completed" ? (
        <Button
          className="bg-secondary graph-report-btn"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Button>
      ) : (
        <Button
          className="bg-secondary graph-report-btn"
          style={{ cursor: "progress" }}
        >
          <Image
            src="/img/wheel-loader.gif"
            unoptimized
            width={30}
            height={30}
            alt="gears"
          />
          Generating Graph please wait...
        </Button>
      )}
    </div>
  );
}

export default OsintGraph;
