export type CategoryType = 'Crown & Bridge' | 'Implant Solutions' | 'Ceramics' | 'Appliances' | 'Models & Dies';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  cat: CategoryType;
  name: string;
  tagline: string;
  lead: string;
  specs: ProductSpec[];
  features: string[];
  related: string[]; // references other product IDs
  svgId: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  emoji: string;
  title: string;
  bio: string[];
  skills: string[];
  colleagues: string[]; // references other team member IDs
}

export interface Episode {
  id: number;
  ep: string;
  cat: 'clinical' | 'technology' | 'materials' | 'business';
  catLabel: string;
  title: string;
  guest: string;
  desc: string;
  duration: string;
  videoId: string;
  locked: boolean;
}
