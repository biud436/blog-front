export type ServerResponse<T = unknown> = {
    message: string;
    statusCode: number;
    result: 'success' | 'failure';
    data: T;
};
