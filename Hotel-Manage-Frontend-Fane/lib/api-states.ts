// Nigerian States and LGAs API Service

interface State {
  id: string;
  name: string;
  capital: string;
  alias: string;
}

interface LGA {
  id: string;
  name: string;
  state_id: string;
  state_name: string;
}

interface City {
  id: string;
  name: string;
  state_id: string;
  state_name: string;
  type: 'lga' | 'city' | 'town';
}

const API_BASE_URL = 'https://nga-states-lga.onrender.com';

/**
 * Fetch all Nigerian states
 */
export const getStatesFromApi = async (): Promise<State[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fetch`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch states: ${response.status}`);
    }
    
    const json = await response.json();
    return json.states || [];
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
};

/**
 * Fetch LGAs for a specific state (these serve as cities/towns)
 */
export const getLGAsFromApi = async (stateName: string): Promise<LGA[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/?state=${encodeURIComponent(stateName)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch LGAs for ${stateName}: ${response.status}`);
    }
    
    const json = await response.json();
    return json.lga || [];
  } catch (error) {
    console.error(`Error fetching LGAs for ${stateName}:`, error);
    return [];
  }
};

/**
 * Get cities (LGAs) for a specific state
 * In Nigeria, LGAs serve as cities and major towns
 */
export const getCitiesFromApi = async (stateName: string): Promise<City[]> => {
  const lgas = await getLGAsFromApi(stateName);
  
  // Convert LGAs to City format
  return lgas.map(lga => ({
    id: lga.id,
    name: lga.name,
    state_id: lga.state_id,
    state_name: lga.state_name,
    type: 'lga' as const
  }));
};

/**
 * Get all states with their cities (LGAs)
 */
export const getStatesWithCities = async (): Promise<{ state: State; cities: City[] }[]> => {
  const states = await getStatesFromApi();
  
  const statesWithCities = await Promise.all(
    states.map(async (state) => {
      const cities = await getCitiesFromApi(state.name);
      return { state, cities };
    })
  );
  
  return statesWithCities;
};

/**
 * Search cities by name
 */
export const searchCities = async (query: string, stateName?: string): Promise<City[]> => {
  const cities = stateName 
    ? await getCitiesFromApi(stateName)
    : await getAllCities();
    
  return cities.filter(city => 
    city.name.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Get all cities from all states
 */
export const getAllCities = async (): Promise<City[]> => {
  const statesWithCities = await getStatesWithCities();
  return statesWithCities.flatMap(({ cities }) => cities);
};

/**
 * Search states by name
 */
export const searchStates = async (query: string): Promise<State[]> => {
  const states = await getStatesFromApi();
  return states.filter(state => 
    state.name.toLowerCase().includes(query.toLowerCase()) ||
    state.alias.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Get state by ID
 */
export const getStateById = async (stateId: string): Promise<State | null> => {
  const states = await getStatesFromApi();
  return states.find(state => state.id === stateId) || null;
};

/**
 * Get city by ID
 */
export const getCityById = async (cityId: string): Promise<City | null> => {
  const cities = await getAllCities();
  return cities.find(city => city.id === cityId) || null;
};

export type { State, LGA, City };
