import { useState, useEffect } from 'react';

export interface Pet {
  title: string;
  description: string;
  url: string;
  created: string;
}

export const useFetchPets = (url: string) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch pets data.');
        const data = await response.json();
        setPets(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { pets, loading, error };
};
