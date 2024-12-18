"use client";

import OsintGraph from "@/components/OsintGraph";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { ReactFlowProvider } from "reactflow";

// const initialEntity = {
//   id: "entity1",
//   label: "John Doe",
//   type: "person",
//   metadata: [],
// };

function Page() {
  const params = useSearchParams();
  const graphId = params.get("graphId");
  const search = params.get("search");
  const identifier = params.get("identifier");

  const initialEntity = {
    id: "test",
    label: search,
    type: identifier,
    metadata: [],
  };
  return (
    <ReactFlowProvider>
      <OsintGraph
        initialEntity={initialEntity}
        graphId={graphId}
        pollInterval={2000}
      />
    </ReactFlowProvider>
  );
}

export default function Investigate({ children }) {
  return (
    <div className="container mx-auto">
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </div>
  );
}
