export interface ResLogin {
  token: string;
}

export interface ResCheck {
  household: Household;
}

export interface Household {
  _id: string;
  name: string;
  createdAt: string;
  kwh: number;
  role: string;
  quantity: number;
  updatedAt: string;
}

export interface PatchAuthParams {
  id: string;
  quantity: number;
}
