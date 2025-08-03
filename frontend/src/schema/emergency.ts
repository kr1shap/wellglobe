export interface EmergencyNumbers {
  ambulance: string[];
  fire: string[];
  police: string[];
}

export interface emergency {
  country: string;
  iso_code: string;
  emergency_numbers: EmergencyNumbers;
}
