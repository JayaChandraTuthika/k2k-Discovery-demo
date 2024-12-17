export const mockData = {
  entities: [
    {
      id: "1",
      label: "Root Entity",
      type: ["person"],
      metadata: [{ title: "Profile 1", url: "https://example.com/1" }],
    },
    {
      id: "2",
      label: "Child 1",
      type: ["email"],
      metadata: [{ title: "Email 1", url: "https://example.com/2" }],
    },
    {
      id: "3",
      label: "Child 2",
      type: ["domain"],
      metadata: [{ title: "Domain 1", url: "https://example.com/3" }],
    },
    {
      id: "4",
      label: "Grandchild 1",
      type: ["phone"],
      metadata: [{ title: "Phone 1", url: "https://example.com/4" }],
    },
    {
      id: "5",
      label: "Grandchild 2",
      type: ["person"],
      metadata: [{ title: "Profile 2", url: "https://example.com/5" }],
    },
  ],
  edges: [
    { id: "e1-2", sourceId: "1", targetId: "2" },
    { id: "e1-3", sourceId: "1", targetId: "3" },
    { id: "e2-4", sourceId: "2", targetId: "4" },
    { id: "e3-5", sourceId: "3", targetId: "5" },
  ],
};
