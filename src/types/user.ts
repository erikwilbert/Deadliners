export type User = {
  id: string;
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
};

export type UserUpdate = {
  uname?: string;
  fname?: string;
  lname?: string;
  bio?: string;
  img_url?: string;
  phone?: string;
  address?: string;
  url_social?: string[];
  url_other?: string[];
  prodi?: string;
};
