"use client";

import OsintGraph from "@/components/OsintGraph";
import { useSearchParams } from "next/navigation";
import React from "react";
import { ReactFlowProvider } from "reactflow";

const initialEntity = {
  id: "entity1",
  label: "John Doe",
  type: "person",
  metadata: [
    {
      title: "Facebook",
      url: "https://facebook.com/johndoe",
    },
    {
      title: "Twitter",
      url: "https://twitter.com/johndoe",
    },
  ],
};

export default function Page() {
  const params = useSearchParams();
  const graphId = params.get("graphId");
  return (
    <div className="container mx-auto p-4">
      <ReactFlowProvider>
        <OsintGraph
          initialEntity={initialEntity}
          graphId={graphId}
          pollInterval={2000}
        />
      </ReactFlowProvider>
    </div>
  );
}
