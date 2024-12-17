const entityTypes = [
  "person",
  "email",
  "domain",
  "phoneNumber",
  "socialMedia",
  "address",
];
const metadataTitles = [
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Instagram",
  "Website",
  "Blog",
];

function generateRandomEntity(id) {
  const type = entityTypes[Math.floor(Math.random() * entityTypes.length)];
  return {
    id,
    label: `${type}-${id}`,
    type,
    metadata: [
      {
        title:
          metadataTitles[Math.floor(Math.random() * metadataTitles.length)],
        url: `https://example.com/${id}`,
      },
      {
        title:
          metadataTitles[Math.floor(Math.random() * metadataTitles.length)],
        url: `https://example.org/${id}`,
      },
    ],
  };
}

function generateRandomEdge(sourceId, targetId) {
  return {
    id: `e-${sourceId}-${targetId}`,
    sourceId,
    targetId,
  };
}

export function generateMockData(existingData, newEntitiesCount) {
  const newEntities = [];
  const newEdges = [];

  for (let i = 0; i < newEntitiesCount; i++) {
    const newEntityId = `entity${existingData.entities.length + i + 1}`;
    const newEntity = generateRandomEntity(newEntityId);
    newEntities.push(newEntity);

    // Connect new entity to a random existing entity
    const randomExistingEntity =
      existingData.entities[
        Math.floor(Math.random() * existingData.entities.length)
      ];
    newEdges.push(generateRandomEdge(randomExistingEntity.id, newEntityId));
  }

  return {
    entities: [...existingData.entities, ...newEntities],
    edges: [...existingData.edges, ...newEdges],
  };
}
