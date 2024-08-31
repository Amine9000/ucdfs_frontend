export type UserDto = {
  id?: string;
  prenom: string;
  nom: string;
  email: string;
  pwd?: string;
  roles: string[];
};
