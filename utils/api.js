// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch data from API
export async function fetchData(endpoint) {
  await delay(1000); // Simulate network delay
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data_sclowy-i36rDB9ONoHCDrhoZw4EqkygXRCp4t.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (
      !data ||
      !data.dashboard ||
      !Array.isArray(data.dashboard) ||
      data.dashboard.length === 0
    ) {
      throw new Error("Invalid data structure");
    }

    const dashboardData = data.dashboard[0];

    switch (endpoint) {
      case "brand-monitoring":
        if (!dashboardData["Brand Monitoring"])
          throw new Error("Brand Monitoring data not found");
        return dashboardData["Brand Monitoring"];
      case "dark-web-mentions":
        if (!dashboardData["Dark Web Mentions"])
          throw new Error("Dark Web Mentions data not found");
        return dashboardData["Dark Web Mentions"];
      case "risk-assessment":
        if (!dashboardData["Risk Assessment"])
          throw new Error("Risk Assessment data not found");
        return dashboardData["Risk Assessment"];
      case "threat-intelligence":
        if (!dashboardData["Threat Intelligence"])
          throw new Error("Threat Intelligence data not found");
        return dashboardData["Threat Intelligence"];
      case "market-analysis":
        if (!dashboardData["Market Analysis"])
          throw new Error("Market Analysis data not found");
        return dashboardData["Market Analysis"];
      default:
        throw new Error(`Invalid endpoint: ${endpoint}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
