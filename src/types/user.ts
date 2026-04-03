export type UserAccent = 'indigo' | 'cyan' | 'emerald';

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
  prodi: string;
  accent: UserAccent;
};
