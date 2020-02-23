export interface SignUpRequest {
  user_name: string;
  email: string;
  code: number;
  password: string;
  role: string;
  topic: number;
}

export interface SignUpResponse {
  code: number;
  status: string;
  created_at?: Date;
}

