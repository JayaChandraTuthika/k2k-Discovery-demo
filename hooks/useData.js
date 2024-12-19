import { useState, useEffect } from "react";
import { fetchData } from "../utils/api";

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
          setData(result);
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
