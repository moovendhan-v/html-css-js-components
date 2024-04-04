import { useState, useEffect } from 'react';

interface FetchDataResponse {
  data: any | null; 
  loading: boolean;
  error: Error | null;
}

const useFetchData = (url: string): FetchDataResponse => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel any ongoing fetch request if component unmounts
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
