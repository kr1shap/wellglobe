interface VaccineInfo {
  vaccine: string;
  description: string;
  link: string;
}

export interface vaccines {
  country: string;
  vaccines: VaccineInfo[];
}
