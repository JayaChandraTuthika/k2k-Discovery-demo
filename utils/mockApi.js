import { Node, Edge } from "reactflow";

const entityTypes = ["person", "email", "domain", "phone"];

// Function to generate a random entity
function generateRandomEntity(id) {
  return {
    id,
    label: `Entity ${id}`,
    type: [entityTypes[Math.floor(Math.random() * entityTypes.length)]],
    metadata: Array(Math.floor(Math.random() * 3) + 1)
      .fill(null)
      .map(() => ({
        title: `Profile ${Math.random().toString(36).substring(7)}`,
        url: `https://example.com/${Math.random().toString(36).substring(7)}`,
      })),
  };
}

// Initial mock data with one entity and no edges
let mockData = {
  entities: [generateRandomEntity("1")],
  edges: [],
};

// Function to simulate API fetching of investigation data
export async function fetchInvestigationData(investigationId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate new entities
  const newEntitiesCount = Math.floor(Math.random() * 3) + 1;
  const newEntities = Array(newEntitiesCount)
    .fill(null)
    .map((_, index) =>
      generateRandomEntity(`${mockData.entities.length + index + 1}`)
    );

  // Generate edges connecting the last entity to new entities
  const newEdges = newEntities.map((entity) => ({
    id: `e${mockData.entities[mockData.entities.length - 1].id}-${entity.id}`,
    sourceId: mockData.entities[mockData.entities.length - 1].id,
    targetId: entity.id,
  }));

  // Update mock data with new entities and edges
  mockData = {
    entities: [...mockData.entities, ...newEntities],
    edges: [...mockData.edges, ...newEdges],
  };

  return mockData;
}
