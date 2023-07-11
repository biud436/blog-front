export interface User {
    id: number;
    username: string;
    profile: {
        nickname: string;
        profileImage: string | null;
    };
    role: string;
}
