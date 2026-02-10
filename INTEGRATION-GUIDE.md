# 🎯 Nigerian States & LGAs API Integration Guide

## 📋 **What Was Created:**

### **1. API Service (`lib/api-states.ts`)**
```typescript
// ✅ Complete API integration with Nigerian states
const getStatesFromApi = async (): Promise<State[]> => {
  const response = await fetch('https://nga-states-lga.onrender.com/fetch');
  return json.states;
};

const getLGAsFromApi = async (stateName: string): Promise<LGA[]> => {
  const response = await fetch(`https://nga-states-lga.onrender.com/?state=${stateName}`);
  return json.lga;
};
```

### **2. React Hooks (`hooks/useStates.ts`)**
```typescript
// ✅ Custom hooks for state management
export const useStates = () => {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ...fetches states on mount
};

export const useLGAs = (stateName: string) => {
  const [lgas, setLgas] = useState<LGA[]>([]);
  // ...fetches LGAs when state changes
};
```

### **3. State Selector Component (`components/forms/state-selector.tsx`)**
```typescript
// ✅ Complete state/LGA selector with search
<StateSelector
  onStateChange={handleStateChange}
  onLGAChange={handleLGAChange}
  selectedState={selectedState}
  selectedLGA={selectedLGA}
/>
```

### **4. Hotel Search Component (`components/hotels/hotel-search.tsx`)**
```typescript
// ✅ Advanced hotel search with location filters
<HotelSearch
  onHotelsFound={handleHotelsFound}
  className="mb-6"
/>
```

## 🚀 **How to Use:**

### **In Any Component:**
```typescript
import { useStates, useLGAs, State, LGA } from '@/hooks/useStates';
import { StateSelector } from '@/components/forms/state-selector';

// Get all states
const { states, loading, error } = useStates();

// Get LGAs for a specific state
const { lgas, loading: lgasLoading } = useLGAs('Lagos');

// Use state selector
<StateSelector
  onStateChange={(state) => console.log('Selected:', state.name)}
  onLGAChange={(lga) => console.log('Selected LGA:', lga.name)}
/>
```

### **API Endpoints:**
```typescript
// ✅ States API
GET https://nga-states-lga.onrender.com/fetch
// Returns: { states: State[] }

// ✅ LGAs API  
GET https://nga-states-lga.onrender.com/?state=Kaduna
// Returns: { lga: LGA[] }
```

## 🎯 **Integration Points:**

### **1. Hotel Registration Form:**
```typescript
// Add state/LGA selection to hotel creation
<HotelRegistrationForm>
  <StateSelector
    onStateChange={setState}
    onLGAChange={setLGA}
  />
  {/* Other hotel fields */}
</HotelRegistrationForm>
```

### **2. User Profile:**
```typescript
// Add state/LGA to user profile
<UserProfileForm>
  <StateSelector
    selectedState={userState}
    selectedLGA={userLGA}
    onStateChange={updateUserState}
    onLGAChange={updateUserLGA}
  />
</UserProfileForm>
```

### **3. Hotel Search:**
```typescript
// Filter hotels by location
<HotelSearch>
  onHotelsFound={setFilteredHotels}
  selectedState={searchState}
  selectedLGA={searchLGA}
</HotelSearch>
```

## 📊 **Data Structures:**

### **State Interface:**
```typescript
interface State {
  id: string;
  name: string;
  capital: string;
  alias: string;
}
```

### **LGA Interface:**
```typescript
interface LGA {
  id: string;
  name: string;
  state_id: string;
  state_name: string;
}
```

## 🔧 **Features:**

### **✅ State Selector Component:**
- **Search functionality** - Filter states by name
- **Auto LGA loading** - Loads LGAs when state selected
- **Error handling** - User-friendly error messages
- **Loading states** - Spinners during API calls
- **Responsive design** - Works on mobile/desktop

### **✅ Hotel Search Integration:**
- **Location-based filtering** - Filter by state/LGA
- **Price range** - Min/max price filters
- **Rating filters** - Star rating selection
- **Real-time search** - Instant filtering
- **Results summary** - Shows found count

## 🌐 **API Response Examples:**

### **States Response:**
```json
{
  "states": [
    {
      "id": "1",
      "name": "Abia",
      "capital": "Umuahia",
      "alias": "AB"
    }
  ]
}
```

### **LGAs Response:**
```json
{
  "lga": [
    {
      "id": "1",
      "name": "Aba North",
      "state_id": "1",
      "state_name": "Abia"
    }
  ]
}
```

## 🎯 **Next Steps:**

### **1. Update Hotel Model:**
```typescript
interface Hotel {
  // ...existing fields
  state: string;        // Add state field
  lga: string;          // Add LGA field
  coordinates?: {       // Add coordinates
    lat: number;
    lng: number;
  };
}
```

### **2. Backend Integration:**
```typescript
// Add state/LGA to hotel creation
router.post('/hotels', async (req, res) => {
  const { name, state, lga, location, ...otherData } = req.body;
  // Validate state/LGA exist
  // Create hotel with location data
});
```

### **3. Advanced Features:**
- **Geolocation** - Auto-detect user's state/LGA
- **Distance search** - Find hotels near user
- **Map integration** - Show hotels on map
- **State statistics** - Hotels per state/LGA

## 🚀 **Ready to Use:**

**All components are created and ready for integration!**

1. **Import the hooks** in your components
2. **Use StateSelector** for location selection
3. **Integrate with hotel search** for filtering
4. **Add to forms** for data collection

**The Nigerian States & LGAs API is now fully integrated into your React application!** 🎉
