import { useState, useEffect } from 'react';
import { getStatesFromApi, getLGAsFromApi, getCitiesFromApi, getStatesWithCities, searchCities, getAllCities, State, LGA, City } from '@/lib/api-states';

export const useStates = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStatesFromApi();
        setStates(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch states');
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  return { states, loading, error };
};

export const useLGAs = (stateName: string) => {
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stateName) return;

    const fetchLGAs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLGAsFromApi(stateName);
        setLgas(data);
      } catch (err: any) {
        setError(err.message || `Failed to fetch LGAs for ${stateName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLGAs();
  }, [stateName]);

  return { lgas, loading, error };
};

export const useCities = (stateName?: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = stateName 
          ? await getCitiesFromApi(stateName)
          : await getAllCities(); // Get all cities
        setCities(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cities');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [stateName]);

  return { cities, loading, error };
};

export const useStatesWithCities = () => {
  const [statesWithCities, setStatesWithCities] = useState<{ state: State; cities: City[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getStatesWithCities();
        setStatesWithCities(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch states with cities');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { statesWithCities, loading, error };
};

export const useCitySearch = (query: string, stateName?: string) => {
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchCities(query, stateName);
        setSearchResults(results);
      } catch (err: any) {
        setError(err.message || 'Failed to search cities');
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, stateName]);

  return { searchResults, loading, error };
};

export type { State, LGA, City };
