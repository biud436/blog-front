declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_TOKEN: string;
        readonly REACT_API_SERVER_URL: string;
    }
}
