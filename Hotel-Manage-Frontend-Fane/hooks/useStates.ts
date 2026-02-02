import { useState, useEffect } from 'react';
import { statesAPI } from '@/lib/api-axios';

export interface State {
  id: number;
  name: string;
  capital: string;
  cities: string[];
}

export interface LGA {
  name: string;
  stateId: number;
}

export const useStates = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await statesAPI.getAll();
        setStates(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch states');
        // Fallback to sample data if API fails
        setStates([
          { id: 24, name: 'Lagos', capital: 'Ikeja', cities: ['Ikeja', 'Victoria Island', 'Lagos Island', 'Surulere', 'Apapa'] },
          { id: 14, name: 'FCT', capital: 'Abuja', cities: ['Abuja', 'Gwagwalada', 'Kubwa', 'Bwari', 'Karu'] },
          { id: 32, name: 'Rivers', capital: 'Port Harcourt', cities: ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Okrika', 'Oyigbo'] },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  return { states, loading, error };
};

export const useLGAs = (stateId: number) => {
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLGAs = async () => {
      if (!stateId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await statesAPI.getCities(stateId.toString());
        const citiesData = response.data;
        
        // Convert cities array to LGA format
        const lgasData: LGA[] = citiesData.map((cityName: string) => ({
          name: cityName,
          stateId
        }));
        
        setLgas(lgasData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cities');
        // Fallback to sample data
        setLgas([
          { name: 'Ikeja', stateId },
          { name: 'Victoria Island', stateId },
          { name: 'Lagos Island', stateId },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLGAs();
  }, [stateId]);

  return { lgas, loading, error };
};

export const useCities = (stateId: number) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!stateId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await statesAPI.getCities(stateId.toString());
        setCities(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch cities');
        // Fallback to sample data
        setCities(['Ikeja', 'Victoria Island', 'Lagos Island', 'Surulere', 'Apapa']);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [stateId]);

  return { cities, loading, error };
};

export const searchCities = (states: State[], query: string): LGA[] => {
  if (!query) return [];
  
  const allCities: LGA[] = [];
  states.forEach(state => {
    state.cities.forEach(cityName => {
      if (cityName.toLowerCase().includes(query.toLowerCase())) {
        allCities.push({
          name: cityName,
          stateId: state.id
        });
      }
    });
  });
  
  return allCities;
};

export const getAllCities = (states: State[]): LGA[] => {
  const allCities: LGA[] = [];
  states.forEach(state => {
    state.cities.forEach(cityName => {
      allCities.push({
        name: cityName,
        stateId: state.id
      });
    });
  });
  
  return allCities;
};
