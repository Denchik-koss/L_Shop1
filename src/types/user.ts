export interface User {
    id: string;
    name: string;
    email: string;
    login: string;
    phone: string;
    password: string;
    createdAt: string;
}

export interface Session {
    userId: string;
    sessionId: string;
    expiresAt: number;
}