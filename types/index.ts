export interface RegisterFormData {
  username: string;
  email: string;
  country: string;
  password: string;
  investmentGoals: string;
  riskTolerance: string;
  preferredIndustries: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
