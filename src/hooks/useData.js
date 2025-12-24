import { useState, useEffect } from 'react';

export const useData = (dataPath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/data/${dataPath}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${dataPath}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(`Failed to load ${dataPath} data`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataPath]);

  return { data, loading, error };
};
