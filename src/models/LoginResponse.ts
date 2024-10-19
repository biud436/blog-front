export interface LoginResponse {
    message: string;
    statusCode: number;
    result: 'success' | 'failure';
    data: {
        // access_token: string;
        // refresh_token: string;
    };
}

export enum StatusCode {
    SUCCESS = 200,
    NO_CONTENT = 204,
}
