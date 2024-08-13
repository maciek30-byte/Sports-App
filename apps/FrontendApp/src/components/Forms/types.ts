export interface RegisterUserValues {
  login: string;
  password: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

//@TODO narrow this type//
export interface ActiveCaloriesValues {
  calories: number;
  date: string;
}

export interface LoginValues {
  email: string;
  password: string;
}
