export interface NigeriaState {
  name: string
  code: string
  capital: string
  cities: string[]
}

export const nigeriaStates: NigeriaState[] = [
  { name: "Abia", code: "AB", capital: "Umuahia", cities: ["Umuahia", "Aba", "Ohafia", "Arochukwu"] },
  { name: "Adamawa", code: "AD", capital: "Yola", cities: ["Yola", "Mubi", "Jimeta", "Numan"] },
  { name: "Akwa Ibom", code: "AK", capital: "Uyo", cities: ["Uyo", "Eket", "Ikot Ekpene", "Oron"] },
  { name: "Anambra", code: "AN", capital: "Awka", cities: ["Awka", "Onitsha", "Nnewi", "Ekwulobia"] },
  { name: "Bauchi", code: "BA", capital: "Bauchi", cities: ["Bauchi", "Azare", "Misau", "Jama'are"] },
  { name: "Bayelsa", code: "BY", capital: "Yenagoa", cities: ["Yenagoa", "Brass", "Ogbia", "Sagbama"] },
  { name: "Benue", code: "BE", capital: "Makurdi", cities: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala"] },
  { name: "Borno", code: "BO", capital: "Maiduguri", cities: ["Maiduguri", "Biu", "Dikwa", "Gwoza"] },
  { name: "Cross River", code: "CR", capital: "Calabar", cities: ["Calabar", "Ogoja", "Ikom", "Obudu"] },
  { name: "Delta", code: "DE", capital: "Asaba", cities: ["Asaba", "Warri", "Sapele", "Ughelli"] },
  { name: "Ebonyi", code: "EB", capital: "Abakaliki", cities: ["Abakaliki", "Afikpo", "Onueke", "Ishielu"] },
  { name: "Edo", code: "ED", capital: "Benin City", cities: ["Benin City", "Auchi", "Ekpoma", "Uromi"] },
  { name: "Ekiti", code: "EK", capital: "Ado-Ekiti", cities: ["Ado-Ekiti", "Ikere", "Iyin", "Ijero"] },
  { name: "Enugu", code: "EN", capital: "Enugu", cities: ["Enugu", "Nsukka", "Agbani", "Awgu"] },
  { name: "FCT", code: "FC", capital: "Abuja", cities: ["Abuja", "Gwagwalada", "Kuje", "Bwari"] },
  { name: "Gombe", code: "GO", capital: "Gombe", cities: ["Gombe", "Kumo", "Billiri", "Dukku"] },
  { name: "Imo", code: "IM", capital: "Owerri", cities: ["Owerri", "Orlu", "Okigwe", "Oguta"] },
  { name: "Jigawa", code: "JI", capital: "Dutse", cities: ["Dutse", "Hadejia", "Kazaure", "Gumel"] },
  { name: "Kaduna", code: "KD", capital: "Kaduna", cities: ["Kaduna", "Zaria", "Kafanchan", "Kagoro"] },
  { name: "Kano", code: "KN", capital: "Kano", cities: ["Kano", "Wudil", "Rano", "Gaya"] },
  { name: "Katsina", code: "KT", capital: "Katsina", cities: ["Katsina", "Daura", "Funtua", "Malumfashi"] },
  { name: "Kebbi", code: "KB", capital: "Birnin Kebbi", cities: ["Birnin Kebbi", "Argungu", "Yauri", "Zuru"] },
  { name: "Kogi", code: "KO", capital: "Lokoja", cities: ["Lokoja", "Okene", "Idah", "Kabba"] },
  { name: "Kwara", code: "KW", capital: "Ilorin", cities: ["Ilorin", "Offa", "Jebba", "Pategi"] },
  {
    name: "Lagos",
    code: "LA",
    capital: "Ikeja",
    cities: ["Lagos Island", "Ikeja", "Victoria Island", "Lekki", "Ikoyi", "Surulere", "Yaba"],
  },
  { name: "Nasarawa", code: "NA", capital: "Lafia", cities: ["Lafia", "Keffi", "Akwanga", "Nasarawa"] },
  { name: "Niger", code: "NI", capital: "Minna", cities: ["Minna", "Bida", "Suleja", "Kontagora"] },
  { name: "Ogun", code: "OG", capital: "Abeokuta", cities: ["Abeokuta", "Ijebu-Ode", "Sagamu", "Ota"] },
  { name: "Ondo", code: "ON", capital: "Akure", cities: ["Akure", "Ondo", "Owo", "Ikare"] },
  { name: "Osun", code: "OS", capital: "Osogbo", cities: ["Osogbo", "Ile-Ife", "Ilesa", "Ede"] },
  { name: "Oyo", code: "OY", capital: "Ibadan", cities: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin"] },
  { name: "Plateau", code: "PL", capital: "Jos", cities: ["Jos", "Bukuru", "Pankshin", "Shendam"] },
  { name: "Rivers", code: "RI", capital: "Port Harcourt", cities: ["Port Harcourt", "Bonny", "Okrika", "Degema"] },
  { name: "Sokoto", code: "SO", capital: "Sokoto", cities: ["Sokoto", "Tambuwal", "Gwadabawa", "Illela"] },
  { name: "Taraba", code: "TA", capital: "Jalingo", cities: ["Jalingo", "Wukari", "Bali", "Takum"] },
  { name: "Yobe", code: "YO", capital: "Damaturu", cities: ["Damaturu", "Potiskum", "Gashua", "Nguru"] },
  { name: "Zamfara", code: "ZA", capital: "Gusau", cities: ["Gusau", "Kaura Namoda", "Talata Mafara", "Anka"] },
]

export function getStateByCode(code: string): NigeriaState | undefined {
  return nigeriaStates.find((state) => state.code === code)
}

export function getCitiesByState(stateName: string): string[] {
  const state = nigeriaStates.find((s) => s.name === stateName)
  return state?.cities || []
}
