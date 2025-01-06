import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";
import jsonData from "./data.json";

export function useData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(endpoint);
        if (isMounted) {
          if (endpoint === "brand-monitoring") {
            endpoint = "Brand Monitoring";
          } else if (endpoint === "dark-web-mentions") {
            endpoint = "Dark Web Mentions";
          } else if (endpoint === "risk-assessment") {
            endpoint = "Risk Assessment";
          } else if (endpoint === "threat-intelligence") {
            endpoint = "Threat Intelligence";
          } else if (endpoint === "market-analysis") {
            endpoint = "Market Analysis";
          }
          console.log(endpoint);

          console.log(jsonData.dashboard[0][endpoint]);
          setData(jsonData.dashboard[0][endpoint]);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
          console.error(`Error fetching data for ${endpoint}:`, errorMessage);
          setError(new Error(errorMessage));
          setLoading(false);
        }
      }
    };

    fetchDataFromApi();

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
