export type UserAccent = 'indigo' | 'cyan' | 'emerald' | 'crimson' | 'gold' | 'white';

export const getAccentRgb = (accent?: string) => {
  switch (accent?.toLowerCase().trim()) {
    case 'cyan': return '6 182 212';
    case 'emerald': return '16 185 129';
    case 'crimson': return '239 68 68';
    case 'gold': return '234 179 8';
    case 'white': return '255 255 255';
    default: return '99 102 241';
  }
};
export type SocialPlatform = "instagram" | "github" | "linkedin" | "x";
export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type User = {
  id: string;
  npm: string;
  uname: string;
  gmail: string;
  fname: string;
  lname: string;
  birth_date: string;
  birth_location: string;
  gender: string;
  status_relationship: string;
  bio: string;
  img_url: string;
  phone: string;
  address: string;
  url_social?: string[];
  url_other?: string[];
  prodi: string;
  accent: UserAccent;
};

export type UserUpdate = {
  uname: string;
  fname: string;
  lname: string;
  bio: string;
  phone: string;
  address: string;
  birth_location: string;
  birth_date: string;
  gender: string;
  status_relationship: string;
  prodi: string;
  accent: UserAccent;
  url_social: string[];
  npm: string;
};
