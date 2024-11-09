export interface LoginResponse {
  message: string;
  statusCode: number;
  result: 'success' | 'failure';
  data: {
    // empty
  };
}

export enum StatusCode {
  SUCCESS = 200,
  NO_CONTENT = 204,
}
