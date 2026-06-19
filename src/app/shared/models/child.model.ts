export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender?: ChildGender;
  photoUrl?: string;
}

export type ChildGender = 'male' | 'female' | 'other';
