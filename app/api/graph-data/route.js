import { NextResponse } from "next/server";

let currentData = {
  entities: [
    {
      id: "sclowy_root",
      label: "sclowy.com",
      type: "root",
      metadata: [{ title: "Domain", url: "https://sclowy.com" }],
    },
    {
      id: "blacklisted_names_bucket",
      label: "Blacklisted Names",
      type: "bucket",
      metadata: [{ title: "Type", url: "Blacklisted Names" }],
      childCount: 3,
    },
    {
      id: "dns_records_bucket",
      label: "DNS Records",
      type: "bucket",
      metadata: [{ title: "Type", url: "DNS Records" }],
      childCount: 4,
    },
    {
      id: "emails_bucket",
      label: "Emails",
      type: "bucket",
      metadata: [{ title: "Type", url: "Emails" }],
      childCount: 5,
    },
    {
      id: "malicious_names_bucket",
      label: "Malicious Names",
      type: "bucket",
      metadata: [{ title: "Type", url: "Malicious Names" }],
      childCount: 6,
    },
    {
      id: "ssl_certificates_bucket",
      label: "SSL Certificates",
      type: "bucket",
      metadata: [
        { title: "Type", url: "SSL Certificates" },
        { title: "Test", url: "dbsbedsn" },
      ],
      childCount: 0,
    },
    {
      id: "social_media_bucket",
      label: "Social Media",
      type: "bucket",
      metadata: [{ title: "Type", url: "Social Media" }],
    },
  ],
  edges: [
    {
      id: "edge_sclowy_root_blacklisted_names_bucket",
      sourceId: "sclowy_root",
      targetId: "blacklisted_names_bucket",
    },
    {
      id: "edge_sclowy_root_dns_records_bucket",
      sourceId: "sclowy_root",
      targetId: "dns_records_bucket",
    },
    {
      id: "edge_sclowy_root_emails_bucket",
      sourceId: "sclowy_root",
      targetId: "emails_bucket",
    },
    {
      id: "edge_sclowy_root_malicious_names_bucket",
      sourceId: "sclowy_root",
      targetId: "malicious_names_bucket",
    },
    {
      id: "edge_sclowy_root_ssl_certificates_bucket",
      sourceId: "sclowy_root",
      targetId: "ssl_certificates_bucket",
    },
    {
      id: "edge_sclowy_root_social_media_bucket",
      sourceId: "sclowy_root",
      targetId: "social_media_bucket",
    },
  ],
};

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

export async function GET() {
  // Add 1-3 new entities each API call
  const newEntitiesCount = Math.floor(Math.random() * 3) + 1;
  const newEntities = [];
  const newEdges = [];
  // const currentData.entities = currentData.entities.filter(
  //   (en) => en.type == "bucket" || en.type == "root"
  // );
  for (let i = 0; i < newEntitiesCount; i++) {
    const newEntityId = `entity${currentData.entities.length + i + 1}`;
    const newEntity = generateRandomEntity(newEntityId);
    newEntities.push(newEntity);

    // Connect new entity to a random existing entity
    const randomExistingEntity =
      currentData.entities[
        Math.floor(Math.random() * currentData.entities.length)
      ];
    newEdges.push(generateRandomEdge(randomExistingEntity.id, newEntityId));
  }

  // currentData = {
  //   entities: [...currentData.entities, ...newEntities],
  //   edges: [...currentData.edges, ...newEdges],
  // };
  currentData = {
    entities: [...currentData.entities],
    edges: [...currentData.edges],
  };

  return NextResponse.json(currentData);
}
